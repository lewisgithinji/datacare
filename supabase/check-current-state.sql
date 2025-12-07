-- Check current state of Supabase database
-- Run this first to see what tables already exist

-- List all tables in public schema
SELECT
  table_name,
  CASE
    WHEN table_name LIKE 'chatbot_%' THEN 'Chatbot System'
    WHEN table_name LIKE 'whatsapp_%' THEN 'WhatsApp System'
    WHEN table_name IN ('conversations', 'messages', 'contacts', 'organizations', 'team_members') THEN 'CONFLICT - No Prefix'
    ELSE 'Other'
  END as system_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check specifically for conflicting tables
SELECT
  CASE
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'conversations' AND table_schema = 'public')
    THEN 'EXISTS - CONFLICT!'
    ELSE 'Not found'
  END as conversations_table,

  CASE
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'messages' AND table_schema = 'public')
    THEN 'EXISTS - CONFLICT!'
    ELSE 'Not found'
  END as messages_table,

  CASE
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'whatsapp_conversations' AND table_schema = 'public')
    THEN 'EXISTS - Ready!'
    ELSE 'Not created yet'
  END as whatsapp_conversations_table,

  CASE
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'whatsapp_messages' AND table_schema = 'public')
    THEN 'EXISTS - Ready!'
    ELSE 'Not created yet'
  END as whatsapp_messages_table;

-- Check row counts
DO $$
BEGIN
  -- Try to count conversations
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'conversations') THEN
    RAISE NOTICE 'OLD conversations table has % rows', (SELECT COUNT(*) FROM conversations);
  END IF;

  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'whatsapp_conversations') THEN
    RAISE NOTICE 'NEW whatsapp_conversations table has % rows', (SELECT COUNT(*) FROM whatsapp_conversations);
  END IF;
END $$;
