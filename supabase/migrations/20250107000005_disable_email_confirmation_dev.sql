-- ============================================================================
-- Disable Email Confirmation for Development
-- ============================================================================
-- This migration disables email confirmation requirement for development
-- and confirms all existing users
-- ============================================================================

-- IMPORTANT: This is for DEVELOPMENT ONLY
-- In production, you should keep email confirmation enabled!

-- Step 1: Confirm all existing users
UPDATE auth.users
SET email_confirmed_at = NOW()
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

  -- Auto-confirm email for development
  IF NEW.email_confirmed_at IS NULL THEN
    UPDATE auth.users
    SET email_confirmed_at = NOW()
    WHERE id = NEW.id;
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

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check that all users are now confirmed
SELECT
  COUNT(*) FILTER (WHERE email_confirmed_at IS NOT NULL) AS confirmed_users,
  COUNT(*) FILTER (WHERE email_confirmed_at IS NULL) AS unconfirmed_users,
  COUNT(*) AS total_users
FROM auth.users;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

SELECT
  '✅ Email confirmation disabled for development!' AS status,
  'All existing users have been confirmed' AS info,
  'New users will be auto-confirmed on signup' AS behavior,
  '⚠️ Re-enable email confirmation in production!' AS warning;
