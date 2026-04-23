-- Fix credit_referral: incremento +10 puntos (antes era +1)
CREATE OR REPLACE FUNCTION credit_referral(ref_code TEXT)
RETURNS INT
LANGUAGE plpgsql
AS $$
DECLARE
  rows_affected INT;
BEGIN
  UPDATE waitlist
  SET points         = points + 10,
      referral_count = referral_count + 1
  WHERE own_code = ref_code;
  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected;
END;
$$;
