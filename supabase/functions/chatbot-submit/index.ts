import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatbotSubmission {
  sessionId: string;
  intent: string;
  orgType: string;
  companySize: string;
  primaryNeed: string;
  currentStack: string;
  urgency: string;
  budget: string;
  contact: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
  recommendations: Array<{
    id: string;
    name: string;
    url: string;
    reason: string;
  }>;
  leadScore: number;
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

    const submission: ChatbotSubmission = await req.json();

    // Calculate lead score
    const leadScore = await supabaseClient.rpc('calculate_lead_score', {
      org_type: submission.orgType,
      company_size: submission.companySize,
      urgency: submission.urgency,
      budget: submission.budget
    });

    // Store conversation
    const { data: conversation, error: convError } = await supabaseClient
      .from('conversations')
      .insert({
        session_id: submission.sessionId,
        intent: submission.intent,
        org_type: submission.orgType,
        company_size: submission.companySize,
        primary_need: submission.primaryNeed,
        current_stack: submission.currentStack,
        urgency: submission.urgency,
        budget: submission.budget,
        contact_name: submission.contact.name,
        contact_email: submission.contact.email,
        contact_company: submission.contact.company,
        contact_phone: submission.contact.phone,
        lead_score: leadScore.data || 0,
        status: 'completed'
      })
      .select()
      .single();

    if (convError) throw convError;

    // Store recommendations
    if (submission.recommendations.length > 0) {
      const recommendationsData = submission.recommendations.map(rec => ({
        conversation_id: conversation.id,
        product_id: rec.id,
        product_name: rec.name,
        product_url: rec.url,
        reason: rec.reason
      }));

      await supabaseClient
        .from('recommendations')
        .insert(recommendationsData);
    }

    // Store analytics
    await supabaseClient
      .from('chatbot_analytics')
      .insert({
        event_type: 'form_submitted',
        session_id: submission.sessionId,
        data: {
          lead_score: leadScore.data || 0,
          recommendations_count: submission.recommendations.length,
          contact_provided: true
        }
      });

    // Send email notifications
    const isHighValueLead = (leadScore.data || 0) >= 70;
    
    if (isHighValueLead) {
      // Send immediate notification to sales team
      const salesEmailHtml = `
        <h2>🚨 High-Value Lead Alert!</h2>
        <h3>Lead Score: ${leadScore.data}/130</h3>
        
        <h4>Contact Information:</h4>
        <ul>
          <li><strong>Name:</strong> ${submission.contact.name}</li>
          <li><strong>Email:</strong> ${submission.contact.email}</li>
          <li><strong>Company:</strong> ${submission.contact.company}</li>
          <li><strong>Phone:</strong> ${submission.contact.phone}</li>
        </ul>

        <h4>Organization Details:</h4>
        <ul>
          <li><strong>Type:</strong> ${submission.orgType}</li>
          <li><strong>Size:</strong> ${submission.companySize} employees</li>
          <li><strong>Primary Need:</strong> ${submission.primaryNeed}</li>
          <li><strong>Current Stack:</strong> ${submission.currentStack}</li>
          <li><strong>Urgency:</strong> ${submission.urgency}</li>
          <li><strong>Budget:</strong> ${submission.budget}</li>
        </ul>

        <h4>Recommended Solutions:</h4>
        <ul>
          ${submission.recommendations.map(rec => 
            `<li><strong>${rec.name}:</strong> ${rec.reason}</li>`
          ).join('')}
        </ul>

        <p><strong>⚡ Follow up immediately - this lead is ready to buy!</strong></p>
      `;

      await resend.emails.send({
        from: 'Datacare Chatbot <noreply@datacare.co.ke>',
        to: ['sales@datacare.co.ke'],
        subject: `🚨 High-Value Lead: ${submission.contact.company} (Score: ${leadScore.data})`,
        html: salesEmailHtml,
      });
    }

    // Send confirmation email to customer
    const customerEmailHtml = `
      <h2>Thank you for your interest in Datacare solutions!</h2>
      
      <p>Hi ${submission.contact.name},</p>
      
      <p>We've received your information and our team will contact you within 24 hours with a customized proposal for ${submission.contact.company}.</p>
      
      <h3>Based on your needs, we recommend:</h3>
      <ul>
        ${submission.recommendations.map(rec => 
          `<li><strong>${rec.name}:</strong> ${rec.reason}</li>`
        ).join('')}
      </ul>

      <h3>Next Steps:</h3>
      <ul>
        <li>📞 Our solutions specialist will call you at ${submission.contact.phone || 'your provided number'}</li>
        <li>📧 You'll receive a detailed proposal via email</li>
        <li>💬 Feel free to reach out on WhatsApp: <a href="https://wa.me/254784155752">+254 784 155 752</a></li>
      </ul>

      <p>In the meantime, you can:</p>
      <ul>
        <li><a href="https://datacare.co.ke/contact">Book a consultation</a></li>
        <li><a href="https://datacare.co.ke/resources">Explore our resources</a></li>
        <li><a href="https://wa.me/254784155752">Chat with us on WhatsApp</a></li>
      </ul>

      <p>Best regards,<br>
      The Datacare Team<br>
      📧 sales@datacare.co.ke<br>
      📞 +254 784 155 752</p>
    `;

    await resend.emails.send({
      from: 'Datacare Solutions <noreply@datacare.co.ke>',
      to: [submission.contact.email],
      subject: `Thank you for your interest, ${submission.contact.name}!`,
      html: customerEmailHtml,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      conversationId: conversation.id,
      leadScore: leadScore.data || 0,
      isHighValue: isHighValueLead
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chatbot-submit function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});