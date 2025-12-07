-- ============================================================================
-- DEVELOPMENT ONLY: Enable Public Access to WhatsApp Platform
-- ============================================================================
-- WARNING: This is for development/testing purposes only!
-- Remove these policies in production and use proper authentication.
-- ============================================================================

-- Drop existing restrictive policies (if needed for testing)
-- DROP POLICY IF EXISTS "Users can view their whatsapp organizations" ON whatsapp_organizations;
-- DROP POLICY IF EXISTS "Users can view whatsapp team members in their organizations" ON whatsapp_team_members;
-- DROP POLICY IF EXISTS "Users can view whatsapp contacts in their organizations" ON whatsapp_contacts;
-- DROP POLICY IF EXISTS "Users can view whatsapp conversations in their organizations" ON whatsapp_conversations;
-- DROP POLICY IF EXISTS "Users can view whatsapp messages in their organizations" ON whatsapp_messages;
-- DROP POLICY IF EXISTS "Users can view whatsapp templates in their organizations" ON whatsapp_templates;
-- DROP POLICY IF EXISTS "Users can view whatsapp campaigns in their organizations" ON whatsapp_campaigns;
-- DROP POLICY IF EXISTS "Users can view whatsapp workflows in their organizations" ON whatsapp_automation_workflows;
-- DROP POLICY IF EXISTS "Users can view whatsapp analytics in their organizations" ON whatsapp_analytics_events;

-- ============================================================================
-- PUBLIC ACCESS POLICIES (DEVELOPMENT ONLY)
-- ============================================================================

-- Organizations - Public read for demo org
CREATE POLICY "dev_public_read_organizations"
  ON whatsapp_organizations FOR SELECT
  TO anon, authenticated
  USING (id = '00000000-0000-0000-0000-000000000001'::uuid);

-- Team Members - Public read for demo org
CREATE POLICY "dev_public_read_team_members"
  ON whatsapp_team_members FOR SELECT
  TO anon, authenticated
  USING (organization_id = '00000000-0000-0000-0000-000000000001'::uuid);

-- Contacts - Public access for demo org
CREATE POLICY "dev_public_access_contacts"
  ON whatsapp_contacts FOR ALL
  TO anon, authenticated
  USING (organization_id = '00000000-0000-0000-0000-000000000001'::uuid);

-- Conversations - Public access for demo org
CREATE POLICY "dev_public_access_conversations"
  ON whatsapp_conversations FOR ALL
  TO anon, authenticated
  USING (organization_id = '00000000-0000-0000-0000-000000000001'::uuid);

-- Messages - Public access for demo org
CREATE POLICY "dev_public_access_messages"
  ON whatsapp_messages FOR ALL
  TO anon, authenticated
  USING (organization_id = '00000000-0000-0000-0000-000000000001'::uuid);

-- Templates - Public access for demo org
CREATE POLICY "dev_public_access_templates"
  ON whatsapp_templates FOR ALL
  TO anon, authenticated
  USING (organization_id = '00000000-0000-0000-0000-000000000001'::uuid);

-- Campaigns - Public access for demo org
CREATE POLICY "dev_public_access_campaigns"
  ON whatsapp_campaigns FOR ALL
  TO anon, authenticated
  USING (organization_id = '00000000-0000-0000-0000-000000000001'::uuid);

-- Automation Workflows - Public access for demo org
CREATE POLICY "dev_public_access_workflows"
  ON whatsapp_automation_workflows FOR ALL
  TO anon, authenticated
  USING (organization_id = '00000000-0000-0000-0000-000000000001'::uuid);

-- Analytics Events - Public access for demo org
CREATE POLICY "dev_public_access_analytics"
  ON whatsapp_analytics_events FOR ALL
  TO anon, authenticated
  USING (organization_id = '00000000-0000-0000-0000-000000000001'::uuid);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check if policies are active
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename LIKE 'whatsapp%'
ORDER BY tablename, policyname;

-- Test data visibility
SELECT
  'Organizations' as table_name,
  COUNT(*) as record_count
FROM whatsapp_organizations
WHERE id = '00000000-0000-0000-0000-000000000001'::uuid

UNION ALL

SELECT
  'Contacts' as table_name,
  COUNT(*) as record_count
FROM whatsapp_contacts
WHERE organization_id = '00000000-0000-0000-0000-000000000001'::uuid

UNION ALL

SELECT
  'Conversations' as table_name,
  COUNT(*) as record_count
FROM whatsapp_conversations
WHERE organization_id = '00000000-0000-0000-0000-000000000001'::uuid

UNION ALL

SELECT
  'Messages' as table_name,
  COUNT(*) as record_count
FROM whatsapp_messages
WHERE organization_id = '00000000-0000-0000-0000-000000000001'::uuid;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
SELECT '✅ Public access policies enabled for demo organization!' AS status,
       'WARNING: Remove these policies before deploying to production!' AS warning;
