-- Fix table name conflicts between chatbot and WhatsApp platform
-- This renames chatbot tables to have 'chatbot_' prefix

-- First, drop the conflicting tables if they exist
-- (These are from the older chatbot migration)
DROP TABLE IF EXISTS public.recommendations CASCADE;
DROP TABLE IF EXISTS public.conversation_messages CASCADE;
DROP TABLE IF EXISTS public.conversations CASCADE;
DROP TABLE IF EXISTS public.chatbot_analytics CASCADE;
DROP TABLE IF EXISTS public.faq_responses CASCADE;

-- Now recreate them with proper naming
-- These are for the website chatbot (not WhatsApp)

-- Chatbot conversations (website chat widget)
CREATE TABLE public.chatbot_conversations (
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

-- (Truncated for archive)
