-- 006_disable_email_dev.sql
-- Copied from original development convenience migration (archived at supabase/migrations-archive/old-migrations/20250107000005_disable_email_confirmation_dev.sql)

-- Disable email confirmation for development (CONFIRM EXISTING USERS)
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;

-- Auto-create team member trigger and auto-confirm behavior (DEV ONLY)
CREATE OR REPLACE FUNCTION auto_create_team_member()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  user_full_name TEXT;
BEGIN
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    split_part(NEW.email, '@', 1)
  );

  IF NEW.email_confirmed_at IS NULL THEN
    UPDATE auth.users
    SET email_confirmed_at = NOW()
    WHERE id = NEW.id;
  END IF;

  INSERT INTO public.whatsapp_team_members (
    organization_id,
    user_id,
    role,
    display_name,
    permissions,
    is_active,
    status
  ) VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    NEW.id,
    'agent',
    user_full_name,
    '["view_conversations", "send_messages", "view_contacts"]'::jsonb,
    true,
    'offline'
  ) ON CONFLICT (organization_id, user_id) DO NOTHING;

  RETURN NEW;
END;
$$;
