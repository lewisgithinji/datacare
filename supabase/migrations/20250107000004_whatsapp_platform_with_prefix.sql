-- DataCare WhatsApp Platform - Multi-Tenant Database Schema
-- Migration: Initial Schema Setup with whatsapp_ prefix
-- Created: 2025-01-07
-- Updated: 2025-01-07 (Added whatsapp_ prefix to all tables)

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- WHATSAPP_ORGANIZATIONS (Multi-tenant support)
-- ============================================================================
CREATE TABLE whatsapp_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,

  -- WhatsApp credentials (encrypted)
  whatsapp_phone_number_id TEXT UNIQUE,
  whatsapp_business_account_id TEXT,
  whatsapp_access_token TEXT,
  whatsapp_verify_token TEXT,

  -- Plan & billing
  plan TEXT DEFAULT 'trial' CHECK (plan IN ('trial', 'starter', 'professional', 'enterprise')),
  plan_expires_at TIMESTAMPTZ,

  -- Features & settings
  features JSONB DEFAULT '{
    "ai_chatbot": true,
    "workflows": false,
    "analytics": true,
    "campaigns": false,
    "api_access": false
  }'::jsonb,

  -- Branding (white-label)
  branding JSONB DEFAULT '{
    "logo_url": null,
    "primary_color": "#3B82F6",
    "company_name": null,
    "custom_domain": null
  }'::jsonb,

  -- Settings
  settings JSONB DEFAULT '{
    "business_hours": {
      "enabled": true,
      "timezone": "Africa/Nairobi",
      "schedule": {
        "monday": {"start": "08:00", "end": "18:00"},
        "tuesday": {"start": "08:00", "end": "18:00"},
        "wednesday": {"start": "08:00", "end": "18:00"},
        "thursday": {"start": "08:00", "end": "18:00"},
        "friday": {"start": "08:00", "end": "18:00"},
        "saturday": null,
        "sunday": null
      }
    },
    "auto_response": {
      "enabled": true,
      "outside_hours_message": "Thank you for contacting us. We will respond during business hours."
    },
    "languages": ["en", "sw"]
  }'::jsonb,

  billing_info JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_whatsapp_organizations_slug ON whatsapp_organizations(slug);
CREATE INDEX idx_whatsapp_organizations_active ON whatsapp_organizations(is_active) WHERE is_active = true;

-- ============================================================================
-- WHATSAPP_TEAM_MEMBERS (Agents/Users)
-- ============================================================================
CREATE TABLE whatsapp_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES whatsapp_organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Role & permissions
  role TEXT NOT NULL CHECK (role IN ('admin', 'supervisor', 'agent', 'viewer')),
  permissions JSONB DEFAULT '[]'::jsonb,

  -- Status & availability
  is_active BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'busy', 'away')),
  last_seen_at TIMESTAMPTZ,

  -- Capacity & skills
  max_concurrent_conversations INT DEFAULT 5,
  skills TEXT[] DEFAULT '{}',

  -- Profile
  display_name TEXT,
  avatar_url TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id, user_id)
);

-- Indexes
CREATE INDEX idx_whatsapp_team_members_org ON whatsapp_team_members(organization_id);
CREATE INDEX idx_whatsapp_team_members_user ON whatsapp_team_members(user_id);
CREATE INDEX idx_whatsapp_team_members_status ON whatsapp_team_members(organization_id, status) WHERE is_active = true;

-- ============================================================================
-- WHATSAPP_CONTACTS (Customers)
-- ============================================================================
CREATE TABLE whatsapp_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES whatsapp_organizations(id) ON DELETE CASCADE,

  -- Contact info
  phone_number TEXT NOT NULL,
  name TEXT,
  email TEXT,
  avatar_url TEXT,

  -- Categorization
  tags TEXT[] DEFAULT '{}',
  segment TEXT, -- e.g., 'vip', 'lead', 'customer'

  -- Custom fields
  custom_fields JSONB DEFAULT '{}'::jsonb,

  -- Metadata
  metadata JSONB DEFAULT '{
    "source": "whatsapp",
    "total_conversations": 0,
    "total_messages": 0,
    "last_activity": null
  }'::jsonb,

  -- Engagement
  last_interaction_at TIMESTAMPTZ,
  first_interaction_at TIMESTAMPTZ,

  -- Consent
  opt_in_status TEXT DEFAULT 'opted_in' CHECK (opt_in_status IN ('opted_in', 'opted_out', 'pending')),
  opt_in_date TIMESTAMPTZ,
  opt_out_date TIMESTAMPTZ,

  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id, phone_number)
);

