-- DataCare WhatsApp Platform - Multi-Tenant Database Schema
-- Migration: Initial Schema Setup
-- Created: 2025-01-07

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ORGANIZATIONS (Multi-tenant support)
-- ============================================================================
CREATE TABLE organizations (
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
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_active ON organizations(is_active) WHERE is_active = true;

-- ============================================================================
-- TEAM MEMBERS (Agents/Users)
-- ============================================================================
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
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
CREATE INDEX idx_team_members_org ON team_members(organization_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);
CREATE INDEX idx_team_members_status ON team_members(organization_id, status) WHERE is_active = true;

-- ============================================================================
-- CONTACTS (Customers)
-- ============================================================================
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

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
CREATE INDEX idx_contacts_org_phone ON contacts(organization_id, phone_number);
CREATE INDEX idx_contacts_org_tags ON contacts USING GIN(tags);
CREATE INDEX idx_contacts_org_segment ON contacts(organization_id, segment);
CREATE INDEX idx_contacts_last_interaction ON contacts(organization_id, last_interaction_at DESC);

-- ============================================================================
-- CONVERSATIONS (Chat sessions)
-- ============================================================================
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,

  -- Assignment
  assigned_agent_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
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
CREATE INDEX idx_conversations_org ON conversations(organization_id);
CREATE INDEX idx_conversations_contact ON conversations(contact_id);
CREATE INDEX idx_conversations_assigned_agent ON conversations(assigned_agent_id) WHERE assigned_agent_id IS NOT NULL;
CREATE INDEX idx_conversations_status ON conversations(organization_id, status);
CREATE INDEX idx_conversations_last_message ON conversations(organization_id, last_message_at DESC);
CREATE INDEX idx_conversations_tags ON conversations USING GIN(tags);

-- ============================================================================
-- MESSAGES (All messages)
-- ============================================================================
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,

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
CREATE INDEX idx_messages_org ON messages(organization_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_messages_whatsapp_id ON messages(whatsapp_message_id) WHERE whatsapp_message_id IS NOT NULL;
CREATE INDEX idx_messages_org_created ON messages(organization_id, created_at DESC);
CREATE INDEX idx_messages_sender ON messages(sender_id) WHERE sender_id IS NOT NULL;

-- ============================================================================
-- TEMPLATES (WhatsApp message templates)
-- ============================================================================
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

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
CREATE INDEX idx_templates_org ON templates(organization_id);
CREATE INDEX idx_templates_status ON templates(organization_id, status);

-- ============================================================================
-- CAMPAIGNS (Bulk messaging)
-- ============================================================================
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- Campaign details
  name TEXT NOT NULL,
  description TEXT,
  template_id UUID REFERENCES templates(id) ON DELETE SET NULL,

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

  created_by UUID REFERENCES team_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_campaigns_org ON campaigns(organization_id);
CREATE INDEX idx_campaigns_status ON campaigns(organization_id, status);
CREATE INDEX idx_campaigns_scheduled ON campaigns(scheduled_at) WHERE status = 'scheduled';

-- ============================================================================
-- AUTOMATION WORKFLOWS
-- ============================================================================
CREATE TABLE automation_workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

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

  created_by UUID REFERENCES team_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workflows_org ON automation_workflows(organization_id);
CREATE INDEX idx_workflows_active ON automation_workflows(organization_id, is_active) WHERE is_active = true;

-- ============================================================================
-- ANALYTICS EVENTS (Detailed tracking)
-- ============================================================================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- Event details
  event_type TEXT NOT NULL,
  event_category TEXT, -- 'message', 'conversation', 'campaign', 'user'
  event_data JSONB NOT NULL,

  -- Context
  user_id UUID,
  team_member_id UUID REFERENCES team_members(id),
  conversation_id UUID REFERENCES conversations(id),
  campaign_id UUID REFERENCES campaigns(id),

  -- Timestamp (partitioned for performance)
  created_at TIMESTAMPTZ DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Create partitions for analytics (monthly)
CREATE TABLE analytics_events_2025_01 PARTITION OF analytics_events
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE analytics_events_2025_02 PARTITION OF analytics_events
  FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');

-- Indexes
CREATE INDEX idx_analytics_org_type ON analytics_events(organization_id, event_type, created_at DESC);
CREATE INDEX idx_analytics_conversation ON analytics_events(conversation_id) WHERE conversation_id IS NOT NULL;

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON automation_workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function: Update conversation metrics on new message
CREATE OR REPLACE FUNCTION update_conversation_on_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations SET
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

CREATE TRIGGER trigger_update_conversation_on_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_on_message();

-- Function: Update contact last interaction
CREATE OR REPLACE FUNCTION update_contact_last_interaction()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE contacts SET
    last_interaction_at = NOW(),
    metadata = jsonb_set(
      metadata,
      '{total_messages}',
      to_jsonb(COALESCE((metadata->>'total_messages')::int, 0) + 1)
    )
  WHERE id = (
    SELECT contact_id FROM conversations WHERE id = NEW.conversation_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_contact_on_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_last_interaction();

-- ============================================================================
-- ROW LEVEL SECURITY (Multi-tenant isolation)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Helper function: Get user's organization IDs
CREATE OR REPLACE FUNCTION auth.user_organization_ids()
RETURNS SETOF UUID AS $$
  SELECT organization_id
  FROM team_members
  WHERE user_id = auth.uid() AND is_active = true;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Policies for organizations
CREATE POLICY "Users can view their organizations"
  ON organizations FOR SELECT
  TO authenticated
  USING (id IN (SELECT auth.user_organization_ids()));

CREATE POLICY "Admin users can update their organizations"
  ON organizations FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT organization_id FROM team_members
      WHERE user_id = auth.uid() AND role = 'admin' AND is_active = true
    )
  );

-- Policies for team_members
CREATE POLICY "Users can view team members in their organizations"
  ON team_members FOR SELECT
  TO authenticated
  USING (organization_id IN (SELECT auth.user_organization_ids()));

-- Policies for contacts
CREATE POLICY "Users can view contacts in their organizations"
  ON contacts FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT auth.user_organization_ids()));

