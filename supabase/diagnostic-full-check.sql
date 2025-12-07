-- COMPREHENSIVE DATABASE DIAGNOSTIC
-- Run this to see EXACTLY what's in your database right now

-- ============================================================================
-- PART 1: List ALL tables
-- ============================================================================
SELECT
  table_name,
  CASE
    WHEN table_name LIKE 'chatbot_%' THEN '🤖 Chatbot'
    WHEN table_name LIKE 'whatsapp_%' THEN '📱 WhatsApp'
    WHEN table_name IN ('organizations', 'team_members', 'contacts', 'conversations', 'messages', 'templates', 'campaigns')
      THEN '⚠️ CONFLICT - No Prefix'
    ELSE '❓ Other'
  END as system_type,
  (SELECT COUNT(*) FROM information_schema.columns WHERE columns.table_name = tables.table_name) as column_count
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY
  CASE
    WHEN table_name LIKE 'chatbot_%' THEN 1
    WHEN table_name LIKE 'whatsapp_%' THEN 2
    ELSE 3
  END,
  table_name;

-- ============================================================================
-- PART 2: Check specific conflict tables
-- ============================================================================
SELECT
  'Current Status' as check_type,
  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'conversations')
    THEN '❌ EXISTS (CONFLICT)' ELSE '✅ Not found' END as conversations_old,

  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'chatbot_conversations')
    THEN '✅ EXISTS' ELSE '❌ Not found' END as chatbot_conversations,

  CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'whatsapp_conversations')
    THEN '✅ EXISTS' ELSE '❌ Not found' END as whatsapp_conversations;

-- ============================================================================
-- PART 3: Row counts for all tables
-- ============================================================================
DO $$
DECLARE
  r RECORD;
  row_count INT;
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'TABLE ROW COUNTS:';
  RAISE NOTICE '============================================';

  FOR r IN
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    ORDER BY table_name
  LOOP
    EXECUTE format('SELECT COUNT(*) FROM %I', r.table_name) INTO row_count;
    RAISE NOTICE '% rows in: %', LPAD(row_count::TEXT, 6), r.table_name;
  END LOOP;

  RAISE NOTICE '============================================';
END $$;

-- ============================================================================
-- PART 4: Check for data we need to preserve
-- ============================================================================
SELECT
  'Data Check' as info,
  (SELECT COUNT(*) FROM chatbot_conversations WHERE TRUE) as chatbot_conversations_count,
  (SELECT COUNT(*) FROM chatbot_messages WHERE TRUE) as chatbot_messages_count,
  (SELECT COUNT(*) FROM chatbot_recommendations WHERE TRUE) as chatbot_recommendations_count,
  (SELECT COUNT(*) FROM chatbot_analytics WHERE TRUE) as chatbot_analytics_count;

-- ============================================================================
-- PART 5: Summary
-- ============================================================================
SELECT
  '📊 SUMMARY' as report,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') as total_tables,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'chatbot_%') as chatbot_tables,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'whatsapp_%') as whatsapp_tables,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('conversations', 'messages', 'contacts', 'organizations')) as conflict_tables;
