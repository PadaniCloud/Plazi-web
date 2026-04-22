-- Migración: crear tabla waitlist
-- Fecha: 2026-04-22
-- Descripción: leads captados desde plazi.es, separados de profiles

CREATE TABLE waitlist (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  convocatoria  TEXT CHECK (convocatoria IN ('C1','C2','otra')),
  experience    TEXT CHECK (experience IN ('empezando','6meses','1año+','ya_presentado')),
  referral_code TEXT,
  own_code      TEXT UNIQUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_waitlist_own_code ON waitlist(own_code);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_count" ON waitlist
  FOR SELECT USING (true);