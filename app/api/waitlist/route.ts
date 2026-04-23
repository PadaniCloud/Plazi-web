import { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { createServerClient } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

const VALID_CONVOCATORIA = ['C1', 'C2'] as const
const VALID_TIEMPO_PREP = ['nuevo', '6m', '1y', 'repetidor'] as const

function confirmationHtml(nombre: string, position: number, referralLink: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Ya estás en la lista — Plazi</title>
</head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb">
    <tr><td align="center" style="padding:48px 16px">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb">
        <tr><td style="padding:40px 36px">

          <p style="margin:0 0 32px;font-size:22px;font-weight:700;color:#1E3A8A;letter-spacing:-0.5px">Plazi</p>

          <p style="margin:0 0 8px;font-size:16px;color:#111827">Hola ${nombre},</p>
          <p style="margin:0 0 24px;font-size:16px;color:#111827">
            Ya estás dentro. Eres el <strong style="color:#1E3A8A">#${position}</strong> en la lista.
          </p>

          <p style="margin:0 0 12px;font-size:15px;color:#374151">
            Cada persona que se apunte con tu enlace suma <strong>+10 puntos</strong> a tu marcador. Los puestos que subes dependen de cuánta gente tienes por delante:
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px">
            <tr><td style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;padding:14px 16px">
              <a href="${referralLink}" style="color:#1E3A8A;font-size:14px;font-weight:600;word-break:break-all;text-decoration:none">${referralLink}</a>
            </td></tr>
          </table>

          <p style="margin:0 0 32px;font-size:14px;color:#6b7280;line-height:1.6">
            Te avisaremos cuando abra el acceso anticipado. Mientras tanto, comparte tu enlace con otros opositores.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e5e7eb">
            <tr><td style="padding-top:24px">
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center">
                © 2026 PadaniCloud ·
                <a href="https://plazi.es" style="color:#9ca3af;text-decoration:underline">plazi.es</a> ·
                <a href="mailto:hola@plazi.es?subject=Darme de baja" style="color:#9ca3af;text-decoration:underline">Darte de baja</a>
              </p>
            </td></tr>
          </table>

        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { nombre, email, convocatoria, tiempo_prep, referral_code } = body

  if (!nombre?.trim() || !email?.trim() || !convocatoria || !tiempo_prep) {
    return Response.json({ error: 'missing_fields' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'invalid_email' }, { status: 400 })
  }

  if (!VALID_CONVOCATORIA.includes(convocatoria)) {
    return Response.json({ error: 'invalid_convocatoria' }, { status: 400 })
  }

  if (!VALID_TIEMPO_PREP.includes(tiempo_prep)) {
    return Response.json({ error: 'invalid_tiempo_prep' }, { status: 400 })
  }

  const normalizedEmail = email.toLowerCase().trim()
  const normalizedNombre = nombre.trim()
  const supabase = createServerClient()

  const { data: inserted, error } = await supabase
    .from('waitlist')
    .insert({
      name: normalizedNombre,
      email: normalizedEmail,
      convocatoria,
      experience: tiempo_prep,
      referral_code: referral_code || null,
    })
    .select('own_code, points, created_at')
    .single()

  if (error) {
    console.error('[waitlist] INSERT error:', error.code, error.message)
    if (error.code === '23505') {
      return Response.json({ error: 'duplicate' }, { status: 409 })
    }
    return Response.json({ error: 'server_error' }, { status: 500 })
  }

  // Credit the referrer atomically. Failure is silent — the insert already
  // succeeded and must not be rolled back.
  console.log('[waitlist] referral_code recibido:', referral_code)
  if (referral_code) {
    const { data, error: updateError } = await supabase.rpc(
      'credit_referral',
      { ref_code: referral_code }
    )
    console.log('[waitlist] rpc result:', JSON.stringify({ data, error: updateError }))
  }

  // RANK() OVER (ORDER BY points DESC, created_at ASC):
  // count rows that rank ahead = rows with more points, or same points and earlier created_at
  const { count: ahead } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
    .or(
      `points.gt.${inserted.points},and(points.eq.${inserted.points},created_at.lt.${inserted.created_at})`
    )

  const position = (ahead ?? 0) + 1
  const own_code = inserted.own_code
  const referral_link = `https://plazi.es/?ref=${own_code}`

  resend.emails
    .send({
      from: 'Plazi <hola@plazi.es>',
      to: normalizedEmail,
      subject: `Ya estás en la lista, ${normalizedNombre} 👋`,
      html: confirmationHtml(normalizedNombre, position, referral_link),
    })
    .then((result) => console.log('[waitlist] Resend result:', JSON.stringify(result)))
    .catch((err) => console.error('[waitlist] Resend error:', err))

  return Response.json({ position, referral_code: own_code, referral_link }, { status: 201 })
}
