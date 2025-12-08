-- ============================================================================
-- Settings & Configuration Tables
-- ============================================================================
-- This migration creates tables for user preferences, notifications, and API keys
-- ============================================================================

-- User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Notification Settings
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false,

  -- Notification Types
  notify_new_message BOOLEAN DEFAULT true,
  notify_new_conversation BOOLEAN DEFAULT true,
  notify_assignment BOOLEAN DEFAULT true,
  notify_mention BOOLEAN DEFAULT true,
  notify_campaign_complete BOOLEAN DEFAULT true,

  -- Email Digest
  daily_digest BOOLEAN DEFAULT false,
  weekly_digest BOOLEAN DEFAULT true,
  digest_time VARCHAR(5) DEFAULT '09:00', -- HH:mm format

  -- UI Preferences
  theme VARCHAR(20) DEFAULT 'system', -- light, dark, system
  language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(100) DEFAULT 'UTC',

  -- Display Preferences
  compact_mode BOOLEAN DEFAULT false,
  show_avatars BOOLEAN DEFAULT true,
  sound_enabled BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id)
);

-- Organization Settings Table
CREATE TABLE IF NOT EXISTS public.organization_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.whatsapp_organizations(id) ON DELETE CASCADE,

  -- Business Information
  business_name VARCHAR(255),
  business_description TEXT,
  business_address TEXT,
  business_phone VARCHAR(50),
  business_email VARCHAR(255),
  business_website VARCHAR(255),

  -- Operating Hours
  operating_hours JSONB DEFAULT '{
    "monday": {"open": "09:00", "close": "17:00", "enabled": true},
    "tuesday": {"open": "09:00", "close": "17:00", "enabled": true},
    "wednesday": {"open": "09:00", "close": "17:00", "enabled": true},
    "thursday": {"open": "09:00", "close": "17:00", "enabled": true},
    "friday": {"open": "09:00", "close": "17:00", "enabled": true},
    "saturday": {"open": "10:00", "close": "14:00", "enabled": false},
    "sunday": {"open": "10:00", "close": "14:00", "enabled": false}
  }'::jsonb,

  -- Auto-Response Settings
  auto_reply_enabled BOOLEAN DEFAULT false,
  auto_reply_message TEXT,
  away_message TEXT,
  business_hours_only BOOLEAN DEFAULT true,

  -- Conversation Settings
  auto_assign_conversations BOOLEAN DEFAULT true,
  assignment_method VARCHAR(50) DEFAULT 'round_robin', -- round_robin, least_active, manual
  max_conversations_per_agent INTEGER DEFAULT 10,
  conversation_timeout_hours INTEGER DEFAULT 24,

  -- Quality Settings
  require_satisfaction_rating BOOLEAN DEFAULT false,
  enable_conversation_tags BOOLEAN DEFAULT true,
  enable_internal_notes BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id)
);

-- API Keys Table
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.whatsapp_organizations(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  key_hash VARCHAR(255) NOT NULL, -- Hashed API key (never store plaintext)
  key_prefix VARCHAR(20) NOT NULL, -- First 8 chars for display (e.g., "sk_live_abc123...")

  -- Permissions
  permissions JSONB DEFAULT '["read"]'::jsonb, -- read, write, admin
  scopes JSONB DEFAULT '[]'::jsonb, -- conversations, messages, contacts, campaigns

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Usage Tracking
  last_used_at TIMESTAMPTZ,
  usage_count INTEGER DEFAULT 0,

  -- Metadata
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,

  UNIQUE(key_hash)
);

-- Webhooks Table
CREATE TABLE IF NOT EXISTS public.webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.whatsapp_organizations(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  secret VARCHAR(255), -- For signature verification

  -- Events to subscribe to
  events JSONB DEFAULT '[]'::jsonb, -- message.received, conversation.created, etc.

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Retry Settings
  max_retries INTEGER DEFAULT 3,
  retry_delay_seconds INTEGER DEFAULT 60,

  -- Stats
  last_triggered_at TIMESTAMPTZ,
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,

  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Integration Credentials Table (encrypted)
CREATE TABLE IF NOT EXISTS public.integration_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.whatsapp_organizations(id) ON DELETE CASCADE,

  integration_type VARCHAR(100) NOT NULL, -- whatsapp, openai, stripe, etc.

  -- Encrypted credentials (use pgcrypto or application-level encryption)
  credentials JSONB NOT NULL, -- Encrypted JSON with keys/tokens

  is_active BOOLEAN DEFAULT true,
  last_verified_at TIMESTAMPTZ,

  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id, integration_type)
);

