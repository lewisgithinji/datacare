// DataCare WhatsApp Platform - Webhook Handler
// Handles incoming WhatsApp messages and processes them

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

// Environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const WHATSAPP_VERIFY_TOKEN = Deno.env.get('WHATSAPP_VERIFY_TOKEN')!
const WHATSAPP_ACCESS_TOKEN = Deno.env.get('WHATSAPP_ACCESS_TOKEN')!
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID')!

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // GET - Webhook Verification (Meta requirement)
    if (req.method === 'GET') {
      const url = new URL(req.url)
      const mode = url.searchParams.get('hub.mode')
      const token = url.searchParams.get('hub.verify_token')
      const challenge = url.searchParams.get('hub.challenge')

      console.log('Webhook verification request:', { mode, token: token ? '***' : null })

      if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
        console.log('✅ Webhook verified successfully')
        return new Response(challenge, {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
        })
      }

      console.log('❌ Webhook verification failed')
      return new Response('Forbidden', { status: 403, headers: corsHeaders })
    }

    // POST - Incoming Messages
    if (req.method === 'POST') {
      const body = await req.json()
      console.log('📨 Webhook received:', JSON.stringify(body, null, 2))

      // Validate webhook payload
      if (body.object !== 'whatsapp_business_account') {
        console.log('⚠️ Invalid webhook object type:', body.object)
        return new Response(JSON.stringify({ success: false }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Process all entries
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          if (change.field === 'messages') {
            await processWhatsAppChange(change.value, supabase)
          }
        }
      }

      // Always return 200 to acknowledge receipt
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  } catch (error: any) {
    console.error('❌ Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

/**
 * Process WhatsApp webhook change
 */
async function processWhatsAppChange(value: any, supabase: any) {
  // Handle incoming messages
  if (value.messages && value.messages.length > 0) {
    for (const message of value.messages) {
      await handleIncomingMessage(message, value.contacts, supabase)
    }
  }

  // Handle status updates (delivered, read, failed)
  if (value.statuses && value.statuses.length > 0) {
    for (const status of value.statuses) {
      await handleStatusUpdate(status, supabase)
    }
  }
}

/**
 * Handle incoming message from customer
 */
async function handleIncomingMessage(message: any, contacts: any[], supabase: any) {
  try {
    const from = message.from
    const messageId = message.id
    const timestamp = message.timestamp
    const type = message.type

    console.log(`📱 Processing ${type} message from ${from}`)

    // Get organization by phone number ID
    const { data: organization } = await supabase
      .from('organizations')
      .select('id, slug, settings, features')
      .eq('whatsapp_phone_number_id', WHATSAPP_PHONE_NUMBER_ID)
      .single()

    if (!organization) {
      console.error('❌ No organization found for phone number ID:', WHATSAPP_PHONE_NUMBER_ID)
      return
    }

    const organizationId = organization.id

    // Extract message content
    const { content, mediaUrl, mediaType } = extractMessageContent(message)

    // Get or create contact
    const contact = await getOrCreateContact(from, contacts[0], organizationId, supabase)

    // Get or create conversation
    const conversation = await getOrCreateConversation(contact.id, organizationId, supabase)

    // Save incoming message
    const { data: savedMessage } = await supabase
      .from('messages')
      .insert({
        organization_id: organizationId,
        conversation_id: conversation.id,
        whatsapp_message_id: messageId,
        direction: 'inbound',
        sender_type: 'contact',
        sender_id: contact.id,
        message_type: type,
        content,
        media_url: mediaUrl,
        media_mime_type: mediaType,
        status: 'delivered',
        created_at: new Date(parseInt(timestamp) * 1000).toISOString()
      })
      .select()
      .single()

    console.log('💾 Message saved:', savedMessage.id)

    // Mark as read
    await markMessageAsRead(messageId)

    // Process with chatbot (if not assigned to agent)
    if (!conversation.assigned_agent_id && organization.features?.ai_chatbot) {
      await processChatbotResponse(
        from,
        content,
        conversation,
        contact,
        organizationId,
        organization,
        supabase
      )
    } else if (conversation.assigned_agent_id) {
      console.log('👤 Message for assigned agent:', conversation.assigned_agent_id)
      // Agent will see it in realtime via Supabase Realtime
    } else {
      // Queue for agent assignment
      await supabase
        .from('conversations')
        .update({ status: 'open' })
        .eq('id', conversation.id)
    }

    // Track analytics
    await supabase
      .from('analytics_events')
      .insert({
        organization_id: organizationId,
        event_type: 'message_received',
        event_category: 'message',
        conversation_id: conversation.id,
        event_data: {
          message_type: type,
          from,
          has_media: !!mediaUrl
        }
      })
  } catch (error: any) {
    console.error('❌ Error handling message:', error)
  }
}

/**
 * Extract content from different message types
 */
function extractMessageContent(message: any): { content: string; mediaUrl: string | null; mediaType: string | null } {
  const type = message.type
  let content = ''
  let mediaUrl = null
  let mediaType = null

  switch (type) {
    case 'text':
      content = message.text.body
      break
    case 'image':
      content = message.image.caption || ''
      mediaUrl = message.image.id
      mediaType = message.image.mime_type
      break
    case 'video':
      content = message.video.caption || ''
      mediaUrl = message.video.id
      mediaType = message.video.mime_type
      break
    case 'audio':
      mediaUrl = message.audio.id
      mediaType = message.audio.mime_type
      break
    case 'document':
      content = message.document.filename || ''
      mediaUrl = message.document.id
      mediaType = message.document.mime_type
      break
    case 'location':
      content = `Location: ${message.location.latitude}, ${message.location.longitude}`
      break
    case 'button':
      content = message.button.text
      break
    case 'interactive':
      if (message.interactive.type === 'button_reply') {
        content = message.interactive.button_reply.title
      } else if (message.interactive.type === 'list_reply') {
        content = message.interactive.list_reply.title
      }
      break
    default:
      content = `[${type} message]`
  }

  return { content, mediaUrl, mediaType }
}

/**
 * Get or create contact
 */
async function getOrCreateContact(phoneNumber: string, contactInfo: any, organizationId: string, supabase: any) {
  const { data: existing } = await supabase
    .from('contacts')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('phone_number', phoneNumber)
    .single()

  if (existing) {
    // Update last interaction
    await supabase
      .from('contacts')
      .update({
        last_interaction_at: new Date().toISOString(),
        name: contactInfo?.profile?.name || existing.name
      })
      .eq('id', existing.id)

    return existing
  }

  // Create new contact
  const { data: newContact } = await supabase
    .from('contacts')
    .insert({
      organization_id: organizationId,
      phone_number: phoneNumber,
      name: contactInfo?.profile?.name || 'Unknown',
      first_interaction_at: new Date().toISOString(),
      last_interaction_at: new Date().toISOString()
    })
    .select()
    .single()

  console.log('👤 New contact created:', newContact.id)
  return newContact
}

/**
 * Get or create conversation
 */
async function getOrCreateConversation(contactId: string, organizationId: string, supabase: any) {
  // Look for open conversation
  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('contact_id', contactId)
    .in('status', ['open', 'assigned', 'pending'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (existing) {
    return existing
  }

  // Create new conversation
  const { data: newConversation } = await supabase
    .from('conversations')
    .insert({
      organization_id: organizationId,
      contact_id: contactId,
      status: 'open',
      last_message_at: new Date().toISOString()
    })
    .select()
    .single()

  console.log('💬 New conversation created:', newConversation.id)
  return newConversation
}

/**
 * Mark WhatsApp message as read
 */
async function markMessageAsRead(messageId: string) {
  try {
    const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId
      })
    })

    if (!response.ok) {
      console.error('Failed to mark as read:', await response.text())
    }
  } catch (error) {
    console.error('Error marking as read:', error)
  }
}

/**
 * Process chatbot response
 */
async function processChatbotResponse(
  to: string,
  query: string,
  conversation: any,
  contact: any,
  organizationId: string,
  organization: any,
  supabase: any
) {
  try {
    console.log('🤖 Processing with chatbot:', query)

    // Simple keyword-based responses (will be enhanced with GPT-4 later)
    const lowerQuery = query.toLowerCase()
    let response = ''
    let shouldAssignAgent = false

    // Check business hours
    const isBusinessHours = checkBusinessHours(organization.settings)

    // Keyword detection
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.match(/\b(hey|hola|jambo)\b/)) {
      response = `Hi ${contact.name || 'there'}! 👋\n\nWelcome to Datacare. How can I help you today?\n\n1️⃣ Product Information\n2️⃣ Get a Quote\n3️⃣ Technical Support\n4️⃣ Speak to Sales`
    } else if (lowerQuery.match(/\b(price|pricing|cost|how much)\b/)) {
      response = "I'd be happy to help with pricing! 💰\n\nWhat are you interested in?\n\n📦 Microsoft 365\n🎯 Google Workspace\n💬 Messaging Platform\n☁️ Cloud Backup\n🌐 Web Design\n\nReply with the product name or type 'custom quote' for personalized pricing."
      shouldAssignAgent = true
    } else if (lowerQuery.match(/\b(microsoft|m365|office 365)\b/)) {
      response = "**Microsoft 365** 📊\n\nWe offer three plans:\n\n• Business Basic - $6/user/month\n• Business Standard - $12.50/user/month\n• Business Premium - $22/user/month\n\nWould you like more details or a custom quote? Our team can help!"
      shouldAssignAgent = true
    } else if (lowerQuery.match(/\b(google|workspace|gmail)\b/)) {
      response = "**Google Workspace** 📧\n\nProfessional email and collaboration tools:\n\n• Business Starter - $6/user/month\n• Business Standard - $12/user/month\n• Business Plus - $18/user/month\n\nInterested? Let me connect you with our sales team!"
      shouldAssignAgent = true
    } else if (lowerQuery.match(/\b(hours|time|when|available)\b/)) {
      response = `We're available:\n📅 Monday-Friday\n🕐 8AM-6PM EAT\n\n📧 Email: sales@datacare.co.ke\n📞 Phone: +254 709 980 000\n🌐 Web: datacare.co.ke\n\n${!isBusinessHours ? '⏰ We\'re currently offline but will respond during business hours.' : '✅ We\'re online now!'}`
    } else if (lowerQuery.match(/\b(help|support|problem|issue)\b/)) {
      response = "I can help you with:\n\n✅ Product information\n💰 Pricing & quotes\n📦 Order status\n🛠️ Technical support\n\nWhat would you like assistance with?"
      shouldAssignAgent = true
    } else {
      // Default response
      if (isBusinessHours) {
        response = "Thanks for your message! Let me connect you with our team who can better assist you. Someone will respond shortly. 👤"
        shouldAssignAgent = true
      } else {
        response = "Thank you for contacting Datacare! 🌙\n\nOur team is currently offline but will respond during business hours (Mon-Fri 8AM-6PM EAT).\n\nFor urgent matters:\n📧 sales@datacare.co.ke\n📞 +254 709 980 000"
      }
    }

    // Send response
    await sendWhatsAppMessage(to, response, conversation.id, organizationId, supabase)

    // Assign to agent if needed
    if (shouldAssignAgent && isBusinessHours) {
      await supabase
        .from('conversations')
        .update({
          status: 'pending',
          category: detectCategory(lowerQuery)
        })
        .eq('id', conversation.id)

      console.log('📋 Conversation queued for agent assignment')
    }
  } catch (error: any) {
    console.error('❌ Chatbot error:', error)
  }
}

