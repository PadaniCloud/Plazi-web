CREATE TABLE waitlist (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT NOT NULL,
  email          TEXT NOT NULL UNIQUE,
  convocatoria   TEXT NOT NULL CHECK (convocatoria IN ('C1', 'C2')),
  experience     TEXT,
  referral_code  TEXT,                -- own_code del referidor (FK lógica)
  own_code       TEXT UNIQUE DEFAULT substr(md5(random()::text), 1, 8),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  points         INT NOT NULL DEFAULT 0,
  referral_count INT NOT NULL DEFAULT 0,
  demo_completed BOOLEAN
);

-- Índices
CREATE INDEX ON waitlist(points DESC, created_at ASC);
CREATE INDEX ON waitlist(own_code);

-- Función: incrementar puntos (+10) y referral_count (+1) del referidor de forma atómica.
-- Devuelve el número de filas actualizadas (0 = código no encontrado).
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