-- ============================================================================
-- Indexes
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_preferences_user
  ON public.user_preferences(user_id);

CREATE INDEX IF NOT EXISTS idx_org_settings_org
  ON public.organization_settings(organization_id);

CREATE INDEX IF NOT EXISTS idx_api_keys_org
  ON public.api_keys(organization_id);

CREATE INDEX IF NOT EXISTS idx_api_keys_active
  ON public.api_keys(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_webhooks_org
  ON public.webhooks(organization_id);

CREATE INDEX IF NOT EXISTS idx_webhooks_active
  ON public.webhooks(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_integrations_org
  ON public.integration_credentials(organization_id);

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_credentials ENABLE ROW LEVEL SECURITY;

-- User Preferences Policies
CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Organization Settings Policies
CREATE POLICY "Users can view settings from their organization"
  ON public.organization_settings FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

CREATE POLICY "Admins can update organization settings"
  ON public.organization_settings FOR UPDATE
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND role IN ('admin', 'supervisor')
    )
  );

-- API Keys Policies
CREATE POLICY "Users can view API keys from their organization"
  ON public.api_keys FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage API keys"
  ON public.api_keys FOR ALL
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Webhooks Policies
CREATE POLICY "Admins can view webhooks"
  ON public.webhooks FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND role IN ('admin', 'supervisor')
    )
  );

CREATE POLICY "Admins can manage webhooks"
  ON public.webhooks FOR ALL
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Integration Credentials Policies (Admin only)
CREATE POLICY "Admins can view integration credentials"
  ON public.integration_credentials FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage integration credentials"
  ON public.integration_credentials FOR ALL
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM public.whatsapp_team_members
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- Updated_at Triggers
-- ============================================================================

-- Create the function if it doesn't exist (should exist from earlier migrations)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_org_settings_updated_at
  BEFORE UPDATE ON public.organization_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhooks_updated_at
  BEFORE UPDATE ON public.webhooks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at
  BEFORE UPDATE ON public.integration_credentials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Default Data
-- ============================================================================

-- Create default organization settings for demo org
INSERT INTO public.organization_settings (
  organization_id,
  business_name,
  business_description,
  auto_reply_enabled,
  auto_reply_message,
  away_message
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Demo Organization',
  'A demonstration organization for testing the WhatsApp platform',
  true,
  'Thanks for your message! We''ll get back to you shortly.',
  'We''re currently away. Our business hours are Monday-Friday, 9 AM - 5 PM.'
)
ON CONFLICT (organization_id) DO NOTHING;

-- ============================================================================
-- Helper Functions
-- ============================================================================

-- Function to create default user preferences
CREATE OR REPLACE FUNCTION create_default_user_preferences()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Trigger to auto-create user preferences
DROP TRIGGER IF EXISTS on_user_created_preferences ON auth.users;
CREATE TRIGGER on_user_created_preferences
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_user_preferences();

-- ============================================================================
-- Verification
-- ============================================================================

SELECT
  'user_preferences' AS table_name,
  COUNT(*) AS row_count
FROM public.user_preferences
UNION ALL
SELECT
  'organization_settings' AS table_name,
  COUNT(*) AS row_count
FROM public.organization_settings
UNION ALL
SELECT
  'api_keys' AS table_name,
  COUNT(*) AS row_count
FROM public.api_keys
UNION ALL
SELECT
  'webhooks' AS table_name,
  COUNT(*) AS row_count
FROM public.webhooks
UNION ALL
SELECT
  'integration_credentials' AS table_name,
  COUNT(*) AS row_count
FROM public.integration_credentials;

-- ============================================================================
-- Success Message
-- ============================================================================

SELECT
  '✅ Settings tables created successfully!' AS status,
  'User preferences auto-created on signup' AS preferences,
  'Organization settings configured for demo org' AS org_settings,
  'RLS policies enabled for security' AS security;