-- Policies for conversations
CREATE POLICY "Users can view conversations in their organizations"
  ON conversations FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT auth.user_organization_ids()));

-- Policies for messages
CREATE POLICY "Users can view messages in their organizations"
  ON messages FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT auth.user_organization_ids()));

-- Policies for templates
CREATE POLICY "Users can view templates in their organizations"
  ON templates FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT auth.user_organization_ids()));

-- Policies for campaigns
CREATE POLICY "Users can view campaigns in their organizations"
  ON campaigns FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT auth.user_organization_ids()));

-- Policies for workflows
CREATE POLICY "Users can view workflows in their organizations"
  ON automation_workflows FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT auth.user_organization_ids()));

-- Policies for analytics
CREATE POLICY "Users can view analytics in their organizations"
  ON analytics_events FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT auth.user_organization_ids()));

-- ============================================================================
-- SEED DATA (Demo organization)
-- ============================================================================

-- Insert demo organization
INSERT INTO organizations (
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
CREATE OR REPLACE VIEW conversation_summary AS
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
FROM conversations c
JOIN contacts ct ON c.contact_id = ct.id
LEFT JOIN team_members tm ON c.assigned_agent_id = tm.id;

-- View: Active conversations per agent
CREATE OR REPLACE VIEW agent_workload AS
SELECT
  tm.id as team_member_id,
  tm.organization_id,
  tm.display_name,
  tm.status,
  COUNT(c.id) FILTER (WHERE c.status IN ('open', 'assigned', 'pending')) as active_conversations,
  tm.max_concurrent_conversations,
  COUNT(c.id) FILTER (WHERE c.status IN ('open', 'assigned', 'pending'))::float /
    NULLIF(tm.max_concurrent_conversations, 0) as capacity_utilization
FROM team_members tm
LEFT JOIN conversations c ON tm.id = c.assigned_agent_id
WHERE tm.is_active = true
GROUP BY tm.id, tm.organization_id, tm.display_name, tm.status, tm.max_concurrent_conversations;

COMMENT ON TABLE organizations IS 'Multi-tenant organizations (clients using the platform)';
COMMENT ON TABLE team_members IS 'Users/agents belonging to organizations';
COMMENT ON TABLE contacts IS 'Customer contacts per organization';
COMMENT ON TABLE conversations IS 'Chat sessions between contacts and agents';
COMMENT ON TABLE messages IS 'Individual messages within conversations';
COMMENT ON TABLE templates IS 'WhatsApp message templates approved by Meta';
COMMENT ON TABLE campaigns IS 'Bulk messaging campaigns';
COMMENT ON TABLE automation_workflows IS 'Automated workflow configurations';
COMMENT ON TABLE analytics_events IS 'Detailed event tracking for analytics';
