import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { waitUntil } from '@vercel/functions'

function generateOwnCode(name: string): string {
  const prefix = name.slice(0, 3).toLowerCase().replace(/[^a-z]/g, 'a')
  const suffix = Math.random().toString(36).slice(2, 6)
  return prefix + suffix
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

  const referralLink = `https://plazi.es/?ref=${own_code}`
  waitUntil(
    fetch('https://oposapp.vercel.app/api/waitlist/send-welcome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}`,
      },
      body: JSON.stringify({ name: cleanName, email: cleanEmail, position, referralLink }),
    }).then(async (res) => {
      if (!res.ok) {
        console.error('[send-welcome] Error:', res.status, await res.text())
      } else {
        console.log('[send-welcome] OK para:', cleanEmail)
      }
    }).catch((err) => {
      console.error('[send-welcome] Fetch failed:', err)
    })
  )

  return Response.json({ success: true, own_code, position }, { status: 201 })
}
