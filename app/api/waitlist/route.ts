import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { generateOwnCode } from '@/lib/waitlist'

const CONVOCATORIA_MAP: Record<string, string> = {
  C1: 'C1',
  C2: 'C2',
  Otra: 'otra',
}

const EXPERIENCE_MAP: Record<string, string> = {
  'Acabo de empezar': 'empezando',
  '6 meses': '6meses',
  'Más de 1 año': '1año+',
  'Ya me presenté': 'ya_presentado',
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, convocatoria, experience, referral_code } = body

  if (!name || !email || !convocatoria) {
    return Response.json({ error: 'missing_fields' }, { status: 400 })
  }

  const own_code = generateOwnCode(name)
  const supabase = createServerClient()

  const { error } = await supabase.from('waitlist').insert({
    name,
    email,
    convocatoria: CONVOCATORIA_MAP[convocatoria] ?? convocatoria,
    experience: experience ? (EXPERIENCE_MAP[experience] ?? experience) : null,
    referral_code: referral_code || null,
    own_code,
  })

  if (error) {
    console.error('[waitlist] Supabase INSERT error:', JSON.stringify(error, null, 2))
    if (error.code === '23505') {
      return Response.json({ error: 'duplicate' }, { status: 409 })
    }
    return Response.json({ error: 'server_error' }, { status: 500 })
  }

  return Response.json({ success: true, own_code })
}