-- Indexes
CREATE INDEX idx_whatsapp_contacts_org_phone ON whatsapp_contacts(organization_id, phone_number);
CREATE INDEX idx_whatsapp_contacts_org_tags ON whatsapp_contacts USING GIN(tags);
CREATE INDEX idx_whatsapp_contacts_org_segment ON whatsapp_contacts(organization_id, segment);
CREATE INDEX idx_whatsapp_contacts_last_interaction ON whatsapp_contacts(organization_id, last_interaction_at DESC);

-- ============================================================================
-- WHATSAPP_CONVERSATIONS (Chat sessions)
-- ============================================================================
CREATE TABLE whatsapp_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES whatsapp_organizations(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES whatsapp_contacts(id) ON DELETE CASCADE,

  -- Assignment
  assigned_agent_id UUID REFERENCES whatsapp_team_members(id) ON DELETE SET NULL,
  assigned_at TIMESTAMPTZ,

  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'pending', 'resolved', 'closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),

  -- Channel & source
  channel TEXT DEFAULT 'whatsapp',
  source TEXT, -- e.g., 'inbound', 'campaign', 'api'

  -- Categorization
  tags TEXT[] DEFAULT '{}',
  category TEXT, -- AI-detected: 'sales', 'support', 'complaint', 'inquiry'

  -- AI Analysis
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  intent TEXT,
  summary TEXT, -- AI-generated summary

  -- Metrics
  first_response_time_seconds INT,
  resolution_time_seconds INT,
  total_messages_count INT DEFAULT 0,
  agent_messages_count INT DEFAULT 0,
  bot_messages_count INT DEFAULT 0,

  -- Satisfaction
  satisfaction_rating INT CHECK (satisfaction_rating BETWEEN 1 AND 5),
  satisfaction_comment TEXT,

  -- Timestamps
  last_message_at TIMESTAMPTZ,
  first_agent_response_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_whatsapp_conversations_org ON whatsapp_conversations(organization_id);
CREATE INDEX idx_whatsapp_conversations_contact ON whatsapp_conversations(contact_id);
CREATE INDEX idx_whatsapp_conversations_assigned_agent ON whatsapp_conversations(assigned_agent_id) WHERE assigned_agent_id IS NOT NULL;
CREATE INDEX idx_whatsapp_conversations_status ON whatsapp_conversations(organization_id, status);
CREATE INDEX idx_whatsapp_conversations_last_message ON whatsapp_conversations(organization_id, last_message_at DESC);
CREATE INDEX idx_whatsapp_conversations_tags ON whatsapp_conversations USING GIN(tags);

-- ============================================================================
-- WHATSAPP_MESSAGES (All messages)
-- ============================================================================
CREATE TABLE whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES whatsapp_organizations(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,

  -- WhatsApp identifiers
  whatsapp_message_id TEXT,

  -- Direction & sender
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  sender_type TEXT NOT NULL CHECK (sender_type IN ('contact', 'agent', 'bot', 'system')),
  sender_id UUID, -- contact_id or team_member_id

  -- Content
  message_type TEXT NOT NULL CHECK (message_type IN (
    'text', 'image', 'video', 'audio', 'document',
    'location', 'contact', 'template', 'interactive'
  )),
  content TEXT,

  -- Media
  media_url TEXT,
  media_mime_type TEXT,
  media_size_bytes INT,
  media_caption TEXT,

  -- Template (for outbound template messages)
  template_name TEXT,
  template_language TEXT,
  template_components JSONB,

  -- Status tracking
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read', 'failed')),
  error_code TEXT,
  error_message TEXT,

  -- Internal notes
  is_internal_note BOOLEAN DEFAULT false,

  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Timestamps
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_whatsapp_messages_org ON whatsapp_messages(organization_id);
CREATE INDEX idx_whatsapp_messages_conversation ON whatsapp_messages(conversation_id, created_at DESC);
CREATE INDEX idx_whatsapp_messages_whatsapp_id ON whatsapp_messages(whatsapp_message_id) WHERE whatsapp_message_id IS NOT NULL;
CREATE INDEX idx_whatsapp_messages_org_created ON whatsapp_messages(organization_id, created_at DESC);
CREATE INDEX idx_whatsapp_messages_sender ON whatsapp_messages(sender_id) WHERE sender_id IS NOT NULL;

-- ============================================================================
-- WHATSAPP_TEMPLATES (WhatsApp message templates)
-- ============================================================================
CREATE TABLE whatsapp_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES whatsapp_organizations(id) ON DELETE CASCADE,

  -- Template details
  whatsapp_template_id TEXT,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('MARKETING', 'UTILITY', 'AUTHENTICATION')),
  language TEXT DEFAULT 'en',

  -- Status
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'PAUSED', 'DISABLED')),
  rejection_reason TEXT,

  -- Components (header, body, footer, buttons)
  components JSONB NOT NULL,

  -- Usage stats
  usage_count INT DEFAULT 0,
  last_used_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id, name)
);

