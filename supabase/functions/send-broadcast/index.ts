// DataCare Send Broadcast Function
// Handles bulk sending of WhatsApp templates

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

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
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Parse request body
        const { broadcast_id } = await req.json()

        if (!broadcast_id) {
            throw new Error('Missing broadcast_id')
        }

        console.log(`🚀 Starting broadcast: ${broadcast_id}`)

        // 1. Fetch Broadcast and Template details
        const { data: broadcast, error: broadcastError } = await supabase
            .from('whatsapp_broadcasts')
            .select('*, template:whatsapp_templates(*)')
            .eq('id', broadcast_id)
            .single()

        if (broadcastError || !broadcast) {
            throw new Error(`Broadcast not found: ${broadcastError?.message}`)
        }

        if (broadcast.status === 'completed') {
            return new Response(JSON.stringify({ message: 'Broadcast already completed' }), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            })
        }

        // 2. Fetch Provider Credentials
        const { data: provider, error: providerError } = await supabase
            .from('whatsapp_providers')
            .select('*')
            .eq('organization_id', broadcast.organization_id)
            .eq('status', 'active')
            .single()

        if (providerError || !provider) {
            throw new Error(`No active WhatsApp provider found for organization: ${broadcast.organization_id}`)
        }

        // Update status to sending
        await supabase
            .from('whatsapp_broadcasts')
            .update({ status: 'sending', started_at: new Date().toISOString() })
            .eq('id', broadcast_id)

        // 3. Resolve Audience (Contacts)
        // For now, simple implementation: "All Contacts" or basic segment
        // In future, parse broadcast.segment_criteria properly
        let query = supabase
            .from('whatsapp_contacts')
            .select('id, phone_number, name')
            .eq('organization_id', broadcast.organization_id)

        // Basic segment filtering (example: if criteria has tags)
        // if (broadcast.segment_criteria?.tags) { query = query.contains('tags', broadcast.segment_criteria.tags) }

        const { data: contacts, error: contactsError } = await query

        if (contactsError) {
            throw new Error(`Failed to fetch contacts: ${contactsError.message}`)
        }

        console.log(`👥 Found ${contacts.length} recipients for broadcast`)

        // 4. Send Loop
        let successCount = 0
        let failureCount = 0
        const errors: any[] = []

        // Update total recipients
        await supabase
            .from('whatsapp_broadcasts')
            .update({ total_recipients: contacts.length })
            .eq('id', broadcast_id)

        // Prepare Template Payload Structure
        // Note: We need to properly map components based on variables
        // For MVP, assuming no complex variables or simple body vars
        const templatePayload = {
            name: broadcast.template.name,
            language: { code: broadcast.template.language },
            components: broadcast.template.components || []
        }

        for (const contact of contacts) {
            try {
                // Rate limiting: sleep 50ms (approx 20 req/sec)
                // Meta limit is higher but let's be safe
                await new Promise(resolve => setTimeout(resolve, 50))

                // Get or create conversation (to link message)
                // Check existing open conversation
                let { data: conversation } = await supabase
                    .from('whatsapp_conversations')
                    .select('id')
                    .eq('organization_id', broadcast.organization_id)
                    .eq('contact_id', contact.id)
                    .in('status', ['open', 'assigned'])
                    .limit(1)
                    .maybeSingle()

                if (!conversation) {
                    // Create new conversation
                    const { data: newConv } = await supabase
                        .from('whatsapp_conversations')
                        .insert({
                            organization_id: broadcast.organization_id,
                            contact_id: contact.id,
                            status: 'open',
                            source: 'broadcast'
                        })
                        .select()
                        .single()
                    conversation = newConv
                }

                // Send to Meta API
                const response = await fetch(
                    `https://graph.facebook.com/v21.0/${provider.phone_number_id}/messages`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${provider.access_token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            messaging_product: 'whatsapp',
                            to: contact.phone_number,
                            type: 'template',
                            template: templatePayload
                        }),
                    }
                )

                const result = await response.json()

                if (!response.ok) {
                    throw new Error(result.error?.message || 'Meta API error')
                }

                // Record successful send
                successCount++

                // Save Message Record
                if (result.messages?.[0]?.id) {
                    await supabase.from('whatsapp_messages').insert({
                        organization_id: broadcast.organization_id,
                        conversation_id: conversation.id,
                        whatsapp_message_id: result.messages[0].id,
                        direction: 'outbound',
                        sender_type: 'bot', // or 'broadcast'
                        message_type: 'template',
                        content: `Template: ${broadcast.template.name}`,
                        status: 'sent',
                        metadata: { broadcast_id: broadcast_id }
                    })
                }

            } catch (err: any) {
                console.error(`❌ Failed to send to ${contact.phone_number}:`, err)
                failureCount++
                errors.push({ phone: contact.phone_number, error: err.message })
            }

            // Update progress every 10 contacts
            if ((successCount + failureCount) % 10 === 0) {
                await supabase
                    .from('whatsapp_broadcasts')
                    .update({
                        successful_sends: successCount,
                        failed_sends: failureCount
                    })
                    .eq('id', broadcast_id)
            }
        }

        // 5. Completion
        await supabase
            .from('whatsapp_broadcasts')
            .update({
                status: 'completed',
                successful_sends: successCount,
                failed_sends: failureCount,
                completed_at: new Date().toISOString()
            })
            .eq('id', broadcast_id)

        return new Response(
            JSON.stringify({
                success: true,
                stats: { total: contacts.length, sent: successCount, failed: failureCount, errors }
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )

    } catch (error: any) {
        console.error('Broadcast error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
