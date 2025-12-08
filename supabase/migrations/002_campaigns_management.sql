-- ============================================================================
-- Campaigns Management Tables
-- ============================================================================
-- This migration creates tables for campaign management, templates, and tracking
-- ============================================================================

-- Campaign Templates Table
CREATE TABLE IF NOT EXISTS public.whatsapp_campaign_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.whatsapp_organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- marketing, transactional, notification, etc.
  content TEXT NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb, -- Template variables like {{name}}, {{product}}
  media_url TEXT,
  media_type VARCHAR(50), -- image, video, document
  language VARCHAR(10) DEFAULT 'en',
  status VARCHAR(50) DEFAULT 'draft', -- draft, active, archived
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns Table
-- Drop old table if exists to recreate with new schema
DROP TABLE IF EXISTS public.whatsapp_campaign_recipients CASCADE;
DROP TABLE IF EXISTS public.whatsapp_campaigns CASCADE;

CREATE TABLE public.whatsapp_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.whatsapp_organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  template_id UUID REFERENCES public.whatsapp_campaign_templates(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'draft', -- draft, scheduled, running, paused, completed, cancelled

  -- Targeting
  target_segment VARCHAR(100), -- all, vip, leads, customers, custom
  target_tags JSONB DEFAULT '[]'::jsonb, -- Array of tags to target
  target_contact_ids JSONB DEFAULT '[]'::jsonb, -- Specific contact IDs

  -- Scheduling
  schedule_type VARCHAR(50) DEFAULT 'immediate', -- immediate, scheduled, recurring
  scheduled_at TIMESTAMPTZ,
  timezone VARCHAR(100) DEFAULT 'UTC',

  -- Performance Tracking
  total_recipients INTEGER DEFAULT 0,
  messages_sent INTEGER DEFAULT 0,
  messages_delivered INTEGER DEFAULT 0,
  messages_read INTEGER DEFAULT 0,
  messages_replied INTEGER DEFAULT 0,
  messages_failed INTEGER DEFAULT 0,

  -- Metadata
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- Campaign Recipients Table
CREATE TABLE IF NOT EXISTS public.whatsapp_campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.whatsapp_campaigns(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES public.whatsapp_contacts(id) ON DELETE CASCADE,

  -- Delivery Status
  status VARCHAR(50) DEFAULT 'pending', -- pending, sent, delivered, read, replied, failed
  message_id UUID REFERENCES public.whatsapp_messages(id) ON DELETE SET NULL,

  -- Personalization
  personalized_content TEXT, -- Rendered message with variables replaced
  variables JSONB DEFAULT '{}'::jsonb, -- Contact-specific variable values

  -- Tracking
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  failure_reason TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(campaign_id, contact_id)
);

-- Campaign Performance Metrics (aggregated view)
CREATE OR REPLACE VIEW public.whatsapp_campaign_metrics AS
SELECT
  c.id AS campaign_id,
  c.organization_id,
  c.name AS campaign_name,
  c.status AS campaign_status,
  c.created_at,
  c.started_at,
  c.completed_at,

  -- Recipient counts
  COUNT(r.id) AS total_recipients,
  COUNT(r.id) FILTER (WHERE r.status = 'sent') AS sent_count,
  COUNT(r.id) FILTER (WHERE r.status = 'delivered') AS delivered_count,
  COUNT(r.id) FILTER (WHERE r.status = 'read') AS read_count,
  COUNT(r.id) FILTER (WHERE r.status = 'replied') AS replied_count,
  COUNT(r.id) FILTER (WHERE r.status = 'failed') AS failed_count,

  -- Percentages
  ROUND(
    100.0 * COUNT(r.id) FILTER (WHERE r.status = 'delivered') /
    NULLIF(COUNT(r.id) FILTER (WHERE r.status = 'sent'), 0),
    2
  ) AS delivery_rate,
  ROUND(
    100.0 * COUNT(r.id) FILTER (WHERE r.status = 'read') /
    NULLIF(COUNT(r.id) FILTER (WHERE r.status = 'delivered'), 0),
    2
  ) AS read_rate,
  ROUND(
    100.0 * COUNT(r.id) FILTER (WHERE r.status = 'replied') /
    NULLIF(COUNT(r.id) FILTER (WHERE r.status = 'delivered'), 0),
    2
  ) AS reply_rate

FROM public.whatsapp_campaigns c
LEFT JOIN public.whatsapp_campaign_recipients r ON c.id = r.campaign_id
GROUP BY c.id, c.organization_id, c.name, c.status, c.created_at, c.started_at, c.completed_at;

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_campaign_templates_org
  ON public.whatsapp_campaign_templates(organization_id);

CREATE INDEX IF NOT EXISTS idx_campaign_templates_status
  ON public.whatsapp_campaign_templates(status);

CREATE INDEX IF NOT EXISTS idx_campaigns_org
  ON public.whatsapp_campaigns(organization_id);

CREATE INDEX IF NOT EXISTS idx_campaigns_status
  ON public.whatsapp_campaigns(status);

CREATE INDEX IF NOT EXISTS idx_campaigns_scheduled
  ON public.whatsapp_campaigns(scheduled_at) WHERE status = 'scheduled';

CREATE INDEX IF NOT EXISTS idx_campaign_recipients_campaign
  ON public.whatsapp_campaign_recipients(campaign_id);

CREATE INDEX IF NOT EXISTS idx_campaign_recipients_contact
  ON public.whatsapp_campaign_recipients(contact_id);

CREATE INDEX IF NOT EXISTS idx_campaign_recipients_status
  ON public.whatsapp_campaign_recipients(status);

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

ALTER TABLE public.whatsapp_campaign_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_campaign_recipients ENABLE ROW LEVEL SECURITY;

-- Campaign Templates Policies
CREATE POLICY "Users can view templates from their organization"
  ON public.whatsapp_campaign_templates FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Users can create templates in their organization"
  ON public.whatsapp_campaign_templates FOR INSERT
  TO authenticated
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Users can update templates in their organization"
  ON public.whatsapp_campaign_templates FOR UPDATE
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Campaigns Policies
CREATE POLICY "Users can view campaigns from their organization"
  ON public.whatsapp_campaigns FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Users can create campaigns in their organization"
  ON public.whatsapp_campaigns FOR INSERT
  TO authenticated
  WITH CHECK (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Users can update campaigns in their organization"
  ON public.whatsapp_campaigns FOR UPDATE
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Campaign Recipients Policies
CREATE POLICY "Users can view campaign recipients from their organization"
  ON public.whatsapp_campaign_recipients FOR SELECT
  TO authenticated
  USING (
    campaign_id IN (
      SELECT id FROM public.whatsapp_campaigns
      WHERE organization_id IN (
        SELECT organization_id FROM public.whatsapp_team_members
        WHERE user_id = auth.uid() AND is_active = true
      )
    )
  );

CREATE POLICY "Users can insert campaign recipients for their campaigns"
  ON public.whatsapp_campaign_recipients FOR INSERT
  TO authenticated
  WITH CHECK (
    campaign_id IN (
      SELECT id FROM public.whatsapp_campaigns
      WHERE organization_id IN (
        SELECT organization_id FROM public.whatsapp_team_members
        WHERE user_id = auth.uid() AND is_active = true
      )
    )
  );

-- ============================================================================
-- Updated_at Triggers
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_campaign_templates_updated_at
  BEFORE UPDATE ON public.whatsapp_campaign_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.whatsapp_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaign_recipients_updated_at
  BEFORE UPDATE ON public.whatsapp_campaign_recipients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Sample Data
-- ============================================================================

-- Sample Templates
INSERT INTO public.whatsapp_campaign_templates (
  organization_id,
  name,
  description,
  category,
  content,
  variables,
  status
) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Welcome New Customer',
  'Welcome message for new customers',
  'marketing',
  'Hi {{name}}! 👋 Welcome to {{company}}. We''re excited to have you with us!',
  '["name", "company"]'::jsonb,
  'active'
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Product Launch Announcement',
  'Announce new product launches',
  'marketing',
  'Hey {{name}}! 🚀 We just launched {{product_name}}. Check it out: {{link}}',
  '["name", "product_name", "link"]'::jsonb,
  'active'
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Appointment Reminder',
  'Remind customers about upcoming appointments',
  'transactional',
  'Hi {{name}}, this is a reminder about your appointment on {{date}} at {{time}}.',
  '["name", "date", "time"]'::jsonb,
  'active'
);

-- Sample Campaign
INSERT INTO public.whatsapp_campaigns (
  organization_id,
  name,
  description,
  template_id,
  status,
  target_segment,
  schedule_type,
  total_recipients
) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Q1 Product Launch',
  'Announcing our new product lineup for Q1 2025',
  (SELECT id FROM public.whatsapp_campaign_templates WHERE name = 'Product Launch Announcement' LIMIT 1),
  'completed',
  'all',
  'immediate',
  150
);

-- ============================================================================
-- Verification
-- ============================================================================

SELECT
  'whatsapp_campaign_templates' AS table_name,
  COUNT(*) AS row_count
FROM public.whatsapp_campaign_templates
UNION ALL
SELECT
  'whatsapp_campaigns' AS table_name,
  COUNT(*) AS row_count
FROM public.whatsapp_campaigns
UNION ALL
SELECT
  'whatsapp_campaign_recipients' AS table_name,
  COUNT(*) AS row_count
FROM public.whatsapp_campaign_recipients;

-- ============================================================================
-- Success Message
-- ============================================================================

SELECT
  '✅ Campaign tables created successfully!' AS status,
  '3 sample templates added' AS templates,
  '1 sample campaign added' AS campaigns,
  'RLS policies enabled for security' AS security;
