-- ============================================================================
-- FIX: Dashboard Loading and Email Confirmation Issues
-- ============================================================================
-- Run this in your Supabase SQL Editor
-- ============================================================================

-- Step 1: Confirm all existing users
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email_confirmed_at IS NULL;

-- Step 2: Update the trigger to auto-confirm new users
CREATE OR REPLACE FUNCTION auto_create_team_member()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  user_full_name TEXT;
BEGIN
  -- Get the full name from user metadata
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    split_part(NEW.email, '@', 1)
  );

  -- Auto-confirm email for development (DO THIS BEFORE INSERT)
  IF NEW.email_confirmed_at IS NULL THEN
    NEW.email_confirmed_at := NOW();
  END IF;

  -- Create team_member entry linked to demo organization
  INSERT INTO public.whatsapp_team_members (
    organization_id,
    user_id,
    role,
    display_name,
    permissions,
    is_active,
    status
  ) VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid, -- Demo organization ID
    NEW.id,
    'agent', -- Default role for new users
    user_full_name,
    '["view_conversations", "send_messages", "view_contacts"]'::jsonb,
    true,
    'offline'
  )
  ON CONFLICT (organization_id, user_id) DO NOTHING; -- Prevent duplicates

  RETURN NEW;
END;
$$;

-- Step 3: Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_team_member();

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check confirmed users
SELECT
  COUNT(*) FILTER (WHERE email_confirmed_at IS NOT NULL) AS confirmed_users,
  COUNT(*) FILTER (WHERE email_confirmed_at IS NULL) AS unconfirmed_users
FROM auth.users;

-- Check trigger exists
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_timing
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- ============================================================================
-- SUCCESS
-- ============================================================================

SELECT '✅ Auth issues fixed! Users can now login without email confirmation.' AS status;
