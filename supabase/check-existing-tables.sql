-- Check what tables currently exist in your Supabase database
-- Run this in SQL Editor to see all existing tables

SELECT
  table_schema,
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
ORDER BY table_schema, table_name;

-- Check if WhatsApp tables exist
SELECT
  CASE
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'conversations')
    THEN 'EXISTS'
    ELSE 'MISSING'
  END as conversations_table,
  CASE
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'messages')
    THEN 'EXISTS'
    ELSE 'MISSING'
  END as messages_table,
  CASE
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'contacts')
    THEN 'EXISTS'
    ELSE 'MISSING'
  END as contacts_table,
  CASE
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'organizations')
    THEN 'EXISTS'
    ELSE 'MISSING'
  END as organizations_table;

-- If conversations table exists, check its structure
SELECT
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'conversations'
ORDER BY ordinal_position;

-- Check row counts
SELECT
  (SELECT COUNT(*) FROM organizations) as organizations_count,
  (SELECT COUNT(*) FROM contacts) as contacts_count,
  (SELECT COUNT(*) FROM conversations) as conversations_count,
  (SELECT COUNT(*) FROM messages) as messages_count;
