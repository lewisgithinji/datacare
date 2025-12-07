-- Test Data for WhatsApp Messaging Platform
-- Run this in Supabase SQL Editor to populate with sample conversations

-- Note: Replace 'your-user-id-here' with your actual auth.users.id if you want to assign conversations to yourself
-- You can find your user ID by running: SELECT id, email FROM auth.users;

-- Insert test contacts
INSERT INTO whatsapp_contacts (id, organization_id, phone_number, name, email, tags, segment, opt_in_status, custom_fields, metadata, first_interaction_at, last_interaction_at, created_at, updated_at)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000001',
    '+254712345001',
    'John Kamau',
    'john.kamau@example.com',
    ARRAY['vip', 'enterprise'],
    'enterprise',
    'opted_in',
    '{"company": "Safaricom Ltd", "position": "IT Manager"}',
    '{"source": "website", "total_conversations": 3, "total_messages": 15}',
    NOW() - INTERVAL '7 days',
    NOW() - INTERVAL '2 hours',
    NOW() - INTERVAL '7 days',
    NOW()
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000001',
    '+254723456002',
    'Grace Wanjiru',
    'grace.w@example.com',
    ARRAY['lead', 'interested'],
    'potential_customer',
    'opted_in',
    '{"company": "ABC School", "position": "Principal"}',
    '{"source": "referral", "total_conversations": 1, "total_messages": 8}',
    NOW() - INTERVAL '3 days',
    NOW() - INTERVAL '1 hour',
    NOW() - INTERVAL '3 days',
    NOW()
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    '00000000-0000-0000-0000-000000000001',
    '+254734567003',
    'David Omondi',
    'david.o@example.com',
    ARRAY['support', 'technical'],
    'existing_customer',
    'opted_in',
    '{"company": "KCB Bank", "issue": "Microsoft 365 license"}',
    '{"source": "support", "total_conversations": 2, "total_messages": 12}',
    NOW() - INTERVAL '5 days',
    NOW() - INTERVAL '30 minutes',
    NOW() - INTERVAL '5 days',
    NOW()
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    '00000000-0000-0000-0000-000000000001',
    '+254745678004',
    'Sarah Akinyi',
    NULL,
    ARRAY['new'],
    'lead',
    'opted_in',
    '{}',
    '{"source": "whatsapp", "total_conversations": 1, "total_messages": 3}',
    NOW() - INTERVAL '1 hour',
    NOW() - INTERVAL '5 minutes',
    NOW() - INTERVAL '1 hour',
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- Insert test conversations
INSERT INTO whatsapp_conversations (id, organization_id, contact_id, assigned_agent_id, status, priority, channel, source, tags, category, sentiment, intent, summary, first_response_time_seconds, total_messages_count, agent_messages_count, bot_messages_count, last_message_at, first_agent_response_at, created_at, updated_at)
VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '00000000-0000-0000-0000-000000000001',
    '11111111-1111-1111-1111-111111111111',
    NULL,
    'open',
    'high',
    'whatsapp',
    'inbound',
    ARRAY['microsoft365', 'licensing'],
    'sales',
    'positive',
    'purchase_inquiry',
    'Enterprise customer asking about Microsoft 365 E5 licenses for 200 users',
    120,
    6,
    3,
    3,
    NOW() - INTERVAL '2 hours',
    NOW() - INTERVAL '1 hour 58 minutes',
    NOW() - INTERVAL '2 hours',
    NOW()
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '00000000-0000-0000-0000-000000000001',
    '22222222-2222-2222-2222-222222222222',
    NULL,
    'assigned',
    'normal',
    'whatsapp',
    'inbound',
    ARRAY['google_workspace', 'education'],
    'sales',
    'positive',
    'quote_request',
    'School principal requesting quote for Google Workspace for Education',
    180,
    4,
    2,
    2,
    NOW() - INTERVAL '1 hour',
    NOW() - INTERVAL '58 minutes',
    NOW() - INTERVAL '1 hour',
    NOW()
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '00000000-0000-0000-0000-000000000001',
    '33333333-3333-3333-3333-333333333333',
    NULL,
    'pending',
    'urgent',
    'whatsapp',
    'inbound',
    ARRAY['support', 'technical'],
    'support',
    'negative',
    'technical_issue',
    'Customer unable to access Microsoft 365 after license renewal',
    300,
    5,
    2,
    3,
    NOW() - INTERVAL '30 minutes',
    NOW() - INTERVAL '25 minutes',
    NOW() - INTERVAL '30 minutes',
    NOW()
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    '00000000-0000-0000-0000-000000000001',
    '44444444-4444-4444-4444-444444444444',
    NULL,
    'open',
    'normal',
    'whatsapp',
    'inbound',
    ARRAY['new_customer'],
    'general_inquiry',
    'neutral',
    'information_request',
    'New customer asking about services',
    60,
    2,
    1,
    1,
    NOW() - INTERVAL '5 minutes',
    NOW() - INTERVAL '4 minutes',
    NOW() - INTERVAL '5 minutes',
    NOW()
  )
