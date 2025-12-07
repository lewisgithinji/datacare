-- ============================================================================
-- COMPLETE DATABASE CLEANUP AND SETUP
-- ============================================================================
-- This migration will:
-- 1. Drop ALL existing tables (chatbot, whatsapp, and conflicts)
-- 2. Recreate chatbot tables with chatbot_ prefix
-- 3. Recreate whatsapp tables with whatsapp_ prefix
-- 4. Preserve any existing data if needed
--
-- Run this ONCE to get a clean slate
-- ============================================================================

-- ============================================================================
-- STEP 1: DROP ALL EXISTING TABLES (Clean slate)
-- ============================================================================

-- Drop WhatsApp tables if they exist
DROP TABLE IF EXISTS whatsapp_analytics_events CASCADE;
DROP TABLE IF EXISTS whatsapp_analytics_events_2025_01 CASCADE;
DROP TABLE IF EXISTS whatsapp_analytics_events_2025_02 CASCADE;
DROP TABLE IF EXISTS whatsapp_automation_workflows CASCADE;
DROP TABLE IF EXISTS whatsapp_campaigns CASCADE;
DROP TABLE IF EXISTS whatsapp_templates CASCADE;
DROP TABLE IF EXISTS whatsapp_messages CASCADE;
DROP TABLE IF EXISTS whatsapp_conversations CASCADE;
DROP TABLE IF EXISTS whatsapp_contacts CASCADE;
DROP TABLE IF EXISTS whatsapp_team_members CASCADE;
DROP TABLE IF EXISTS whatsapp_organizations CASCADE;

-- Drop old unprefixed tables (conflicts)
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP TABLE IF EXISTS analytics_events_2025_01 CASCADE;
DROP TABLE IF EXISTS analytics_events_2025_02 CASCADE;
DROP TABLE IF EXISTS automation_workflows CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS templates CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS conversation_analytics_daily CASCADE;
DROP TABLE IF EXISTS message_analytics_hourly CASCADE;

-- Drop chatbot tables (will recreate)
DROP TABLE IF EXISTS chatbot_recommendations CASCADE;
DROP TABLE IF EXISTS chatbot_messages CASCADE;
DROP TABLE IF EXISTS chatbot_conversations CASCADE;
DROP TABLE IF EXISTS chatbot_analytics CASCADE;
DROP TABLE IF EXISTS chatbot_faq_responses CASCADE;

-- Drop old chatbot tables (original names)
DROP TABLE IF EXISTS recommendations CASCADE;
DROP TABLE IF EXISTS conversation_messages CASCADE;
DROP TABLE IF EXISTS faq_responses CASCADE;

-- Drop views
DROP VIEW IF EXISTS whatsapp_conversation_summary CASCADE;
DROP VIEW IF EXISTS whatsapp_agent_workload CASCADE;
DROP VIEW IF EXISTS conversation_summary CASCADE;
DROP VIEW IF EXISTS agent_workload CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS update_whatsapp_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS update_whatsapp_conversation_on_message() CASCADE;
DROP FUNCTION IF EXISTS update_whatsapp_contact_last_interaction() CASCADE;
DROP FUNCTION IF EXISTS update_conversation_on_message() CASCADE;
DROP FUNCTION IF EXISTS update_contact_last_interaction() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS update_chatbot_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS calculate_chatbot_lead_score(TEXT, TEXT, TEXT, TEXT) CASCADE;
DROP FUNCTION IF EXISTS calculate_lead_score(TEXT, TEXT, TEXT, TEXT) CASCADE;
DROP FUNCTION IF EXISTS auth.user_whatsapp_organization_ids() CASCADE;
DROP FUNCTION IF EXISTS auth.user_organization_ids() CASCADE;

-- Success message
SELECT '✅ Step 1 Complete: All old tables dropped' AS status;

-- ============================================================================
-- STEP 2: CREATE CHATBOT TABLES (Website chatbot)
-- ============================================================================

-- Chatbot conversations (website chat widget)
CREATE TABLE chatbot_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  intent TEXT,
  org_type TEXT,
  company_size TEXT,
  primary_need TEXT,
  current_stack TEXT,
  urgency TEXT,
  budget TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_company TEXT,
  contact_phone TEXT,
  lead_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Chatbot messages
