-- ============================================================================
-- Demo User and Sample Data (Idempotent Version)
-- ============================================================================
-- This migration safely seeds demo data and can be run multiple times
-- ============================================================================

-- Check if demo data already exists, skip if it does
DO $$
DECLARE
  demo_org_id UUID := '00000000-0000-0000-0000-000000000001';
  demo_user_id UUID;
  contact_count INT;
BEGIN
  -- Get demo user ID
  SELECT id INTO demo_user_id FROM auth.users WHERE email = 'demo@datacare.co.ke' LIMIT 1;

  IF demo_user_id IS NULL THEN
    RAISE NOTICE 'Demo user not found. Please create demo user first.';
    RETURN;
  END IF;

  -- Check if demo data already exists
  SELECT COUNT(*) INTO contact_count
  FROM public.whatsapp_contacts
  WHERE organization_id = demo_org_id;

  IF contact_count > 0 THEN
    RAISE NOTICE 'Demo data already exists (% contacts found). Skipping seed.', contact_count;
    RETURN;
  END IF;

  RAISE NOTICE 'Creating demo data...';

  -- ============================================================================
  -- Create Demo Team Member (if not exists)
  -- ============================================================================
  INSERT INTO public.whatsapp_team_members (
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
    demo_org_id,
    demo_user_id,
    'admin',
    true,
    'online',
    'Demo Admin',
    10,
    ARRAY['sales', 'support', 'technical']
  ) ON CONFLICT (organization_id, user_id) DO NOTHING;

  -- ============================================================================
  -- Seed Sample Contacts (10 contacts)
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
  (
    gen_random_uuid(),
    demo_org_id,
    '+254712345678',
    'John Kamau',
    'john.kamau@techcorp.co.ke',
    ARRAY['vip', 'enterprise', 'active'],
    'customer',
    '{"company": "TechCorp Kenya", "industry": "Technology", "deal_size": "KES 500K"}'::jsonb,
    'opted_in',
    '{"source": "whatsapp", "total_conversations": 8, "total_messages": 45}'::jsonb
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    '+254723456789',
    'Sarah Wanjiru',
    'sarah.wanjiru@healthplus.co.ke',
    ARRAY['vip', 'healthcare', 'priority'],
    'customer',
    '{"company": "HealthPlus Medical", "industry": "Healthcare", "deal_size": "KES 750K"}'::jsonb,
    'opted_in',
    '{"source": "website", "total_conversations": 12, "total_messages": 67}'::jsonb
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    '+254734567890',
    'Michael Odhiambo',
    'michael.o@odhiambolaw.co.ke',
    ARRAY['lead', 'legal', 'interested'],
    'lead',
    '{"company": "Odhiambo & Associates", "industry": "Legal Services", "deal_size": "KES 200K"}'::jsonb,
    'opted_in',
    '{"source": "referral", "total_conversations": 3, "total_messages": 15}'::jsonb
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    '+254745678901',
    'Grace Njeri',
    'grace.njeri@edutech.co.ke',
    ARRAY['active', 'education', 'monthly'],
    'customer',
    '{"company": "EduTech Solutions", "industry": "Education", "deal_size": "KES 150K"}'::jsonb,
    'opted_in',
    '{"source": "whatsapp", "total_conversations": 6, "total_messages": 28}'::jsonb
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    '+254756789012',
    'David Kipchoge',
    'david.k@retailmart.co.ke',
    ARRAY['customer', 'retail', 'regular'],
    'customer',
    '{"company": "RetailMart Kenya", "industry": "Retail", "deal_size": "KES 300K"}'::jsonb,
    'opted_in',
    '{"source": "whatsapp", "total_conversations": 5, "total_messages": 22}'::jsonb
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    '+254767890123',
    'Amina Hassan',
    'amina.hassan@manufacturing.co.ke',
    ARRAY['prospect', 'manufacturing', 'warm'],
    'lead',
    '{"company": "Hassan Manufacturing", "industry": "Manufacturing", "deal_size": "KES 1M"}'::jsonb,
    'opted_in',
    '{"source": "linkedin", "total_conversations": 2, "total_messages": 8}'::jsonb
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    '+254778901234',
    'Peter Mwangi',
    'peter.m@ngokenya.org',
    ARRAY['support', 'ngo', 'active'],
    'customer',
    '{"company": "NGO Kenya", "industry": "Non-Profit", "deal_size": "KES 100K"}'::jsonb,
    'opted_in',
    '{"source": "email", "total_conversations": 4, "total_messages": 18}'::jsonb
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    '+254789012345',
    'Jane Achieng',
    'jane.achieng@bankkenya.co.ke',
    ARRAY['vip', 'banking', 'enterprise'],
    'customer',
    '{"company": "Bank of Kenya", "industry": "Banking", "deal_size": "KES 2M"}'::jsonb,
    'opted_in',
    '{"source": "conference", "total_conversations": 10, "total_messages": 52}'::jsonb
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    '+254790123456',
    'Robert Koech',
    'robert.k@govkenya.go.ke',
    ARRAY['prospect', 'government', 'cold'],
    'lead',
    '{"company": "Government of Kenya", "industry": "Government", "deal_size": "KES 5M"}'::jsonb,
    'opted_in',
    '{"source": "tender", "total_conversations": 1, "total_messages": 3}'::jsonb
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    '+254701234567',
    'Mary Wambui',
    'mary.wambui@sme.co.ke',
    ARRAY['customer', 'sme', 'regular'],
    'customer',
    '{"company": "Wambui SME", "industry": "Small Business", "deal_size": "KES 50K"}'::jsonb,
    'opted_in',
    '{"source": "whatsapp", "total_conversations": 7, "total_messages": 31}'::jsonb
  );

  RAISE NOTICE '10 sample contacts created';

  -- ============================================================================
  -- Seed Sample Conversations (5 conversations)
  -- ============================================================================
  WITH demo_contacts AS (
    SELECT id, phone_number, name
    FROM public.whatsapp_contacts
    WHERE organization_id = demo_org_id
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
    first_response_time_seconds,
    avg_response_time_seconds,
    created_at,
    updated_at,
    last_message_at
  )
  SELECT
    gen_random_uuid(),
    demo_org_id,
    dc.id,
    demo_user_id,
    CASE
      WHEN ROW_NUMBER() OVER () = 1 THEN 'open'
      WHEN ROW_NUMBER() OVER () = 2 THEN 'open'
      WHEN ROW_NUMBER() OVER () = 3 THEN 'pending'
      ELSE 'resolved'
    END,
    CASE
      WHEN ROW_NUMBER() OVER () <= 2 THEN 'high'
      WHEN ROW_NUMBER() OVER () = 3 THEN 'medium'
      ELSE 'low'
    END,
    'whatsapp',
    'inbound',
    CASE
      WHEN ROW_NUMBER() OVER () = 1 THEN 'sales'
      WHEN ROW_NUMBER() OVER () = 2 THEN 'support'
      ELSE 'general'
    END,
    CASE
      WHEN ROW_NUMBER() OVER () <= 2 THEN 'positive'
      WHEN ROW_NUMBER() OVER () = 3 THEN 'neutral'
      ELSE 'positive'
    END,
    CASE
      WHEN ROW_NUMBER() OVER () = 1 THEN 8
      WHEN ROW_NUMBER() OVER () = 2 THEN 5
      ELSE 3
    END,
    120,
    180,
    NOW() - (ROW_NUMBER() OVER () || ' hours')::INTERVAL,
    NOW() - (ROW_NUMBER() OVER () * 30 || ' minutes')::INTERVAL,
    NOW() - (ROW_NUMBER() OVER () * 30 || ' minutes')::INTERVAL
  FROM demo_contacts;

  RAISE NOTICE '5 sample conversations created';

  -- ============================================================================
  -- Seed Sample Messages (8 messages for first conversation)
  -- ============================================================================
  WITH first_conversation AS (
    SELECT c.id as conversation_id, c.contact_id, c.organization_id
    FROM public.whatsapp_conversations c
    WHERE c.organization_id = demo_org_id
    ORDER BY c.created_at
    LIMIT 1
  )
  INSERT INTO public.whatsapp_messages (
    organization_id,
    conversation_id,
    contact_id,
    direction,
    sender_type,
    message_type,
    content,
    status,
    created_at
  )
  SELECT
    fc.organization_id,
    fc.conversation_id,
    fc.contact_id,
    messages.direction,
    messages.sender_type,
    'text',
    messages.content,
    messages.status,
    NOW() - messages.time_ago::INTERVAL
  FROM first_conversation fc
  CROSS JOIN (VALUES
    ('in', 'contact', 'Hi! I''m interested in your Microsoft 365 packages for our company.', 'read', '2 hours'),
    ('out', 'agent', 'Hello! Great to hear from you. We have several M365 plans available. What size is your organization?', 'delivered', '2 hours -5 minutes'),
    ('in', 'contact', 'We have about 25 employees. Need email, cloud storage, and Teams.', 'read', '2 hours -10 minutes'),
    ('out', 'agent', 'Perfect! I recommend our Business Standard plan. It includes: Outlook, OneDrive (1TB), SharePoint, Teams, and Office apps. KES 1,500/user/month.', 'delivered', '2 hours -12 minutes'),
    ('in', 'contact', 'That sounds good. Do you offer training for our team?', 'read', '2 hours -20 minutes'),
    ('out', 'agent', 'Yes! We provide free onboarding training and 24/7 support. I can schedule a demo this week. What day works for you?', 'delivered', '2 hours -22 minutes'),
    ('in', 'contact', 'Thursday afternoon would be great!', 'read', '2 hours -30 minutes'),
    ('out', 'agent', 'Excellent! I''ll send you a calendar invite for Thursday 2 PM. I''ll also email you a detailed proposal. What''s your email?', 'delivered', '2 hours -32 minutes')
  ) AS messages(direction, sender_type, content, status, time_ago);

  RAISE NOTICE '8 sample messages created';

  -- ============================================================================
  -- Seed Additional Templates (5 templates)
  -- ============================================================================
  INSERT INTO public.whatsapp_campaign_templates (
    organization_id,
    name,
    description,
    category,
    content,
    variables,
    status
  ) VALUES
  (
    demo_org_id,
    'Order Confirmation',
    'Confirm customer orders with details',
    'transactional',
    'Hi {{customer_name}}! 🎉 Your order #{{order_number}} has been confirmed. Total: KES {{amount}}. Expected delivery: {{delivery_date}}. Track your order: {{tracking_link}}',
    '["customer_name", "order_number", "amount", "delivery_date", "tracking_link"]'::jsonb,
    'active'
  ),
  (
    demo_org_id,
    'Payment Reminder',
    'Remind customers about pending payments',
    'transactional',
    'Hello {{customer_name}}, this is a friendly reminder about your pending invoice #{{invoice_number}} of KES {{amount}}. Due date: {{due_date}}. Pay via M-Pesa: {{mpesa_number}}. Thank you!',
    '["customer_name", "invoice_number", "amount", "due_date", "mpesa_number"]'::jsonb,
    'active'
  ),
  (
    demo_org_id,
    'Support Ticket Created',
    'Acknowledge support ticket creation',
    'support',
    'Hi {{customer_name}}, we''ve received your support request (Ticket #{{ticket_number}}). Our team will respond within {{response_time}}. Issue: {{issue_description}}. We''re here to help! 💪',
    '["customer_name", "ticket_number", "response_time", "issue_description"]'::jsonb,
    'active'
  ),
  (
    demo_org_id,
    'Flash Sale Alert',
    'Notify customers about limited-time offers',
    'marketing',
    '⚡ FLASH SALE ALERT ⚡ Hey {{customer_name}}! Get {{discount}}% OFF on {{product_name}} for the next {{duration}} hours only! Use code: {{promo_code}}. Shop now: {{shop_link}}',
    '["customer_name", "discount", "product_name", "duration", "promo_code", "shop_link"]'::jsonb,
    'active'
  ),
  (
    demo_org_id,
    'Meeting Confirmation',
    'Confirm scheduled meetings',
    'transactional',
    'Hi {{customer_name}}! Your meeting with {{agent_name}} is confirmed for {{date}} at {{time}}. Location: {{location}}. Meeting link: {{meeting_link}}. See you there! 📅',
    '["customer_name", "agent_name", "date", "time", "location", "meeting_link"]'::jsonb,
    'active'
  );

  RAISE NOTICE '5 additional templates created';

  -- ============================================================================
  -- Seed Sample Campaigns (3 campaigns)
  -- ============================================================================
  INSERT INTO public.whatsapp_campaigns (
    id,
    organization_id,
    name,
    description,
    status,
    target_segment,
    total_recipients,
    messages_sent,
    messages_delivered,
    messages_read,
    messages_failed,
    scheduled_at,
    started_at,
    completed_at,
    created_at
  ) VALUES
  (
    gen_random_uuid(),
    demo_org_id,
    'January Product Launch 2025',
    'Announcing new AI-powered WhatsApp automation features to enterprise customers',
    'completed',
    'customer',
    150,
    148,
    142,
    128,
    6,
    NOW() - '7 days'::INTERVAL,
    NOW() - '7 days'::INTERVAL,
    NOW() - '6 days'::INTERVAL,
    NOW() - '10 days'::INTERVAL
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    'VIP Customer Appreciation',
    'Thank you message with exclusive discount for VIP customers',
    'completed',
    'vip',
    12,
    12,
    12,
    11,
    0,
    NOW() - '3 days'::INTERVAL,
    NOW() - '3 days'::INTERVAL,
    NOW() - '3 days'::INTERVAL,
    NOW() - '5 days'::INTERVAL
  ),
  (
    gen_random_uuid(),
    demo_org_id,
    'February Webinar Invite',
    'Invite leads to upcoming webinar on digital transformation',
    'scheduled',
    'lead',
    45,
    0,
    0,
    0,
    0,
    NOW() + '2 days'::INTERVAL,
    NULL,
    NULL,
    NOW()
  );

  RAISE NOTICE '3 sample campaigns created';
  RAISE NOTICE 'Demo data seeding complete!';
END $$;
