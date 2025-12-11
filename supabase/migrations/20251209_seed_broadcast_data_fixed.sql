-- FIX: Add missing column and Insert Mock Data

-- 1. Ensure quality_score column exists (Fix for the error)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns 
        WHERE table_name = 'whatsapp_templates' 
        AND column_name = 'quality_score'
    ) THEN
        ALTER TABLE public.whatsapp_templates ADD COLUMN quality_score text;
    END IF;
END $$;

-- 2. Insert mock templates for Datacare Demo Organization
-- Org ID: 00000000-0000-0000-0000-000000000001

INSERT INTO public.whatsapp_templates (
  organization_id, 
  name, 
  language, 
  category, 
  status, 
  components, 
  quality_score
) VALUES 
(
  '00000000-0000-0000-0000-000000000001',
  'hello_world',
  'en_US',
  'MARKETING',
  'APPROVED',
  '[
    {"type": "HEADER", "format": "TEXT", "text": "Welcome to Datacare!"},
    {"type": "BODY", "text": "Hi {{1}}, thanks for signing up for our demo. We are excited to help you scale your WhatsApp marketing."},
    {"type": "FOOTER", "text": "Reply STOP to unsubscribe"},
    {"type": "BUTTONS", "buttons": [{"type": "QUICK_REPLY", "text": "Tell me more"}, {"type": "QUICK_REPLY", "text": "Pricing"}]}
  ]'::jsonb,
  'HIGH'
),
(
  '00000000-0000-0000-0000-000000000001',
  'black_friday_promo',
  'en_US',
  'MARKETING',
  'APPROVED',
  '[
    {"type": "HEADER", "format": "IMAGE", "example": {"header_handle": ["https://example.com/image.jpg"]}},
    {"type": "BODY", "text": "Huge savings! 🎁 Get 50% off all plans this week only. Don''t miss out, {{1}}!"},
    {"type": "FOOTER", "text": "Offer ends Friday"},
    {"type": "BUTTONS", "buttons": [{"type": "URL", "text": "Claim Offer", "url": "https://datacare.co.ke/pricing"}]}
  ]'::jsonb,
  'MEDIUM'
),
(
  '00000000-0000-0000-0000-000000000001',
  'appointment_reminder',
  'en_US',
  'UTILITY',
  'APPROVED',
  '[
    {"type": "BODY", "text": "Hello {{1}}, this is a reminder for your consultation on {{2}} at {{3}}. Please reply YES to confirm."},
    {"type": "FOOTER", "text": "Datacare Support"}
  ]'::jsonb,
  'HIGH'
)
ON CONFLICT (organization_id, name, language) DO UPDATE 
SET components = EXCLUDED.components, status = EXCLUDED.status;