-- Indexes
CREATE INDEX idx_whatsapp_templates_org ON whatsapp_templates(organization_id);
CREATE INDEX idx_whatsapp_templates_status ON whatsapp_templates(organization_id, status);

-- ============================================================================
-- WHATSAPP_CAMPAIGNS (Bulk messaging)
-- ============================================================================
CREATE TABLE whatsapp_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES whatsapp_organizations(id) ON DELETE CASCADE,

  -- Campaign details
  name TEXT NOT NULL,
  description TEXT,
  template_id UUID REFERENCES whatsapp_templates(id) ON DELETE SET NULL,

  -- Targeting
  target_segment JSONB, -- filtering criteria
  target_contact_ids UUID[], -- explicit list
  total_target_count INT DEFAULT 0,

  -- Scheduling
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'running', 'paused', 'completed', 'cancelled', 'failed')),

  -- Stats
  stats JSONB DEFAULT '{
    "total": 0,
    "sent": 0,
    "delivered": 0,
    "read": 0,
    "failed": 0,
    "replied": 0
  }'::jsonb,

  -- Settings
  send_rate_per_second INT DEFAULT 10,

  created_by UUID REFERENCES whatsapp_team_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_whatsapp_campaigns_org ON whatsapp_campaigns(organization_id);
CREATE INDEX idx_whatsapp_campaigns_status ON whatsapp_campaigns(organization_id, status);
CREATE INDEX idx_whatsapp_campaigns_scheduled ON whatsapp_campaigns(scheduled_at) WHERE status = 'scheduled';

-- ============================================================================
-- WHATSAPP_AUTOMATION_WORKFLOWS
-- ============================================================================
CREATE TABLE whatsapp_automation_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES whatsapp_organizations(id) ON DELETE CASCADE,

  -- Workflow details
  name TEXT NOT NULL,
  description TEXT,

  -- Trigger configuration
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('keyword', 'schedule', 'event', 'webhook')),
  trigger_config JSONB NOT NULL,

  -- Workflow definition (nodes and edges)
  workflow_definition JSONB NOT NULL,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Execution stats
  execution_count INT DEFAULT 0,
  last_executed_at TIMESTAMPTZ,
  last_execution_status TEXT,

  created_by UUID REFERENCES whatsapp_team_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_whatsapp_workflows_org ON whatsapp_automation_workflows(organization_id);
CREATE INDEX idx_whatsapp_workflows_active ON whatsapp_automation_workflows(organization_id, is_active) WHERE is_active = true;