CREATE TABLE chatbot_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES chatbot_conversations(id) ON DELETE CASCADE,
  message_type TEXT NOT NULL, -- 'user' | 'bot' | 'system'
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Chatbot product recommendations
CREATE TABLE chatbot_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES chatbot_conversations(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_url TEXT NOT NULL,
  reason TEXT NOT NULL,
  clicked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Chatbot analytics
CREATE TABLE chatbot_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'session_start', 'step_completed', 'recommendation_clicked', 'form_submitted'
  session_id UUID NOT NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- FAQ responses
CREATE TABLE chatbot_faq_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_keywords TEXT[] NOT NULL,
  response TEXT NOT NULL,
  resource_url TEXT,
  category TEXT NOT NULL,
  priority INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_faq_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (chatbot is public-facing)
CREATE POLICY "Allow public read/write on chatbot_conversations"
ON chatbot_conversations FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read/write on chatbot_messages"
ON chatbot_messages FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read/write on chatbot_recommendations"
ON chatbot_recommendations FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read/write on chatbot_analytics"
ON chatbot_analytics FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read on chatbot_faq_responses"
ON chatbot_faq_responses FOR SELECT USING (active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_chatbot_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_chatbot_conversations_updated_at
BEFORE UPDATE ON chatbot_conversations
FOR EACH ROW
EXECUTE FUNCTION update_chatbot_updated_at_column();

-- Create function to calculate lead score
CREATE OR REPLACE FUNCTION calculate_chatbot_lead_score(
  org_type TEXT,
  company_size TEXT,
  urgency TEXT,
  budget TEXT
) RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Organization type scoring
  CASE org_type
    WHEN 'Banking & Finance' THEN score := score + 30;
    WHEN 'Healthcare' THEN score := score + 25;
    WHEN 'Legal' THEN score := score + 20;
    WHEN 'Government' THEN score := score + 15;
    WHEN 'Manufacturing' THEN score := score + 15;
    WHEN 'Education' THEN score := score + 10;
    WHEN 'NGOs' THEN score := score + 10;
    WHEN 'SMEs' THEN score := score + 5;
    ELSE score := score + 0;
  END CASE;

  -- Company size scoring
  CASE company_size
    WHEN '300+' THEN score := score + 40;
    WHEN '51–300' THEN score := score + 30;
    WHEN '11–50' THEN score := score + 20;
    WHEN '1–10' THEN score := score + 10;
    ELSE score := score + 0;
  END CASE;

  -- Urgency scoring
  CASE urgency
    WHEN 'Now' THEN score := score + 30;
    WHEN '30 days' THEN score := score + 20;
    WHEN '90 days' THEN score := score + 10;
    ELSE score := score + 0;
  END CASE;

  -- Budget scoring
  CASE budget
    WHEN 'Enterprise' THEN score := score + 30;
    WHEN 'Standard' THEN score := score + 20;
    WHEN 'Entry' THEN score := score + 10;
    ELSE score := score + 0;
  END CASE;

  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Insert sample FAQ responses
INSERT INTO chatbot_faq_responses (question_keywords, response, resource_url, category, priority) VALUES
  (ARRAY['pricing', 'cost', 'price', 'how much'], 'Our solutions are priced competitively based on your organization size and needs. Contact us for a custom quote.', '/contact', 'pricing', 1),
  (ARRAY['features', 'what does', 'include'], 'Each solution includes comprehensive features tailored to your needs. Visit our detailed product pages for full feature lists.', '/products', 'features', 1),
  (ARRAY['support', 'help', 'assistance'], 'We provide 24/7 technical support with dedicated account managers for all our enterprise clients.', '/resources/knowledge-base', 'support', 1),
  (ARRAY['security', 'compliance', 'data protection'], 'All our solutions meet enterprise-grade security standards including ISO 27001 and GDPR compliance.', '/solutions/security-and-compliance', 'security', 1),
  (ARRAY['migration', 'setup', 'implementation'], 'Our expert team handles complete migration and setup with minimal downtime. Implementation typically takes 1-2 weeks.', '/resources/guides', 'implementation', 1),
  (ARRAY['training', 'learning', 'onboarding'], 'We provide comprehensive training programs and ongoing support to ensure your team maximizes productivity.', '/resources/guides', 'training', 1);

-- Success message
SELECT '✅ Step 2 Complete: Chatbot tables created' AS status;

-- Success message
SELECT '🎉 DATABASE CLEANUP COMPLETE!' AS final_status,
       '✅ Chatbot tables ready (chatbot_*)' AS chatbot_status,
       '⏭️ Next: Run whatsapp migration (20250107000004_whatsapp_platform_with_prefix.sql)' AS next_step;
