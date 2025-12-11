-- ============================================================================
-- Demo User and Sample Data
-- ============================================================================
-- This migration creates a demo user account and populates the database
-- with realistic sample data for demonstration purposes.
-- ============================================================================

-- Note: Creating auth.users requires either:
-- 1. Running this via Supabase service role (admin API), OR
-- 2. Creating user manually in Supabase Dashboard, then running the rest

-- ============================================================================
-- STEP 1: Create Demo User (Manual Step Required)
-- ============================================================================
-- ⚠️ IMPORTANT: This must be done via Supabase Dashboard or Admin API
--
-- Instructions:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Click "Add User"
-- 3. Email: demo@datacare.co.ke
-- 4. Password: Demo2025!Preview
-- 5. Email Confirmed: ✅ (check the box)
-- 6. User Metadata (optional): {"full_name": "Demo Admin", "is_demo": true}
-- 7. Click "Create User"
-- 8. Copy the User ID (UUID) generated
-- 9. Replace the UUID below with the actual user ID
--
-- Alternatively, run this via Admin API:
-- const { data } = await supabaseAdmin.auth.admin.createUser({
--   email: 'demo@datacare.co.ke',
--   password: 'Demo2025!Preview',
--   email_confirm: true,
--   user_metadata: { full_name: 'Demo Admin', is_demo: true }
-- })

-- ============================================================================
-- STEP 2: Create Demo Team Member
-- ============================================================================

-- Link demo user to demo organization
-- Replace 'REPLACE_WITH_ACTUAL_USER_ID' with the UUID from step 1
INSERT INTO public.whatsapp_team_members (
  id,
  organization_id,
  user_id,
  role,
  is_active,
  status,
  display_name,
  avatar_url,
  max_concurrent_conversations,
  skills
) VALUES (
  '00000000-0000-0000-0000-000000000002'::uuid,
  '00000000-0000-0000-0000-000000000001'::uuid,  -- Demo organization
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1),  -- Demo user (auto-lookup)
  'admin',
  true,
  'online',
  'Demo Admin',
  NULL,
  10,
  ARRAY['sales', 'support', 'technical']
) ON CONFLICT (organization_id, user_id) DO NOTHING;

-- ============================================================================
-- STEP 3: Seed Sample Contacts
-- ============================================================================

INSERT INTO public.whatsapp_contacts (
  id,
  organization_id,
  phone_number,
  name,
  email,
  tags,
  segment,
  custom_fields,
  opt_in_status,
  metadata
) VALUES
-- VIP Customers
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254712345678',
  'John Kamau',
  'john.kamau@techcorp.co.ke',
  ARRAY['vip', 'enterprise', 'active'],
  'customer',
  '{"company": "TechCorp Kenya", "industry": "Technology", "deal_size": "KES 500K"}'::jsonb,
  'opted_in',
  '{"source": "whatsapp", "total_conversations": 8, "total_messages": 45, "last_activity": "2025-01-07T14:30:00Z"}'::jsonb
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254723456789',
  'Sarah Wanjiru',
  'sarah.w@healthplus.co.ke',
  ARRAY['vip', 'healthcare', 'active'],
  'customer',
  '{"company": "HealthPlus Clinic", "industry": "Healthcare", "deal_size": "KES 350K"}'::jsonb,
  'opted_in',
  '{"source": "whatsapp", "total_conversations": 6, "total_messages": 32, "last_activity": "2025-01-07T16:45:00Z"}'::jsonb
),

-- Active Leads
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254734567890',
  'Michael Odhiambo',
  'michael@legalfirm.co.ke',
  ARRAY['lead', 'interested', 'legal'],
  'lead',
  '{"company": "Odhiambo & Associates", "industry": "Legal", "interest": "Microsoft 365"}'::jsonb,
  'opted_in',
  '{"source": "website_chat", "total_conversations": 3, "total_messages": 18, "last_activity": "2025-01-06T10:20:00Z"}'::jsonb
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254745678901',
  'Grace Njeri',
  'grace@educationhub.ac.ke',
  ARRAY['lead', 'hot', 'education'],
  'lead',
  '{"company": "Education Hub Academy", "industry": "Education", "interest": "Google Workspace"}'::jsonb,
  'opted_in',
  '{"source": "campaign", "total_conversations": 2, "total_messages": 12, "last_activity": "2025-01-05T15:30:00Z"}'::jsonb
),

