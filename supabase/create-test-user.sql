-- ============================================================================
-- Create Test User for WhatsApp Platform Development
-- ============================================================================
-- This script creates a test user and links them to the demo organization
-- ============================================================================

-- INSTRUCTIONS:
-- 1. Run this in Supabase SQL Editor
-- 2. After running, you can login with: demo@datacare.co.ke / DatacareDemo2025!
-- 3. The user will have admin access to the demo organization

-- ============================================================================
-- Option 1: Create user via Supabase Auth (Recommended)
-- ============================================================================
-- NOTE: You'll need to create the user through Supabase Dashboard or API first
-- Dashboard Path: Authentication > Users > Add User
-- Email: demo@datacare.co.ke
-- Password: DatacareDemo2025!
-- After creating, get the user ID and use it below

-- ============================================================================
-- Option 2: Link existing authenticated user to organization
-- ============================================================================
-- If you already have a user logged in, run this to link them:

-- Get current authenticated user ID (run while logged in)
-- SELECT auth.uid() as my_user_id, auth.email() as my_email;

-- Then use that ID below to create team member
-- Replace 'YOUR-USER-ID-HERE' with the actual UUID

-- Example team member insert (uncomment and modify):
/*
INSERT INTO whatsapp_team_members (
  id,
  organization_id,
  user_id,
  role,
  permissions,
  is_active,
  status,
  max_concurrent_conversations,
  skills,
  display_name
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,  -- Demo organization
  'YOUR-USER-ID-HERE'::uuid,                       -- Replace with your user ID
  'admin',
  '["manage_users", "manage_conversations", "manage_settings", "view_analytics"]'::jsonb,
  true,
  'online',
  10,
  ARRAY['sales', 'support', 'technical'],
  'Demo Admin'
) ON CONFLICT (organization_id, user_id) DO UPDATE SET
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();
*/

-- ============================================================================
-- Verify Setup
-- ============================================================================

-- Check if team members exist for demo org
SELECT
  tm.id,
  tm.display_name,
  tm.role,
  tm.status,
  u.email,
  o.name as organization
FROM whatsapp_team_members tm
JOIN auth.users u ON tm.user_id = u.id
JOIN whatsapp_organizations o ON tm.organization_id = o.id
WHERE tm.organization_id = '00000000-0000-0000-0000-000000000001'::uuid;

-- ============================================================================
-- Quick Test: Verify RLS Policies Work
-- ============================================================================

-- This should return results if you're authenticated and linked to the org
SELECT
  c.id,
  c.status,
  ct.name as contact_name,
  ct.phone_number,
  c.total_messages_count,
  c.last_message_at
FROM whatsapp_conversations c
JOIN whatsapp_contacts ct ON c.contact_id = ct.id
WHERE c.organization_id = '00000000-0000-0000-0000-000000000001'::uuid
ORDER BY c.last_message_at DESC;

-- ============================================================================
-- MANUAL STEPS REQUIRED
-- ============================================================================

SELECT '📝 MANUAL STEPS REQUIRED:' as notice;
SELECT '1. Go to Supabase Dashboard > Authentication > Users' as step_1;
SELECT '2. Click "Add User" and create user with email: demo@datacare.co.ke' as step_2;
SELECT '3. Set password: DatacareDemo2025!' as step_3;
SELECT '4. Copy the user ID (UUID) from the created user' as step_4;
SELECT '5. Uncomment the INSERT statement above and replace YOUR-USER-ID-HERE' as step_5;
SELECT '6. Run the modified INSERT statement' as step_6;
SELECT '7. You can now login to the dashboard!' as step_7;
