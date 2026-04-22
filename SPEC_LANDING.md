# SPEC: Landing plazi.es

## Objetivo
Landing de captación de leads para waitlist. Mobile-first. Una sola página.

## Archivos a crear
- `lib/supabase.ts` — cliente Supabase
- `app/page.tsx` — landing completa
- `app/gracias/page.tsx` — confirmación con enlace referral
- `app/legal/privacidad/page.tsx` — política de privacidad RGPD
- `app/legal/aviso/page.tsx` — aviso legal
- `app/api/waitlist/route.ts` — POST insertar lead
- `app/api/waitlist/count/route.ts` — GET contador
- Actualizar `app/layout.tsx` con meta tags

## Instalar
```bash
npm install @supabase/supabase-js
```

## Secciones de app/page.tsx

**S0 Navbar:** wordmark "Plazi" izquierda. Sin links.

**S1 Hero:**
- H1: "Plazi no es un banco de preguntas. Es el sistema que te lleva a la plaza."
- Subcopy: "Deja de estudiar a ciegas. Plazi te da una ruta hasta el día del examen, recuerda por ti lo que se te olvida, y te muestra en todo momento si vas bien."
- Formulario: Nombre · Email · Convocatoria (pills: C1/C2/Otra) · ¿Cuánto llevas? (pills opcional: "Acabo de empezar"/"6 meses"/"Más de 1 año"/"Ya me presenté")
- CTA: "Consigue acceso anticipado →"
- Contador: fetch /api/waitlist/count → "NNN personas ya en lista"
- Nota: "Sin spam. Sin tarjeta." + link /legal/privacidad

**S2 Badges de confianza (fila horizontal):**
BOE oficial · Exámenes INAP · Turno libre C1/C2 · Gratis para empezar

**S3 Problema:**
- H2: "El problema no es que no estudies suficiente."
- "La mayoría de opositores estudian durante meses sin saber si van bien. Sin un sistema que recuerde por ellos lo que están olvidando. Sin una ruta clara hacia el día del examen. Plazi es esa ruta."

**S4 Solución (3 columnas desktop, stack mobile):**
- Estudia — Preguntas del BOE real, exámenes INAP. Solo lo que entra.
- No olvides — El sistema programa lo que necesitas repasar automáticamente.
- Sabe cómo vas — Cada día sabes qué temas dominas, cuáles flojos, cuánto te queda.

**S5 Diferenciador:**
- H2: "Tests ilimitados. Sin paywall. Sin trampa."
- "Empieza gratis y accede a todos los temas sin límite. El plan de pago existe para quien quiere más — nunca para quitarte lo que ya tienes."

**S6 Historia (itálica, centrada):**
"El problema no es que los opositores no trabajen duro. El problema es que estudian sin saber si van bien. Sin un sistema que recuerde por ellos. Sin una ruta clara hacia el día del examen. Plazi es esa ruta."

**S7 CTA final:**
- H2: "Tu plaza empieza aquí."
- Subcopy: "Únete a la lista. Acceso anticipado gratuito para los primeros."
- Mismo formulario del hero (componente reutilizable `<WaitlistForm />`)

**S8 Footer:**
© 2026 PadaniCloud · Política de privacidad · Aviso legal

## Lógica formulario
- Validación client-side: nombre no vacío, email válido, convocatoria seleccionada
- POST /api/waitlist con { name, email, convocatoria, experience, referral_code }
- referral_code: leer query param ?ref= si existe
- Éxito: redirect /gracias?code=OWN_CODE
- Error duplicado: mostrar "Este email ya está en la lista 🎉"
- Loading state en botón durante submit

## API /api/waitlist (POST)
- own_code: 3 letras nombre + 4 chars random alfanumérico lowercase
- Insertar en waitlist con service role key
- Respuesta éxito: { success: true, own_code }
- Duplicado: { error: 'duplicate' } status 409

## API /api/waitlist/count (GET)
- SELECT COUNT(*) FROM waitlist
- Respuesta: { count: N }
- Revalidate: 60 segundos

## Página /gracias
- Lee ?code= de query params
- "Ya estás dentro."
- Enlace: https://plazi.es/?ref=CODE
- "Comparte con otros opositores. Cada persona que se una gracias a ti sube tu posición."
- Botón copiar enlace
- Link volver al inicio

## Páginas legales
- /legal/privacidad: RGPD España. Responsable PadaniCloud. Datos: nombre, email, convocatoria. Procesador: Supabase. Sin cesión a terceros. Derecho supresión por email.
- /legal/aviso: Titular PadaniCloud, dominio plazi.es, actividad SaaS.

## Meta tags (layout.tsx)
- title: "Plazi — El sistema de estudio para oposiciones AGE"
- description: "Contenido oficial del BOE, exámenes reales del INAP y un sistema que te dice exactamente qué estudiar cada día. Gratis. Turno libre C1 y C2."

## Al terminar
Ejecutar `npm run build`. Corregir cualquier error TypeScript antes de terminar.