/**
 * Send WhatsApp message
 */
async function sendWhatsAppMessage(
  to: string,
  text: string,
  conversationId: string,
  organizationId: string,
  supabase: any
) {
  try {
    const url = `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: text }
      })
    })

    const data = await response.json()

    if (data.messages && data.messages[0]) {
      // Save outbound message
      await supabase
        .from('messages')
        .insert({
          organization_id: organizationId,
          conversation_id: conversationId,
          whatsapp_message_id: data.messages[0].id,
          direction: 'outbound',
          sender_type: 'bot',
          message_type: 'text',
          content: text,
          status: 'sent'
        })

      console.log('✅ Message sent:', data.messages[0].id)
    } else {
      console.error('Failed to send message:', data)
    }
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

/**
 * Handle message status update
 */
async function handleStatusUpdate(status: any, supabase: any) {
  const messageId = status.id
  const newStatus = status.status // sent, delivered, read, failed

  console.log(`📊 Status update: ${messageId} → ${newStatus}`)

  // Map WhatsApp status to our status
  const statusMap: Record<string, string> = {
    'sent': 'sent',
    'delivered': 'delivered',
    'read': 'read',
    'failed': 'failed'
  }

  const mappedStatus = statusMap[newStatus] || newStatus

  // Update message status
  const updateData: any = { status: mappedStatus }

  if (newStatus === 'delivered') {
    updateData.delivered_at = new Date().toISOString()
  } else if (newStatus === 'read') {
    updateData.read_at = new Date().toISOString()
  } else if (newStatus === 'failed') {
    updateData.failed_at = new Date().toISOString()
    if (status.errors && status.errors.length > 0) {
      updateData.error_code = status.errors[0].code
      updateData.error_message = status.errors[0].title
    }
  }

  await supabase
    .from('messages')
    .update(updateData)
    .eq('whatsapp_message_id', messageId)
}

/**
 * Check if current time is within business hours
 */
function checkBusinessHours(settings: any): boolean {
  if (!settings?.business_hours?.enabled) return true

  const now = new Date()
  const timezone = settings.business_hours.timezone || 'Africa/Nairobi'

  // Get current time in organization's timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  const timeStr = formatter.format(now)
  const [hours, minutes] = timeStr.split(':').map(Number)
  const currentMinutes = hours * 60 + minutes

  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const dayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long'
  })
  const dayName = dayFormatter.format(now).toLowerCase()

  const schedule = settings.business_hours.schedule[dayName]

  if (!schedule || !schedule.start || !schedule.end) {
    return false // Closed on this day
  }

  const [startHours, startMinutes] = schedule.start.split(':').map(Number)
  const [endHours, endMinutes] = schedule.end.split(':').map(Number)

  const startMinutesTotal = startHours * 60 + startMinutes
  const endMinutesTotal = endHours * 60 + endMinutes

  return currentMinutes >= startMinutesTotal && currentMinutes < endMinutesTotal
}

/**
 * Detect conversation category from message content
 */
function detectCategory(message: string): string {
  const categories = {
    sales: ['price', 'cost', 'buy', 'purchase', 'quote', 'interested'],
    support: ['help', 'problem', 'issue', 'not working', 'broken', 'error'],
    inquiry: ['how', 'what', 'when', 'where', 'info', 'information'],
    complaint: ['complaint', 'disappointed', 'unhappy', 'refund', 'cancel']
  }

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => message.includes(keyword))) {
      return category
    }
  }

  return 'inquiry'
}