-- ============================================================================
-- WHATSAPP_ANALYTICS_EVENTS (Detailed tracking)
-- ============================================================================
CREATE TABLE whatsapp_analytics_events (
  id UUID DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES whatsapp_organizations(id) ON DELETE CASCADE,

  -- Event details
  event_type TEXT NOT NULL,
  event_category TEXT, -- 'message', 'conversation', 'campaign', 'user'
  event_data JSONB NOT NULL,

  -- Context
  user_id UUID,
  team_member_id UUID REFERENCES whatsapp_team_members(id),
  conversation_id UUID REFERENCES whatsapp_conversations(id),
  campaign_id UUID REFERENCES whatsapp_campaigns(id),

  -- Timestamp (partitioned for performance)
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Composite primary key including partition column
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create partitions for analytics (monthly)
CREATE TABLE whatsapp_analytics_events_2025_01 PARTITION OF whatsapp_analytics_events
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE whatsapp_analytics_events_2025_02 PARTITION OF whatsapp_analytics_events
  FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');

-- Indexes
CREATE INDEX idx_whatsapp_analytics_org_type ON whatsapp_analytics_events(organization_id, event_type, created_at DESC);
CREATE INDEX idx_whatsapp_analytics_conversation ON whatsapp_analytics_events(conversation_id) WHERE conversation_id IS NOT NULL;

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_whatsapp_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_whatsapp_organizations_updated_at BEFORE UPDATE ON whatsapp_organizations
  FOR EACH ROW EXECUTE FUNCTION update_whatsapp_updated_at_column();

CREATE TRIGGER update_whatsapp_team_members_updated_at BEFORE UPDATE ON whatsapp_team_members
  FOR EACH ROW EXECUTE FUNCTION update_whatsapp_updated_at_column();

CREATE TRIGGER update_whatsapp_contacts_updated_at BEFORE UPDATE ON whatsapp_contacts
  FOR EACH ROW EXECUTE FUNCTION update_whatsapp_updated_at_column();

CREATE TRIGGER update_whatsapp_conversations_updated_at BEFORE UPDATE ON whatsapp_conversations
  FOR EACH ROW EXECUTE FUNCTION update_whatsapp_updated_at_column();

CREATE TRIGGER update_whatsapp_templates_updated_at BEFORE UPDATE ON whatsapp_templates
  FOR EACH ROW EXECUTE FUNCTION update_whatsapp_updated_at_column();

CREATE TRIGGER update_whatsapp_campaigns_updated_at BEFORE UPDATE ON whatsapp_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_whatsapp_updated_at_column();

CREATE TRIGGER update_whatsapp_workflows_updated_at BEFORE UPDATE ON whatsapp_automation_workflows
  FOR EACH ROW EXECUTE FUNCTION update_whatsapp_updated_at_column();

-- Function: Update conversation metrics on new message
CREATE OR REPLACE FUNCTION update_whatsapp_conversation_on_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE whatsapp_conversations SET
    total_messages_count = total_messages_count + 1,
    agent_messages_count = CASE WHEN NEW.sender_type = 'agent' THEN agent_messages_count + 1 ELSE agent_messages_count END,
    bot_messages_count = CASE WHEN NEW.sender_type = 'bot' THEN bot_messages_count + 1 ELSE bot_messages_count END,
    last_message_at = NEW.created_at,
    first_agent_response_at = CASE
      WHEN NEW.sender_type IN ('agent', 'bot') AND first_agent_response_at IS NULL
      THEN NEW.created_at
      ELSE first_agent_response_at
    END,
    first_response_time_seconds = CASE
      WHEN NEW.sender_type IN ('agent', 'bot') AND first_agent_response_at IS NULL
      THEN EXTRACT(EPOCH FROM (NEW.created_at - created_at))::INT
      ELSE first_response_time_seconds
    END
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_whatsapp_conversation_on_message
  AFTER INSERT ON whatsapp_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_whatsapp_conversation_on_message();

-- Function: Update contact last interaction
CREATE OR REPLACE FUNCTION update_whatsapp_contact_last_interaction()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE whatsapp_contacts SET
    last_interaction_at = NOW(),
    metadata = jsonb_set(
      metadata,
      '{total_messages}',
      to_jsonb(COALESCE((metadata->>'total_messages')::int, 0) + 1)
    )
  WHERE id = (
    SELECT contact_id FROM whatsapp_conversations WHERE id = NEW.conversation_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_whatsapp_contact_on_message
  AFTER INSERT ON whatsapp_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_whatsapp_contact_last_interaction();

-- ============================================================================
-- ROW LEVEL SECURITY (Multi-tenant isolation)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE whatsapp_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_analytics_events ENABLE ROW LEVEL SECURITY;

-- Helper function: Get user's organization IDs
CREATE OR REPLACE FUNCTION user_whatsapp_organization_ids()
RETURNS SETOF UUID AS $$
  SELECT organization_id
  FROM whatsapp_team_members
  WHERE user_id = auth.uid() AND is_active = true;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Policies for organizations
CREATE POLICY "Users can view their whatsapp organizations"
  ON whatsapp_organizations FOR SELECT
  TO authenticated
  USING (id IN (SELECT user_whatsapp_organization_ids()));

CREATE POLICY "Admin users can update their whatsapp organizations"
  ON whatsapp_organizations FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT organization_id FROM whatsapp_team_members
      WHERE user_id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

-- Policies for team_members
CREATE POLICY "Users can view whatsapp team members in their organizations"
  ON whatsapp_team_members FOR SELECT
  TO authenticated
  USING (organization_id IN (SELECT user_whatsapp_organization_ids()));

-- Policies for contacts
CREATE POLICY "Users can view whatsapp contacts in their organizations"
  ON whatsapp_contacts FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT user_whatsapp_organization_ids()));

