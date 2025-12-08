-- 004_campaigns_management.sql
-- Copied from original campaigns migration (archived at supabase/migrations-archive/old-migrations/20250107000006_campaigns_tables.sql)

-- Campaign Templates Table
CREATE TABLE IF NOT EXISTS public.whatsapp_campaign_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.whatsapp_organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  content TEXT NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb,
  media_url TEXT,
  media_type VARCHAR(50),
  language VARCHAR(10) DEFAULT 'en',
  status VARCHAR(50) DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- whatsapp_campaigns table
CREATE TABLE public.whatsapp_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.whatsapp_organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  template_id UUID REFERENCES public.whatsapp_campaign_templates(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'draft',
  target_segment VARCHAR(100),
  target_tags JSONB DEFAULT '[]'::jsonb,
  target_contact_ids JSONB DEFAULT '[]'::jsonb,
  schedule_type VARCHAR(50) DEFAULT 'immediate',
  scheduled_at TIMESTAMPTZ,
  timezone VARCHAR(100) DEFAULT 'UTC',
  total_recipients INTEGER DEFAULT 0,
  messages_sent INTEGER DEFAULT 0,
  messages_delivered INTEGER DEFAULT 0,
  messages_read INTEGER DEFAULT 0,
  messages_replied INTEGER DEFAULT 0,
  messages_failed INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