ON CONFLICT (id) DO NOTHING;

-- Insert test messages for Conversation 1 (John Kamau - Microsoft 365)
INSERT INTO whatsapp_messages (id, organization_id, conversation_id, whatsapp_message_id, direction, sender_type, sender_id, message_type, content, status, created_at)
VALUES
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'wamid.1234567890',
    'inbound',
    'contact',
    '11111111-1111-1111-1111-111111111111',
    'text',
    'Hello, I need Microsoft 365 licenses for my organization',
    'read',
    NOW() - INTERVAL '2 hours'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    NULL,
    'outbound',
    'bot',
    NULL,
    'text',
    'Hi John! 👋

Welcome to Datacare. I can help you with Microsoft 365 licenses.

How many users do you need licenses for?',
    'read',
    NOW() - INTERVAL '1 hour 58 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'wamid.1234567891',
    'inbound',
    'contact',
    '11111111-1111-1111-1111-111111111111',
    'text',
    'We need about 200 licenses. We are looking at E5 plan',
    'read',
    NOW() - INTERVAL '1 hour 55 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    NULL,
    'outbound',
    'bot',
    NULL,
    'text',
    'Perfect! Microsoft 365 E5 is our most comprehensive plan. 💼

For 200 users on E5:
• Price: $57/user/month
• Total: $11,400/month

This includes:
✅ Full Office apps
✅ Advanced security & compliance
✅ Power BI Pro
✅ Advanced analytics

Would you like a detailed quote sent to your email?',
    'read',
    NOW() - INTERVAL '1 hour 54 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'wamid.1234567892',
    'inbound',
    'contact',
    '11111111-1111-1111-1111-111111111111',
    'text',
    'Yes please! Also, can we schedule a call to discuss migration from our current system?',
    'read',
    NOW() - INTERVAL '1 hour 50 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    NULL,
    'outbound',
    'bot',
    NULL,
    'text',
    'Absolutely! I''m connecting you with our sales team to schedule a migration consultation. They''ll reach out within the next hour.

Your quote will be sent to john.kamau@example.com shortly. 📧',
    'delivered',
    NOW() - INTERVAL '1 hour 48 minutes'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert test messages for Conversation 2 (Grace Wanjiru - Google Workspace)
INSERT INTO whatsapp_messages (id, organization_id, conversation_id, whatsapp_message_id, direction, sender_type, sender_id, message_type, content, status, created_at)
VALUES
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'wamid.2234567890',
    'inbound',
    'contact',
    '22222222-2222-2222-2222-222222222222',
    'text',
    'Hi, I''m the principal of ABC School. We need Google Workspace for our teachers',
    'read',
    NOW() - INTERVAL '1 hour'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    NULL,
    'outbound',
    'bot',
    NULL,
    'text',
    'Hello Principal Grace! 🎓

