import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateOwnCode(name: string): string {
  const prefix = name.slice(0, 3).toLowerCase().replace(/[^a-z]/g, 'a')
  const suffix = Math.random().toString(36).slice(2, 6)
  return prefix + suffix
}

function confirmationHtml(name: string, position: number, own_code: string): string {
  const referralLink = `https://plazi.es/?ref=${own_code}`
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

          <p style="margin:0 0 8px;font-size:16px;color:#111827">Hola ${name},</p>
          <p style="margin:0 0 24px;font-size:16px;color:#111827">
            Ya estás dentro. Eres el <strong style="color:#1E3A8A">#${position}</strong> en la lista.
          </p>

          <p style="margin:0 0 12px;font-size:15px;color:#374151">
            Cada persona que se apunte con tu enlace suma <strong>+10 puntos</strong> a tu marcador:
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
  const { name, email, convocatoria, referral_code } = body

  if (!name?.trim() || !email?.trim() || !convocatoria) {
    return Response.json({ error: 'missing_fields' }, { status: 400 })
  }

  const cleanName = name.trim()
  const cleanEmail = email.toLowerCase().trim()

  console.log('[waitlist] nuevo signup:', cleanEmail, 'referral_code:', referral_code ?? null)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const own_code = generateOwnCode(cleanName)

  const { error: insertError } = await supabase.from('waitlist').insert({
    name: cleanName,
    email: cleanEmail,
    convocatoria,
    referral_code: referral_code || null,
    own_code,
  })

  if (insertError) {
    console.error('[waitlist] ERROR en insert:', insertError.message)
    if (insertError.code === '23505') {
      return Response.json({ error: 'duplicate' }, { status: 409 })
    }
    return Response.json({ error: 'server_error' }, { status: 500 })
  }

  console.log('[waitlist] insert OK:', own_code)

  if (referral_code) {
    const { data: rowsAffected, error: rpcError } = await supabase.rpc('credit_referral', {
      ref_code: referral_code,
    })
    if (rpcError) {
      console.error('[waitlist] ERROR en credit_referral:', rpcError.message)
    } else {
      console.log('[waitlist] credit_referral:', referral_code, '→ filas afectadas', rowsAffected)
    }
  }

  const { count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
    .gt('points', 0)

  const position = (count ?? 0) + 1

  resend.emails
    .send({
      from: 'Plazi <hola@plazi.es>',
      to: cleanEmail,
      subject: `Ya estás en la lista, ${cleanName} 👋`,
      html: confirmationHtml(cleanName, position, own_code),
    })
    .then(() => console.log('[waitlist] email enviado a:', cleanEmail))
    .catch((err) => console.error('[waitlist] ERROR en email:', err))

  return Response.json({ success: true, own_code, position }, { status: 201 })
}