-- Regular Customers
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254756789012',
  'David Kipchoge',
  'david@runningshop.co.ke',
  ARRAY['customer', 'retail'],
  'customer',
  '{"company": "Running Store Nairobi", "industry": "Retail"}'::jsonb,
  'opted_in',
  '{"source": "whatsapp", "total_conversations": 4, "total_messages": 22, "last_activity": "2025-01-04T09:15:00Z"}'::jsonb
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254767890123',
  'Amina Hassan',
  'amina@textilesfactory.co.ke',
  ARRAY['customer', 'manufacturing'],
  'customer',
  '{"company": "Nairobi Textiles Ltd", "industry": "Manufacturing"}'::jsonb,
  'opted_in',
  '{"source": "referral", "total_conversations": 5, "total_messages": 28, "last_activity": "2025-01-03T11:45:00Z"}'::jsonb
),

-- Support Requests
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254778901234',
  'Peter Mwangi',
  'peter@ngohelp.org',
  ARRAY['customer', 'support', 'ngo'],
  'customer',
  '{"company": "Help Kenya NGO", "industry": "Non-Profit"}'::jsonb,
  'opted_in',
  '{"source": "whatsapp", "total_conversations": 7, "total_messages": 38, "last_activity": "2025-01-07T13:20:00Z"}'::jsonb
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254789012345',
  'Jane Achieng',
  'jane@bankingsolutions.co.ke',
  ARRAY['customer', 'banking', 'enterprise'],
  'customer',
  '{"company": "Banking Solutions Ltd", "industry": "Banking"}'::jsonb,
  'opted_in',
  '{"source": "whatsapp", "total_conversations": 9, "total_messages": 52, "last_activity": "2025-01-07T17:00:00Z"}'::jsonb
),

-- Prospects
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254790123456',
  'Robert Koech',
  'robert@govtech.go.ke',
  ARRAY['prospect', 'government'],
  'lead',
  '{"company": "County Government Office", "industry": "Government", "interest": "Cloud Backup"}'::jsonb,
  'opted_in',
  '{"source": "campaign", "total_conversations": 1, "total_messages": 6, "last_activity": "2025-01-02T14:00:00Z"}'::jsonb
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  '+254701234567',
  'Mary Wambui',
  'mary@smeventures.co.ke',
  ARRAY['prospect', 'sme', 'warm'],
  'lead',
  '{"company": "SME Ventures", "industry": "SME", "interest": "WhatsApp Automation"}'::jsonb,
  'opted_in',
  '{"source": "website_chat", "total_conversations": 2, "total_messages": 10, "last_activity": "2025-01-06T12:30:00Z"}'::jsonb
);

-- ============================================================================
-- STEP 4: Seed Sample Conversations
-- ============================================================================

