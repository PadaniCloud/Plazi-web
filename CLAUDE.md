@AGENTS.md
# Plazi — Contexto del proyecto

Plazi es una SaaS española de preparación de oposiciones AGE (C1/C2 Auxiliar/Administrativo).
Posicionamiento: "El sistema que te lleva a la plaza" — no un banco de preguntas.

## Repos
- `PadaniCloud/Plazi-web` → plazi.es (este repo — landing pública)
- `PadaniCloud/Oposapp` → app.plazi.es (la app)

## Stack
Next.js 15, App Router, TypeScript, Tailwind, Supabase

## Variables de entorno
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Convenciones
- Código y base de datos en inglés
- Commits en español
- Mobile-first 375px
- Sin imágenes ni ilustraciones — tipografía, espaciado y color
- Nunca mencionar "SRS", "FSRS" ni "repetición espaciada" al usuario

## Diseño
- Tipografía: Inter (Google Fonts)
- Color principal: #1E3A8A
- Color acento: #3B82F6
- Fondo: blanco
- Wordmark "Plazi" en font-bold como logo