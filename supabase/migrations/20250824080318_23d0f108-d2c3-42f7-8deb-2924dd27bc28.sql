-- Fix function search path security issues
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

CREATE OR REPLACE FUNCTION public.calculate_lead_score(
  org_type TEXT,
  company_size TEXT,
  urgency TEXT,
  budget TEXT
) RETURNS INTEGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Organization type scoring
  CASE org_type
    WHEN 'Banking & Finance' THEN score := score + 30;
    WHEN 'Healthcare' THEN score := score + 25;
    WHEN 'Legal' THEN score := score + 20;
    WHEN 'Government' THEN score := score + 15;
    WHEN 'Manufacturing' THEN score := score + 15;
    WHEN 'Education' THEN score := score + 10;
    WHEN 'NGOs' THEN score := score + 10;
    WHEN 'SMEs' THEN score := score + 5;
    ELSE score := score + 0;
  END CASE;

  -- Company size scoring
  CASE company_size
    WHEN '300+' THEN score := score + 40;
    WHEN '51–300' THEN score := score + 30;
    WHEN '11–50' THEN score := score + 20;
    WHEN '1–10' THEN score := score + 10;
    ELSE score := score + 0;
  END CASE;

  -- Urgency scoring
  CASE urgency
    WHEN 'Now' THEN score := score + 30;
    WHEN '30 days' THEN score := score + 20;
    WHEN '90 days' THEN score := score + 10;
    ELSE score := score + 0;
  END CASE;

  -- Budget scoring
  CASE budget
    WHEN 'Enterprise' THEN score := score + 30;
    WHEN 'Standard' THEN score := score + 20;
    WHEN 'Entry' THEN score := score + 10;
    ELSE score := score + 0;
  END CASE;

  RETURN score;
END;
$$;