Great choice! Google Workspace for Education is perfect for schools.

How many teachers and staff will need accounts?',
    'read',
    NOW() - INTERVAL '58 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'wamid.2234567891',
    'inbound',
    'contact',
    '22222222-2222-2222-2222-222222222222',
    'text',
    'About 50 teachers. What features are included?',
    'read',
    NOW() - INTERVAL '55 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    NULL,
    'outbound',
    'bot',
    NULL,
    'text',
    'Google Workspace for Education Plus includes:

📚 Google Classroom
📧 Gmail (custom domain)
💾 100TB shared storage
📹 Google Meet (500 participants)
📝 Docs, Sheets, Slides
🔒 Enhanced security

Pricing: $5/user/month for 50 users = $250/month

I''m connecting you with our education specialist for a personalized demo! 🌟',
    'delivered',
    NOW() - INTERVAL '53 minutes'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert test messages for Conversation 3 (David Omondi - Support)
INSERT INTO whatsapp_messages (id, organization_id, conversation_id, whatsapp_message_id, direction, sender_type, sender_id, message_type, content, status, created_at)
VALUES
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'wamid.3234567890',
    'inbound',
    'contact',
    '33333333-3333-3333-3333-333333333333',
    'text',
    'URGENT: Our Microsoft 365 licenses expired and staff cannot access emails!',
    'read',
    NOW() - INTERVAL '30 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    NULL,
    'outbound',
    'bot',
    NULL,
    'text',
    'I understand this is urgent, David. Let me help you right away! 🚨

I''m escalating this to our technical support team immediately. They will contact you within 10 minutes.

Can you confirm:
1. How many users are affected?
2. When did the issue start?',
    'read',
    NOW() - INTERVAL '25 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'wamid.3234567891',
    'inbound',
    'contact',
    '33333333-3333-3333-3333-333333333333',
    'text',
    '120 users affected. Started this morning at 9am',
    'read',
    NOW() - INTERVAL '23 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    NULL,
    'outbound',
    'bot',
    NULL,
    'text',
    'Thank you. I''ve flagged this as PRIORITY 1. Our support engineer is reviewing your account now and will call you at +254734567003 in the next 5 minutes.',
    'delivered',
    NOW() - INTERVAL '20 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'wamid.3234567892',
    'inbound',
    'contact',
    '33333333-3333-3333-3333-333333333333',
    'text',
    'Thank you! Waiting for the call',
    'read',
    NOW() - INTERVAL '18 minutes'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert test messages for Conversation 4 (Sarah Akinyi - New Customer)
INSERT INTO whatsapp_messages (id, organization_id, conversation_id, whatsapp_message_id, direction, sender_type, sender_id, message_type, content, status, created_at)
VALUES
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'wamid.4234567890',
    'inbound',
    'contact',
    '44444444-4444-4444-4444-444444444444',
    'text',
    'Hello',
    'read',
    NOW() - INTERVAL '5 minutes'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    NULL,
    'outbound',
    'bot',
    NULL,
    'text',
    'Hi Sarah! 👋

Welcome to Datacare. How can I help you today?

1️⃣ Microsoft 365 & Google Workspace
2️⃣ Cloud Backup Solutions
3️⃣ AI & Messaging Automation
4️⃣ Talk to Sales Team',
    'delivered',
    NOW() - INTERVAL '4 minutes'
  )
ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Test data inserted successfully! 🎉' AS message,
       (SELECT COUNT(*) FROM whatsapp_contacts WHERE organization_id = '00000000-0000-0000-0000-000000000001') AS contacts_created,
       (SELECT COUNT(*) FROM whatsapp_conversations WHERE organization_id = '00000000-0000-0000-0000-000000000001') AS conversations_created,
       (SELECT COUNT(*) FROM whatsapp_messages WHERE organization_id = '00000000-0000-0000-0000-000000000001') AS messages_created;
