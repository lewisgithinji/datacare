// DataCare Sync Templates Function
// Fetches WhatsApp message templates from Meta Graph API and syncs to database

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

        // Get authorization header to identify user
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            throw new Error('No authorization header')
        }

        // Get user from JWT
        const token = authHeader.replace('Bearer ', '')
        const { data: { user }, error: userError } = await supabase.auth.getUser(token)

        if (userError || !user) {
            throw new Error('Unauthorized')
        }

        console.log(`🔄 Syncing templates for user: ${user.id}`)

        // 1. Get organization ID for user
        const { data: member, error: memberError } = await supabase
            .from('whatsapp_team_members')
            .select('organization_id')
            .eq('user_id', user.id)
            .single()

        if (memberError || !member) {
            throw new Error('No organization found for user')
        }

        const organizationId = member.organization_id
        console.log(`📋 Organization: ${organizationId}`)

        // 2. Fetch WhatsApp provider credentials
        const { data: provider, error: providerError } = await supabase
            .from('whatsapp_providers')
            .select('*')
            .eq('organization_id', organizationId)
            .eq('status', 'active')
            .single()

        if (providerError || !provider) {
            return new Response(
                JSON.stringify({
                    error: 'No active WhatsApp provider configured. Please add your credentials in Settings → Connections.'
                }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            )
        }

        console.log(`📱 Using WABA: ${provider.waba_id}`)

        // 3. Fetch templates from Meta Graph API
        const metaApiUrl = `https://graph.facebook.com/v21.0/${provider.waba_id}/message_templates`

        const metaResponse = await fetch(metaApiUrl, {
            headers: {
                'Authorization': `Bearer ${provider.access_token}`
            }
        })

        if (!metaResponse.ok) {
            const errorData = await metaResponse.json()
            console.error('Meta API Error:', errorData)

            if (metaResponse.status === 401 || metaResponse.status === 403) {
                return new Response(
                    JSON.stringify({
                        error: 'WhatsApp access token is invalid or expired. Please update your credentials in Settings → Connections.'
                    }),
                    {
                        status: 401,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                    }
                )
            }

            throw new Error(`Meta API error: ${errorData.error?.message || 'Unknown error'}`)
        }

        const metaData = await metaResponse.json()
        const templates = metaData.data || []

        console.log(`✅ Fetched ${templates.length} templates from Meta`)

        // 4. Upsert templates into database
        let syncedCount = 0
        let errors = []

        for (const template of templates) {
            try {
                const { error: upsertError } = await supabase
                    .from('whatsapp_templates')
                    .upsert({
                        organization_id: organizationId,
                        whatsapp_template_id: template.id,
                        name: template.name,
                        language: template.language,
                        category: template.category,
                        status: template.status,
                        components: template.components || [],
                        quality_score: template.quality_score?.score || null,
                        updated_at: new Date().toISOString()
                    }, {
                        onConflict: 'organization_id,name,language',
                        ignoreDuplicates: false
                    })

                if (upsertError) {
                    console.error(`Error upserting template ${template.name}:`, upsertError)
                    errors.push({ template: template.name, error: upsertError.message })
                } else {
                    syncedCount++
                }
            } catch (err) {
                console.error(`Exception upserting template ${template.name}:`, err)
                errors.push({ template: template.name, error: err.message })
            }
        }

        console.log(`✨ Synced ${syncedCount}/${templates.length} templates`)

        return new Response(
            JSON.stringify({
                success: true,
                synced: syncedCount,
                total: templates.length,
                errors: errors
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )

    } catch (error) {
        console.error('Sync error:', error)
        return new Response(
            JSON.stringify({
                error: error.message || 'Failed to sync templates'
            }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )
    }
})
