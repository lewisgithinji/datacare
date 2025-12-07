-- Rename all WhatsApp platform tables to use whatsapp_ prefix
-- This provides clear differentiation from chatbot_ tables

-- Drop existing tables if they exist (from old migration)
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS templates CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS automation_workflows CASCADE;
DROP TABLE IF EXISTS analytics_events CASCADE;
DROP TABLE IF EXISTS analytics_events_2025_01 CASCADE;
DROP TABLE IF EXISTS analytics_events_2025_02 CASCADE;
DROP TABLE IF EXISTS conversation_analytics_daily CASCADE;
DROP TABLE IF EXISTS message_analytics_hourly CASCADE;

-- Drop functions and triggers
DROP FUNCTION IF EXISTS update_conversation_on_message() CASCADE;
DROP FUNCTION IF EXISTS update_conversation_metrics() CASCADE;
DROP FUNCTION IF EXISTS auth.user_organization_ids() CASCADE;

-- Success message
SELECT 'Old tables dropped. Now run: 20250107000001_create_whatsapp_platform_schema.sql with find/replace for whatsapp_ prefix' AS message;
