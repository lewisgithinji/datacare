-- 005_settings_configuration.sql
-- Copied from original settings migration (archived at supabase/migrations-archive/old-migrations/20250107000007_settings_tables.sql)

-- User preferences
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT false,
  notify_new_message BOOLEAN DEFAULT true,
  notify_new_conversation BOOLEAN DEFAULT true,
  notify_assignment BOOLEAN DEFAULT true,
  notify_mention BOOLEAN DEFAULT true,
  notify_campaign_complete BOOLEAN DEFAULT true,
  daily_digest BOOLEAN DEFAULT false,
  weekly_digest BOOLEAN DEFAULT true,
  digest_time VARCHAR(5) DEFAULT '09:00',
  theme VARCHAR(20) DEFAULT 'system',
  language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(100) DEFAULT 'UTC',
  compact_mode BOOLEAN DEFAULT false,
  show_avatars BOOLEAN DEFAULT true,
  sound_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);
