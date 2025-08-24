-- Create conversations table for storing chat interactions
CREATE TABLE public.conversations (
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

-- Create conversation_messages table for storing individual messages
CREATE TABLE public.conversation_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  message_type TEXT NOT NULL, -- 'user' | 'bot' | 'system'
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recommendations table for storing generated recommendations
CREATE TABLE public.recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_url TEXT NOT NULL,
  reason TEXT NOT NULL,
  clicked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics table for tracking chatbot performance
CREATE TABLE public.chatbot_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'session_start', 'step_completed', 'recommendation_clicked', 'form_submitted'
  session_id UUID NOT NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create FAQ responses table
CREATE TABLE public.faq_responses (
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
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (chatbot is public-facing)
CREATE POLICY "Allow public read/write on conversations" 
ON public.conversations 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow public read/write on conversation_messages" 
ON public.conversation_messages 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow public read/write on recommendations" 
ON public.recommendations 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow public read/write on chatbot_analytics" 
ON public.chatbot_analytics 
FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow public read on faq_responses" 
ON public.faq_responses 
FOR SELECT 
USING (active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_conversations_updated_at
BEFORE UPDATE ON public.conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate lead score
CREATE OR REPLACE FUNCTION public.calculate_lead_score(
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
INSERT INTO public.faq_responses (question_keywords, response, resource_url, category, priority) VALUES
  (ARRAY['pricing', 'cost', 'price', 'how much'], 'Our solutions are priced competitively based on your organization size and needs. Contact us for a custom quote.', '/contact', 'pricing', 1),
  (ARRAY['features', 'what does', 'include'], 'Each solution includes comprehensive features tailored to your needs. Visit our detailed product pages for full feature lists.', '/products', 'features', 1),
  (ARRAY['support', 'help', 'assistance'], 'We provide 24/7 technical support with dedicated account managers for all our enterprise clients.', '/resources/knowledge-base', 'support', 1),
  (ARRAY['security', 'compliance', 'data protection'], 'All our solutions meet enterprise-grade security standards including ISO 27001 and GDPR compliance.', '/solutions/security-and-compliance', 'security', 1),
  (ARRAY['migration', 'setup', 'implementation'], 'Our expert team handles complete migration and setup with minimal downtime. Implementation typically takes 1-2 weeks.', '/resources/guides', 'implementation', 1),
  (ARRAY['training', 'learning', 'onboarding'], 'We provide comprehensive training programs and ongoing support to ensure your team maximizes productivity.', '/resources/guides', 'training', 1);