-- Get contact IDs for conversations (we'll use first 5 contacts)
WITH demo_contacts AS (
  SELECT id, phone_number, name
  FROM public.whatsapp_contacts
  WHERE organization_id = '00000000-0000-0000-0000-000000000001'
  ORDER BY created_at
  LIMIT 5
)
INSERT INTO public.whatsapp_conversations (
  id,
  organization_id,
  contact_id,
  assigned_agent_id,
  status,
  priority,
  channel,
  source,
  category,
  sentiment,
  total_messages_count,
  agent_messages_count,
  bot_messages_count,
  last_message_at,
  first_agent_response_at,
  first_response_time_seconds,
  satisfaction_rating,
  created_at
)
SELECT
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  dc.id,
  '00000000-0000-0000-0000-000000000002'::uuid,  -- Demo admin
  CASE
    WHEN ROW_NUMBER() OVER () <= 2 THEN 'open'
    WHEN ROW_NUMBER() OVER () = 3 THEN 'pending'
    ELSE 'resolved'
  END,
  CASE
    WHEN ROW_NUMBER() OVER () = 1 THEN 'high'
    ELSE 'normal'
  END,
  'whatsapp',
  'inbound',
  CASE
    WHEN ROW_NUMBER() OVER () <= 2 THEN 'sales'
    WHEN ROW_NUMBER() OVER () = 3 THEN 'support'
    ELSE 'inquiry'
  END,
  CASE
    WHEN ROW_NUMBER() OVER () <= 2 THEN 'positive'
    WHEN ROW_NUMBER() OVER () = 3 THEN 'neutral'
    ELSE 'positive'
  END,
  CASE
    WHEN ROW_NUMBER() OVER () = 1 THEN 8
    WHEN ROW_NUMBER() OVER () = 2 THEN 5
    WHEN ROW_NUMBER() OVER () = 3 THEN 6
    ELSE 4
  END,
  CASE
    WHEN ROW_NUMBER() OVER () <= 3 THEN 3
    ELSE 2
  END,
  1,  -- bot messages
  NOW() - (ROW_NUMBER() OVER () || ' hours')::interval,
  NOW() - (ROW_NUMBER() OVER () || ' hours')::interval - interval '5 minutes',
  300,  -- 5 minutes response time
  CASE WHEN ROW_NUMBER() OVER () > 3 THEN 5 ELSE NULL END,
  NOW() - (ROW_NUMBER() OVER () || ' days')::interval
FROM demo_contacts dc;

-- ============================================================================
-- STEP 5: Seed Sample Messages
-- ============================================================================

-- Add messages to first conversation (active sales conversation)
WITH first_conv AS (
  SELECT c.id, co.phone_number, co.name
  FROM public.whatsapp_conversations c
  JOIN public.whatsapp_contacts co ON c.contact_id = co.id
  WHERE c.organization_id = '00000000-0000-0000-0000-000000000001'
  ORDER BY c.created_at
  LIMIT 1
)
INSERT INTO public.whatsapp_messages (
  organization_id,
  conversation_id,
  direction,
  sender_type,
  message_type,
  content,
  status,
  created_at,
  sent_at,
  delivered_at,
  read_at
)
SELECT
  '00000000-0000-0000-0000-000000000001'::uuid,
  fc.id,
  CASE WHEN msg.direction = 'in' THEN 'inbound' ELSE 'outbound' END,
  CASE WHEN msg.direction = 'in' THEN 'contact' ELSE 'agent' END,
  'text',
  msg.content,
  'read',
  NOW() - (msg.time_ago || '')::interval,
  NOW() - (msg.time_ago || '')::interval,
  NOW() - (msg.time_ago || '')::interval + interval '2 seconds',
  NOW() - (msg.time_ago || '')::interval + interval '30 seconds'
FROM first_conv fc
CROSS JOIN (VALUES
  ('in', '2 hours', 'Hi! I''m interested in your Microsoft 365 packages for our company.'),
  ('out', '2 hours -5 minutes', 'Hello! Great to hear from you. We have several M365 plans available. How many users do you need to cover?'),
  ('in', '2 hours -10 minutes', 'We have about 25 employees currently.'),
  ('out', '2 hours -12 minutes', 'Perfect! For 25 users, I''d recommend our Business Standard plan at KES 1,400 per user/month. This includes Teams, SharePoint, and 1TB OneDrive storage per user.'),
  ('in', '2 hours -20 minutes', 'That sounds good. Do you also provide training for our staff?'),
  ('out', '2 hours -22 minutes', 'Yes! We include 2 hours of onboarding training with every deployment. Would you like to schedule a demo call to see the features?'),
  ('in', '2 hours -30 minutes', 'Yes, that would be great. When can we schedule it?'),
  ('out', '2 hours -31 minutes', 'I have availability tomorrow at 10 AM or 2 PM. Which works better for you?')
) AS msg(direction, time_ago, content);

-- ============================================================================
-- STEP 6: Seed Additional Templates
-- ============================================================================

INSERT INTO public.whatsapp_campaign_templates (
  organization_id,
  name,
  description,
  category,
  content,
  variables,
  language,
  status,
  created_by
) VALUES
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Order Confirmation',
  'Confirm customer orders with details',
  'transactional',
  'Hi {{customer_name}}! 🎉 Your order #{{order_number}} has been confirmed. Total: KES {{amount}}. Delivery by {{delivery_date}}.',
  '["customer_name", "order_number", "amount", "delivery_date"]'::jsonb,
  'en',
  'active',
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1)
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Payment Reminder',
  'Gentle reminder for pending payments',
  'transactional',
  'Hello {{client_name}}, this is a friendly reminder that invoice #{{invoice_number}} for KES {{amount}} is due on {{due_date}}. Pay via M-Pesa: Paybill 123456, Account: {{account}}.',
  '["client_name", "invoice_number", "amount", "due_date", "account"]'::jsonb,
  'en',
  'active',
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1)
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Support Ticket Created',
  'Acknowledge support ticket creation',
  'transactional',
  'Hi {{customer_name}}, we''ve received your support request (Ticket #{{ticket_number}}). Our team will respond within 2 hours. Issue: {{issue_summary}}',
  '["customer_name", "ticket_number", "issue_summary"]'::jsonb,
  'en',
  'active',
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1)
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Flash Sale Alert',
  'Promotional message for limited-time offers',
  'marketing',
  '⚡ FLASH SALE! {{product_name}} now {{discount}}% OFF! Regular: KES {{original_price}}, Now: KES {{sale_price}}. Ends {{end_date}}. Order now: {{link}}',
  '["product_name", "discount", "original_price", "sale_price", "end_date", "link"]'::jsonb,
  'en',
  'active',
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1)
),
(
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Meeting Confirmation',
  'Confirm scheduled meetings',
  'transactional',
  'Hi {{attendee_name}}, your meeting with {{host_name}} is confirmed for {{date}} at {{time}}. Location: {{location}}. Join link: {{meeting_link}}',
  '["attendee_name", "host_name", "date", "time", "location", "meeting_link"]'::jsonb,
  'en',
  'active',
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1)
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 7: Seed Sample Campaign
-- ============================================================================

