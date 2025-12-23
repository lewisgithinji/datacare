import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SendMessageRequest {
    organization_id: string
    conversation_id: string
    to: string
    content: string
    message_type?: 'text' | 'image' | 'video' | 'audio' | 'document'
    media_url?: string
    media_caption?: string
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders })
    }

    try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

        // Parse request
        const payload: SendMessageRequest = await req.json()
        const { organization_id, conversation_id, to, content, message_type = 'text', media_url, media_caption } = payload

        // Validate required fields
        if (!organization_id || !conversation_id || !to) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        if (message_type === 'text' && !content) {
            return new Response(
                JSON.stringify({ error: 'Content is required for text messages' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Get organization to retrieve WhatsApp credentials
        const { data: organization, error: orgError } = await supabase
            .from('whatsapp_organizations')
            .select('whatsapp_phone_number_id, whatsapp_access_token')
            .eq('id', organization_id)
            .single()

        if (orgError || !organization) {
            console.error('Organization not found:', orgError)
            return new Response(
                JSON.stringify({ error: 'Organization not found' }),
                { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        if (!organization.whatsapp_phone_number_id || !organization.whatsapp_access_token) {
            return new Response(
                JSON.stringify({ error: 'WhatsApp credentials not configured for this organization' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Build WhatsApp message payload
        const whatsappPayload: any = {
            messaging_product: 'whatsapp',
            to: to.replace(/\D/g, ''), // Remove non-digits
            type: message_type
        }

        if (message_type === 'text') {
            whatsappPayload.text = { body: content }
        } else if (message_type === 'image') {
            whatsappPayload.image = {
                link: media_url,
                caption: media_caption || ''
            }
        } else if (message_type === 'video') {
            whatsappPayload.video = {
                link: media_url,
                caption: media_caption || ''
            }
        } else if (message_type === 'audio') {
            whatsappPayload.audio = {
                link: media_url
            }
        } else if (message_type === 'document') {
            whatsappPayload.document = {
                link: media_url,
                filename: media_caption || 'document'
            }
        }

        // Send via WhatsApp Graph API
        const whatsappUrl = `https://graph.facebook.com/v21.0/${organization.whatsapp_phone_number_id}/messages`

        console.log('📤 Sending WhatsApp message:', { to, type: message_type })

        const whatsappResponse = await fetch(whatsappUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${organization.whatsapp_access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(whatsappPayload)
        })

        const whatsappData = await whatsappResponse.json()

        if (!whatsappResponse.ok) {
            console.error('❌ WhatsApp API error:', whatsappData)

            // Save failed message to database
            await supabase
                .from('whatsapp_messages')
                .insert({
                    organization_id,
                    conversation_id,
                    direction: 'outbound',
                    sender_type: 'agent',
                    message_type,
                    content,
                    media_url,
                    media_caption,
                    status: 'failed',
                    error_code: whatsappData.error?.code?.toString(),
                    error_message: whatsappData.error?.message || 'Failed to send',
                    failed_at: new Date().toISOString()
                })

            return new Response(
                JSON.stringify({
                    error: 'Failed to send WhatsApp message',
                    details: whatsappData.error
                }),
                { status: whatsappResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Message sent successfully - save to database
        const whatsappMessageId = whatsappData.messages?.[0]?.id

        const { data: savedMessage, error: saveError } = await supabase
            .from('whatsapp_messages')
            .insert({
                organization_id,
                conversation_id,
                whatsapp_message_id: whatsappMessageId,
                direction: 'outbound',
                sender_type: 'agent',
                message_type,
                content,
                media_url,
                media_caption,
                status: 'sent',
                sent_at: new Date().toISOString()
            })
            .select()
            .single()

        if (saveError) {
            console.error('❌ Error saving message to database:', saveError)
            // Message was sent but not saved - log warning
        }

        console.log('✅ Message sent successfully:', whatsappMessageId)

        return new Response(
            JSON.stringify({
                success: true,
                message_id: whatsappMessageId,
                database_id: savedMessage?.id
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error('❌ Unexpected error:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