-- Policies for conversations
CREATE POLICY "Users can view whatsapp conversations in their organizations"
  ON whatsapp_conversations FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT user_whatsapp_organization_ids()));

-- Policies for messages
CREATE POLICY "Users can view whatsapp messages in their organizations"
  ON whatsapp_messages FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT user_whatsapp_organization_ids()));

-- Policies for templates
CREATE POLICY "Users can view whatsapp templates in their organizations"
  ON whatsapp_templates FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT user_whatsapp_organization_ids()));

-- Policies for campaigns
CREATE POLICY "Users can view whatsapp campaigns in their organizations"
  ON whatsapp_campaigns FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT user_whatsapp_organization_ids()));

-- Policies for workflows
CREATE POLICY "Users can view whatsapp workflows in their organizations"
  ON whatsapp_automation_workflows FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT user_whatsapp_organization_ids()));

-- Policies for analytics
CREATE POLICY "Users can view whatsapp analytics in their organizations"
  ON whatsapp_analytics_events FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT user_whatsapp_organization_ids()));

-- ============================================================================
-- SEED DATA (Demo organization)
-- ============================================================================

-- Insert demo organization
INSERT INTO whatsapp_organizations (
  id,
  name,
  slug,
  plan,
  features,
  branding
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Datacare Demo',
  'datacare-demo',
  'enterprise',
  '{
    "ai_chatbot": true,
    "workflows": true,
    "analytics": true,
    "campaigns": true,
    "api_access": true
  }'::jsonb,
  '{
    "logo_url": "https://datacare.co.ke/logo.png",
    "primary_color": "#3B82F6",
    "company_name": "Datacare Limited"
  }'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- VIEWS (Convenience queries)
-- ============================================================================

-- View: Conversation summary with contact info
CREATE OR REPLACE VIEW whatsapp_conversation_summary AS
SELECT
  c.id,
  c.organization_id,
  c.status,
  c.priority,
  c.category,
  c.sentiment,
  c.assigned_agent_id,
  tm.display_name as assigned_agent_name,
  ct.id as contact_id,
  ct.phone_number,
  ct.name as contact_name,
  c.total_messages_count,
  c.last_message_at,
  c.created_at,
  c.first_response_time_seconds,
  c.satisfaction_rating
FROM whatsapp_conversations c
JOIN whatsapp_contacts ct ON c.contact_id = ct.id
LEFT JOIN whatsapp_team_members tm ON c.assigned_agent_id = tm.id;

-- View: Active conversations per agent
CREATE OR REPLACE VIEW whatsapp_agent_workload AS
SELECT
  tm.id as team_member_id,
  tm.organization_id,
  tm.display_name,
  tm.status,
  COUNT(c.id) FILTER (WHERE c.status IN ('open', 'assigned', 'pending')) as active_conversations,
  tm.max_concurrent_conversations,
  COUNT(c.id) FILTER (WHERE c.status IN ('open', 'assigned', 'pending'))::float /
    NULLIF(tm.max_concurrent_conversations, 0) as capacity_utilization
FROM whatsapp_team_members tm
LEFT JOIN whatsapp_conversations c ON tm.id = c.assigned_agent_id
WHERE tm.is_active = true
GROUP BY tm.id, tm.organization_id, tm.display_name, tm.status, tm.max_concurrent_conversations;

COMMENT ON TABLE whatsapp_organizations IS 'Multi-tenant organizations (clients using the WhatsApp platform)';
COMMENT ON TABLE whatsapp_team_members IS 'Users/agents belonging to organizations';
COMMENT ON TABLE whatsapp_contacts IS 'Customer contacts per organization';
COMMENT ON TABLE whatsapp_conversations IS 'Chat sessions between contacts and agents';
COMMENT ON TABLE whatsapp_messages IS 'Individual messages within conversations';
COMMENT ON TABLE whatsapp_templates IS 'WhatsApp message templates approved by Meta';
COMMENT ON TABLE whatsapp_campaigns IS 'Bulk messaging campaigns';
COMMENT ON TABLE whatsapp_automation_workflows IS 'Automated workflow configurations';
COMMENT ON TABLE whatsapp_analytics_events IS 'Detailed event tracking for analytics';

-- Success message
SELECT 'WhatsApp Platform tables created successfully with whatsapp_ prefix! 🎉' AS message;
