-- ============================================================================
-- Auto-Link New Users to Demo Organization
-- ============================================================================
-- This trigger automatically creates a whatsapp_team_members entry when a new
-- user signs up, linking them to the demo organization.
-- ============================================================================

-- Function to auto-create team_member when user signs up
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

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger that fires when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auto_create_team_member();

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Test the trigger (won't actually create a user, just shows it exists)
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- ============================================================================
-- IMPORTANT NOTES
-- ============================================================================

-- 1. This trigger assigns ALL new users to the demo organization
-- 2. For multi-tenant setup, you'll need to modify this to:
--    - Use invitation codes
--    - Check domain-based routing
--    - Use a signup flow that selects organization
--
-- 3. The trigger runs with SECURITY DEFINER, meaning it bypasses RLS
--    This is necessary to create team_member records
--
-- 4. Default permissions are read-only (agent role)
--    Admins can upgrade users to supervisor or admin later
--
-- 5. To remove the trigger (for multi-tenant):
--    DROP TRIGGER on_auth_user_created ON auth.users;
--    DROP FUNCTION auto_create_team_member();

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

SELECT
  '✅ Auto-link trigger created successfully!' AS status,
  'New users will automatically be added to the demo organization' AS info,
  '⚠️ Remember to modify this for multi-tenant setup' AS warning;
