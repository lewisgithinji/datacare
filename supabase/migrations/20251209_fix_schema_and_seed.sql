-- FINAL FIX: Schema Correction & Seed Data
-- This script handles all discrepancies: missing columns AND missing constraints.

DO $$
BEGIN
    -- 1. Fix Missing Column: quality_score
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns 
        WHERE table_name = 'whatsapp_templates' 
        AND column_name = 'quality_score'
    ) THEN
        ALTER TABLE public.whatsapp_templates ADD COLUMN quality_score text;
    END IF;

    -- 2. Fix Missing Constraint: unique_template_per_org
    -- We first drop it if it exists to ensure it's correct, or we can just add it if not exists.
    -- Better to check existence to avoid errors.
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint 
        WHERE conname = 'whatsapp_templates_org_name_lang_key'
    ) THEN
        -- Add the unique constraint required for ON CONFLICT
        ALTER TABLE public.whatsapp_templates 
        ADD CONSTRAINT whatsapp_templates_org_name_lang_key UNIQUE (organization_id, name, language);
    END IF;
END $$;

-- 3. Now we can safely Insert Mock Data using ON CONFLICT
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
ON CONFLICT (organization_id, name, language) 
DO UPDATE SET 
    components = EXCLUDED.components, 
    status = EXCLUDED.status,
    quality_score = EXCLUDED.quality_score;
