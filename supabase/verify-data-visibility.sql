-- ============================================================================
-- Data Visibility Verification Script
-- ============================================================================
-- Run this to check if your WhatsApp platform data is accessible
-- ============================================================================

-- 1. Check if tables exist
SELECT
  'whatsapp_organizations' as table_name,
  EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'whatsapp_organizations'
  ) as exists
UNION ALL
SELECT
  'whatsapp_contacts' as table_name,
  EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'whatsapp_contacts'
  ) as exists
UNION ALL
SELECT
  'whatsapp_conversations' as table_name,
  EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'whatsapp_conversations'
  ) as exists
UNION ALL
SELECT
  'whatsapp_messages' as table_name,
  EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'whatsapp_messages'
  ) as exists;

-- 2. Check Row Level Security status
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename LIKE 'whatsapp%'
ORDER BY tablename;

-- 3. List all RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd as command,
  CASE
    WHEN qual::text LIKE '%anon%' THEN 'Public Access'
    WHEN qual::text LIKE '%authenticated%' THEN 'Auth Required'
    ELSE 'Restricted'
  END as access_level
FROM pg_policies
WHERE tablename LIKE 'whatsapp%'
ORDER BY tablename, policyname;

-- 4. Count records in each table
SELECT
  'whatsapp_organizations' as table_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE id = '00000000-0000-0000-0000-000000000001') as demo_org_records
FROM whatsapp_organizations

UNION ALL

SELECT
  'whatsapp_contacts' as table_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE organization_id = '00000000-0000-0000-0000-000000000001') as demo_org_records
FROM whatsapp_contacts

UNION ALL

SELECT
  'whatsapp_conversations' as table_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE organization_id = '00000000-0000-0000-0000-000000000001') as demo_org_records
FROM whatsapp_conversations

UNION ALL

SELECT
  'whatsapp_messages' as table_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE organization_id = '00000000-0000-0000-0000-000000000001') as demo_org_records
FROM whatsapp_messages

UNION ALL

SELECT
  'whatsapp_team_members' as table_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE organization_id = '00000000-0000-0000-0000-000000000001') as demo_org_records
FROM whatsapp_team_members;

-- 5. Check demo organization details
SELECT
  id,
  name,
  slug,
  plan,
  is_active,
  created_at
FROM whatsapp_organizations
WHERE id = '00000000-0000-0000-0000-000000000001';

-- 6. List all contacts with their conversation counts
SELECT
  c.id,
  c.name,
  c.phone_number,
  c.segment,
  c.tags,
  (SELECT COUNT(*) FROM whatsapp_conversations WHERE contact_id = c.id) as conversation_count
FROM whatsapp_contacts c
WHERE c.organization_id = '00000000-0000-0000-0000-000000000001'
ORDER BY c.created_at;

-- 7. List all conversations with details
SELECT
  conv.id,
  conv.status,
  conv.priority,
  conv.category,
  conv.sentiment,
  conv.total_messages_count,
  cont.name as contact_name,
  cont.phone_number,
  conv.last_message_at,
  conv.created_at
FROM whatsapp_conversations conv
JOIN whatsapp_contacts cont ON conv.contact_id = cont.id
WHERE conv.organization_id = '00000000-0000-0000-0000-000000000001'
ORDER BY conv.last_message_at DESC NULLS LAST;

-- 8. Sample messages from each conversation
SELECT
  m.id,
  m.conversation_id,
  m.direction,
  m.sender_type,
  m.message_type,
  LEFT(m.content, 50) as content_preview,
  m.status,
  m.created_at
FROM whatsapp_messages m
WHERE m.organization_id = '00000000-0000-0000-0000-000000000001'
ORDER BY m.created_at DESC
LIMIT 20;

-- 9. Check if authenticated users are linked to organization
SELECT
  tm.id,
  tm.display_name,
  tm.role,
  tm.status,
  tm.is_active,
  u.email,
  o.name as organization
FROM whatsapp_team_members tm
LEFT JOIN auth.users u ON tm.user_id = u.id
JOIN whatsapp_organizations o ON tm.organization_id = o.id
WHERE tm.organization_id = '00000000-0000-0000-0000-000000000001';

-- 10. Test query that mimics frontend request
-- This is what the Inbox component runs
SELECT
  c.*,
  (
    SELECT row_to_json(contact_row)
    FROM (
      SELECT * FROM whatsapp_contacts WHERE id = c.contact_id
    ) contact_row
  ) as contact,
  (
    SELECT row_to_json(agent_row)
    FROM (
      SELECT * FROM whatsapp_team_members WHERE id = c.assigned_agent_id
    ) agent_row
  ) as assigned_agent
FROM whatsapp_conversations c
WHERE c.organization_id = '00000000-0000-0000-0000-000000000001'
ORDER BY c.last_message_at DESC NULLS LAST, c.created_at DESC
LIMIT 10;

-- ============================================================================
-- EXPECTED RESULTS
-- ============================================================================
-- If everything is set up correctly, you should see:
--
-- Table exists check: All 4 tables should show 'true'
-- RLS status: All tables should show rls_enabled = true
-- Record counts:
--   - whatsapp_organizations: 1 total, 1 demo_org
--   - whatsapp_contacts: 4 total, 4 demo_org
--   - whatsapp_conversations: 4 total, 4 demo_org
--   - whatsapp_messages: 17 total, 17 demo_org
--   - whatsapp_team_members: 0 or more (depends if you created test user)
--
-- Contacts: John Kamau, Grace Wanjiru, David Omondi, Sarah Akinyi
-- Conversations: 4 conversations with various statuses
-- Messages: Sample messages from all conversations
-- ============================================================================

-- Final summary
SELECT
  'Verification Complete!' as status,
  (SELECT COUNT(*) FROM whatsapp_organizations WHERE id = '00000000-0000-0000-0000-000000000001') = 1 as has_org,
  (SELECT COUNT(*) FROM whatsapp_contacts WHERE organization_id = '00000000-0000-0000-0000-000000000001') = 4 as has_contacts,
  (SELECT COUNT(*) FROM whatsapp_conversations WHERE organization_id = '00000000-0000-0000-0000-000000000001') = 4 as has_conversations,
  (SELECT COUNT(*) FROM whatsapp_messages WHERE organization_id = '00000000-0000-0000-0000-000000000001') = 17 as has_messages,
  (SELECT COUNT(*) FROM whatsapp_team_members WHERE organization_id = '00000000-0000-0000-0000-000000000001') > 0 as has_team_members,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename LIKE 'whatsapp%' AND policyname LIKE 'dev_public%') > 0 as has_public_policies;