INSERT INTO public.whatsapp_campaigns (
  id,
  organization_id,
  name,
  description,
  template_id,
  status,
  target_segment,
  schedule_type,
  scheduled_at,
  started_at,
  completed_at,
  total_recipients,
  messages_sent,
  messages_delivered,
  messages_read,
  messages_replied,
  messages_failed,
  created_by
) VALUES
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  'January Product Launch 2025',
  'Announcing new AI-powered WhatsApp automation features',
  (SELECT id FROM public.whatsapp_campaign_templates WHERE name = 'Product Launch Announcement' LIMIT 1),
  'completed',
  'all',
  'scheduled',
  NOW() - interval '7 days',
  NOW() - interval '7 days',
  NOW() - interval '6 days 23 hours',
  150,
  148,
  142,
  98,
  23,
  2,
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1)
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  'VIP Customer Appreciation',
  'Thank you message for VIP customers',
  (SELECT id FROM public.whatsapp_campaign_templates WHERE name = 'Welcome New Customer' LIMIT 1),
  'completed',
  'vip',
  'immediate',
  NULL,
  NOW() - interval '3 days',
  NOW() - interval '3 days',
  12,
  12,
  12,
  11,
  5,
  0,
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1)
),
(
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001'::uuid,
  'February Webinar Invite',
  'Invite leads to upcoming webinar on cloud migration',
  (SELECT id FROM public.whatsapp_campaign_templates WHERE name = 'Meeting Confirmation' LIMIT 1),
  'scheduled',
  'lead',
  'scheduled',
  NOW() + interval '5 days',
  NULL,
  NULL,
  45,
  0,
  0,
  0,
  0,
  0,
  (SELECT id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1)
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- Verification Queries
-- ============================================================================

-- Check demo user exists
SELECT
  'Demo User Check' as check_type,
  CASE
    WHEN COUNT(*) > 0 THEN '✅ Demo user exists'
    ELSE '❌ Demo user NOT found - create manually first!'
  END as status,
  COUNT(*) as count
FROM auth.users
WHERE email = 'demo@datacare.co.ke';

-- Check team member
SELECT
  'Team Member Check' as check_type,
  CASE
    WHEN COUNT(*) > 0 THEN '✅ Demo team member created'
    ELSE '❌ Team member NOT created'
  END as status,
  COUNT(*) as count
FROM public.whatsapp_team_members
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Check contacts
SELECT
  'Contacts Check' as check_type,
  '✅ ' || COUNT(*) || ' sample contacts created' as status,
  COUNT(*) as count
FROM public.whatsapp_contacts
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Check conversations
SELECT
  'Conversations Check' as check_type,
  '✅ ' || COUNT(*) || ' sample conversations created' as status,
  COUNT(*) as count
FROM public.whatsapp_conversations
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Check messages
SELECT
  'Messages Check' as check_type,
  '✅ ' || COUNT(*) || ' sample messages created' as status,
  COUNT(*) as count
FROM public.whatsapp_messages
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Check templates
SELECT
  'Templates Check' as check_type,
  '✅ ' || COUNT(*) || ' templates available' as status,
  COUNT(*) as count
FROM public.whatsapp_campaign_templates
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- Check campaigns
SELECT
  'Campaigns Check' as check_type,
  '✅ ' || COUNT(*) || ' campaigns created' as status,
  COUNT(*) as count
FROM public.whatsapp_campaigns
WHERE organization_id = '00000000-0000-0000-0000-000000000001';

-- ============================================================================
-- Success Message
-- ============================================================================

SELECT
  '🎉 Demo Account Setup Complete!' as message,
  '10 contacts, 5 conversations, 8 messages' as sample_data,
  '8 templates, 3 campaigns' as content,
  'Login: demo@datacare.co.ke / Demo2025!Preview' as credentials;
