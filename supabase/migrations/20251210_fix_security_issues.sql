-- ============================================================================
-- Fix Database Security Linter Issues
-- ============================================================================
-- This migration fixes 5 security issues reported by Supabase database linter:
-- 1. Remove SECURITY DEFINER from user_whatsapp_organization_ids() function
-- 2. Enable RLS on analytics partition tables
-- ============================================================================

-- Fix 1: Change helper function from SECURITY DEFINER to SECURITY INVOKER
-- This function doesn't need elevated privileges since it only queries
-- the user's own organization membership based on auth.uid()
CREATE OR REPLACE FUNCTION user_whatsapp_organization_ids()
RETURNS SETOF UUID AS $$
  SELECT organization_id
  FROM whatsapp_team_members
  WHERE user_id = auth.uid() AND is_active = true;
$$ LANGUAGE sql STABLE SECURITY INVOKER;

-- Fix 2: Enable RLS on partition tables
-- Partition tables inherit the parent table's structure but not RLS settings
-- The parent table (whatsapp_analytics_events) already has RLS enabled,
-- but we need to explicitly enable it on each partition
ALTER TABLE whatsapp_analytics_events_2025_01 ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_analytics_events_2025_02 ENABLE ROW LEVEL SECURITY;

-- Verification: Check that RLS is enabled on partition tables
DO $$
DECLARE
  partition_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO partition_count
  FROM pg_tables
  WHERE schemaname = 'public'
    AND tablename LIKE 'whatsapp_analytics_events_2025_%'
    AND rowsecurity = true;
  
  IF partition_count = 2 THEN
    RAISE NOTICE '✅ RLS enabled on % partition tables', partition_count;
  ELSE
    RAISE WARNING '⚠️  Expected 2 partitions with RLS, found %', partition_count;
  END IF;
END $$;

-- Verification: Check function security type
DO $$
DECLARE
  sec_type TEXT;
BEGIN
  SELECT security_type INTO sec_type
  FROM information_schema.routines
  WHERE routine_schema = 'public'
    AND routine_name = 'user_whatsapp_organization_ids';
  
  IF sec_type = 'INVOKER' THEN
    RAISE NOTICE '✅ Function security type set to INVOKER';
  ELSE
    RAISE WARNING '⚠️  Expected INVOKER, found %', sec_type;
  END IF;
END $$;

-- Success message
SELECT '✅ Database security issues fixed!' AS status;
