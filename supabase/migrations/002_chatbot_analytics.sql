-- 002_chatbot_analytics.sql
-- Copied from original chatbot migration (archived at supabase/migrations-archive/old-migrations/20250824080318_23d0f108-d2c3-42f7-8deb-2924dd27bc28.sql)

-- Functions to maintain updated_at columns and security-definer variants
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- (Additional function to calculate lead score is archived in migrations-archive.)
