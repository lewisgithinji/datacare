-- Verification Query: Check if all WhatsApp Platform tables exist
-- Run this in Supabase SQL Editor to verify your setup

-- Check all tables exist
SELECT
  table_name,
  CASE
    WHEN table_name IN (
      'organizations',
      'team_members',
      'contacts',
      'conversations',
      'messages',
      'templates',
      'campaigns',
      'conversation_analytics_daily',
      'message_analytics_hourly'
    ) THEN '✅ EXISTS'
    ELSE '❌ MISSING'
  END as status
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'organizations',
    'team_members',
    'contacts',
    'conversations',
    'messages',
    'templates',
    'campaigns',
    'conversation_analytics_daily',
    'message_analytics_hourly'
  )
ORDER BY table_name;

-- Check RLS is enabled
SELECT
  tablename,
  rowsecurity as "RLS Enabled"
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'organizations',
    'team_members',
    'contacts',
    'conversations',
    'messages',
    'templates',
    'campaigns'
  )
ORDER BY tablename;

-- Check if demo organization exists
SELECT
  id,
  name,
  slug,
  plan,
  is_active
FROM organizations
WHERE slug = 'datacare-demo'
LIMIT 1;

-- Count existing records
SELECT
  (SELECT COUNT(*) FROM organizations) as organizations_count,
  (SELECT COUNT(*) FROM team_members) as team_members_count,
  (SELECT COUNT(*) FROM contacts) as contacts_count,
  (SELECT COUNT(*) FROM conversations) as conversations_count,
  (SELECT COUNT(*) FROM messages) as messages_count,
  (SELECT COUNT(*) FROM templates) as templates_count,
  (SELECT COUNT(*) FROM campaigns) as campaigns_count;
