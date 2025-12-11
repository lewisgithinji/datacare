-- Migration: Add started_at and completed_at to whatsapp_broadcasts
-- These columns track when broadcast sending started and finished

ALTER TABLE public.whatsapp_broadcasts 
ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;

-- Add index for querying broadcasts by status and time
CREATE INDEX IF NOT EXISTS idx_whatsapp_broadcasts_status_time 
ON public.whatsapp_broadcasts(organization_id, status, created_at DESC);

-- Add template_name column for easier display (denormalized for performance)
ALTER TABLE public.whatsapp_broadcasts 
ADD COLUMN IF NOT EXISTS template_name TEXT;

COMMENT ON COLUMN public.whatsapp_broadcasts.started_at IS 'Timestamp when broadcast sending began';
COMMENT ON COLUMN public.whatsapp_broadcasts.completed_at IS 'Timestamp when broadcast sending finished';
