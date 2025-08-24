import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FAQRequest {
  query: string;
  sessionId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { query, sessionId }: FAQRequest = await req.json();
    
    // Normalize query for matching
    const normalizedQuery = query.toLowerCase();
    
    // Get FAQ responses
    const { data: faqs } = await supabaseClient
      .from('faq_responses')
      .select('*')
      .eq('active', true)
      .order('priority', { ascending: false });

    // Find matching FAQ
    let bestMatch = null;
    let highestMatchCount = 0;

    for (const faq of faqs || []) {
      const matchCount = faq.question_keywords.filter((keyword: string) => 
        normalizedQuery.includes(keyword.toLowerCase())
      ).length;

      if (matchCount > highestMatchCount) {
        highestMatchCount = matchCount;
        bestMatch = faq;
      }
    }

    // Log analytics
    await supabaseClient
      .from('chatbot_analytics')
      .insert({
        event_type: 'faq_query',
        session_id: sessionId,
        data: {
          query: query,
          matched: !!bestMatch,
          category: bestMatch?.category || 'unmatched'
        }
      });

    if (bestMatch) {
      return new Response(JSON.stringify({
        success: true,
        response: bestMatch.response,
        resourceUrl: bestMatch.resource_url,
        category: bestMatch.category,
        hasMatch: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Default response for unmatched queries
      return new Response(JSON.stringify({
        success: true,
        response: "I'd be happy to help! For specific questions, please contact our support team or chat with us on WhatsApp.",
        resourceUrl: '/contact',
        category: 'general',
        hasMatch: false,
        suggestions: [
          { text: 'Talk to us on WhatsApp', url: 'https://wa.me/254784155752' },
          { text: 'Book a Consultation', url: '/contact' },
          { text: 'Browse our Knowledge Base', url: '/resources/knowledge-base' }
        ]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in chatbot-faq function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "I'm experiencing technical difficulties. Please contact our support team directly.",
      resourceUrl: '/contact'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});