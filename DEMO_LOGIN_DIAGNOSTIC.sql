-- ============================================================================
-- Demo Login Diagnostic Queries
-- ============================================================================
-- Run these queries in Supabase SQL Editor to diagnose demo login issues
-- ============================================================================

-- Query 1: Check if demo user exists
SELECT
  id,
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at,
  raw_user_meta_data
FROM auth.users
WHERE email = 'demo@datacare.co.ke';

-- Expected: Should return 1 row with confirmed email
-- If email_confirmed_at is NULL, email needs to be confirmed

-- ============================================================================

-- Query 2: Check if demo team member exists
SELECT
  tm.id,
  tm.user_id,
  tm.organization_id,
  tm.role,
  tm.is_active,
  tm.status,
  tm.display_name,
  u.email
FROM whatsapp_team_members tm
JOIN auth.users u ON u.id = tm.user_id
WHERE u.email = 'demo@datacare.co.ke';

-- Expected: Should return 1 row linking user to organization
-- If empty, team member record is missing (this causes login freeze)

-- ============================================================================

-- Query 3: Check if demo organization exists
SELECT
  id,
  name,
  slug,
  plan,
  features,
  is_active
FROM whatsapp_organizations
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Expected: Should return 1 row with name 'Datacare Demo'

-- ============================================================================

-- Query 4: Check demo data counts
SELECT
  'contacts' as table_name,
  COUNT(*) as count
FROM whatsapp_contacts
WHERE organization_id = '00000000-0000-0000-0000-000000000001'

UNION ALL

SELECT
  'conversations' as table_name,
  COUNT(*) as count
FROM whatsapp_conversations
WHERE organization_id = '00000000-0000-0000-0000-000000000001'

UNION ALL

SELECT
  'messages' as table_name,
  COUNT(*) as count
FROM whatsapp_messages
WHERE organization_id = '00000000-0000-0000-0000-000000000001'

UNION ALL

SELECT
  'templates' as table_name,
  COUNT(*) as count
FROM whatsapp_campaign_templates
WHERE organization_id = '00000000-0000-0000-0000-000000000001'

UNION ALL

SELECT
  'campaigns' as table_name,
  COUNT(*) as count
FROM whatsapp_campaigns
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Expected:
-- contacts: 10
-- conversations: 5
-- messages: 8
-- templates: 8
-- campaigns: 3

-- ============================================================================
-- FIX: If Query 2 returns empty (no team member)
-- ============================================================================

-- This is the most common cause of login freeze
-- Run this to create the team member record:

INSERT INTO whatsapp_team_members (
  id,
  organization_id,
  user_id,
  role,
  is_active,
  status,
  display_name,
  max_concurrent_conversations,
  skills
) VALUES (
  '00000000-0000-0000-0000-000000000002'::uuid,
  '00000000-0000-0000-0000-000000000001'::uuid,
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke'),
  'admin',
  true,
  'online',
  'Demo Admin',
  10,
  ARRAY['sales', 'support', 'technical']
)
ON CONFLICT (organization_id, user_id) DO NOTHING;

-- ============================================================================
-- FIX: If Query 1 shows email_confirmed_at is NULL
-- ============================================================================

-- Run this to confirm the email:
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'demo@datacare.co.ke'
  AND email_confirmed_at IS NULL;

-- ============================================================================
-- COMPLETE FIX: Run all data seeding
-- ============================================================================

-- If you want to seed all demo data (contacts, conversations, templates, etc.),
-- run the entire contents of this file:
-- F:\Projects\datacare\supabase\migrations\005_demo_user_and_sample_data_v2.sql

-- ============================================================================
-- Verification Query (Run after fixes)
-- ============================================================================

SELECT
  u.email as user_email,
  u.email_confirmed_at is not null as email_confirmed,
  tm.id is not null as has_team_member,
  tm.role,
  tm.is_active,
  o.name as organization_name,
  o.id as organization_id,
  (SELECT COUNT(*) FROM whatsapp_contacts WHERE organization_id = o.id) as contact_count,
  (SELECT COUNT(*) FROM whatsapp_conversations WHERE organization_id = o.id) as conversation_count,
  (SELECT COUNT(*) FROM whatsapp_campaign_templates WHERE organization_id = o.id) as template_count
FROM auth.users u
LEFT JOIN whatsapp_team_members tm ON tm.user_id = u.id
LEFT JOIN whatsapp_organizations o ON o.id = tm.organization_id
WHERE u.email = 'demo@datacare.co.ke';

-- Expected output:
-- user_email: demo@datacare.co.ke
-- email_confirmed: true
-- has_team_member: true
-- role: admin
-- is_active: true
-- organization_name: Datacare Demo
-- organization_id: 00000000-0000-0000-0000-000000000001
-- contact_count: 10
-- conversation_count: 5
-- template_count: 8

-- If any of these are wrong, that's your issue!
