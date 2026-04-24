import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerClient } from '@/lib/supabase'
import { CopyButton } from '@/components/CopyButton'

function truncateName(name: string): string {
  return name.slice(0, 3) + '***'
}

const card: React.CSSProperties = {
  background: 'var(--color-bg-overlay)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: '24px',
  marginBottom: '16px',
}

const labelUppercase: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--color-text-muted)',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>
}) {
  const { code } = await searchParams
  if (!code) redirect('/')

  const supabase = createServerClient()

  // 1. Datos del usuario
  const { data: user } = await supabase
    .from('waitlist')
    .select('name, points, referral_count, own_code, created_at')
    .eq('own_code', code)
    .single()

  if (!user) redirect('/')

  // 2. Posición en el ranking
  const { count: aheadCount } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
    .or(
      `points.gt.${user.points},and(points.eq.${user.points},created_at.lt.${user.created_at})`
    )

  const position = (aheadCount ?? 0) + 1

  // 3. Total apuntados
  const { count: total } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  // 4. Vecinos en el leaderboard (2 arriba + usuario + 2 abajo)
  const rangeStart = Math.max(0, position - 3) // 0-indexed
  const rangeEnd = position + 1               // 0-indexed

  const { data: neighborsRaw } = await supabase
    .from('waitlist')
    .select('name, points, own_code')
    .order('points', { ascending: false })
    .order('created_at', { ascending: true })
    .range(rangeStart, rangeEnd)

  const neighbors = (neighborsRaw ?? []).map((row, i) => ({
    ...row,
    pos: rangeStart + 1 + i,
  }))

  const isTop100 = position <= 100
  const referralUrl = `https://plazi.es/?ref=${user.own_code}`

  const waText = encodeURIComponent(
    `Oye, estoy preparando la oposición AGE con Plazi. Lista de espera gratis, acceso completo para los primeros: ${referralUrl}`
  )
  const xText = encodeURIComponent(
    `Preparando la oposición AGE con método. Lista de espera abierta en plazi.es: ${referralUrl}`
  )

  return (
    <div style={{ background: 'var(--color-bg-primary)', minHeight: '100vh' }}>

      {/* Nav */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.5px',
        }}>
          plazi
        </span>
        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          Acceso anticipado · verano 2026
        </span>
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 64px' }}>

        {/* S1 — Confirmación */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--color-accent-bg)',
            border: '1px solid var(--color-accent-border)',
            borderRadius: 'var(--radius-pill)',
            padding: '6px 14px',
            marginBottom: '20px',
          }}>
            <div className="pulse" style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--color-accent)',
              flexShrink: 0,
            }} />
            <span style={{ fontSize: '12px', color: 'var(--color-accent)', fontWeight: 500 }}>
              Ya estás dentro
            </span>
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: '0 0 8px',
            lineHeight: 1.2,
            fontFamily: 'var(--font-heading)',
          }}>
            Bienvenido, {user.name}.
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', margin: 0 }}>
            Te avisaremos en cuanto abra el acceso anticipado.
          </p>
        </div>

        {/* S2 — Posición */}
        <div style={card}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <span style={labelUppercase}>Tu posición</span>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              de {total ?? '—'} apuntados
            </span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: isTop100 ? '0' : '16px' }}>
            <div style={{
              fontSize: '64px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              lineHeight: 1,
              marginBottom: '8px',
              fontFamily: 'var(--font-heading)',
            }}>
              #{position}
            </div>
            {isTop100 ? (
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
                Llevas{' '}
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                  {100 - position} posiciones de ventaja
                </span>
                . Comparte para mantenerla cuando se apunte más gente.
              </p>
            ) : (
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: 0 }}>
                Te faltan{' '}
                <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>
                  {position - 100} posiciones
                </span>
                {' '}para el top 100.
              </p>
            )}
          </div>

          {!isTop100 && (
            <div style={{
              background: 'var(--color-warning-bg)',
              border: '1px solid var(--color-warning-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              textAlign: 'center',
              marginTop: '16px',
            }}>
              <p style={{ fontSize: '12px', color: 'var(--color-warning)', margin: 0, lineHeight: 1.5 }}>
                El top 100 mantiene acceso completo gratis en septiembre.
                El resto pasa al plan gratuito de tests ilimitados para siempre.
              </p>
            </div>
          )}
        </div>

        {/* S3 — Leaderboard */}
        <div style={card}>
          <div style={{ ...labelUppercase, marginBottom: '16px' }}>Ranking</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {neighbors.map((row) => {
              const isMe = row.own_code === user.own_code
              return (
                <div
                  key={row.own_code}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: isMe ? 'var(--color-rank-self-bg)' : 'transparent',
                    border: `1px solid ${isMe ? 'var(--color-rank-self-border)' : 'transparent'}`,
                  }}
                >
                  <span style={{
                    fontSize: '13px',
                    color: isMe ? 'var(--color-rank-self-text)' : 'var(--color-text-muted)',
                    fontWeight: isMe ? 600 : 400,
                    width: '28px',
                    flexShrink: 0,
                  }}>
                    #{row.pos}
                  </span>
                  <span style={{
                    fontSize: '14px',
                    color: isMe ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    fontWeight: isMe ? 500 : 400,
                    flex: 1,
                  }}>
                    {truncateName(row.name)}
                    {isMe && (
                      <span style={{
                        fontSize: '11px',
                        background: 'var(--color-accent-bg)',
                        color: 'var(--color-rank-self-text)',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        marginLeft: '6px',
                        fontWeight: 600,
                      }}>
                        Tú
                      </span>
                    )}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: isMe ? 'var(--color-rank-self-text)' : 'var(--color-text-muted)',
                    fontWeight: isMe ? 600 : 400,
                  }}>
                    {row.points} pts
                  </span>
                </div>
              )
            })}
          </div>

          <div style={{
            borderTop: '1px solid var(--color-border)',
            marginTop: '16px',
            paddingTop: '14px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
              Cada referido te da{' '}
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>+10 puntos</span>
              {' '}y te sube posiciones.
            </p>
          </div>
        </div>

        {/* S4 — Compartir */}
        <div style={card}>
          <div style={{ ...labelUppercase, marginBottom: '6px' }}>Comparte y sube</div>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0 0 16px' }}>
            Cada persona que se apunte con tu enlace te da +10 puntos.
          </p>

          {/* URL + botón copiar */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{
              flex: 1,
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {referralUrl}
            </div>
            <CopyButton url={referralUrl} />
          </div>

          {/* Botones de compartir */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <a
              href={`https://wa.me/?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: 'var(--color-accent-bg)',
                border: '1px solid var(--color-accent-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px',
                fontSize: '13px',
                color: 'var(--color-accent)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            <a
              href={`https://x.com/intent/tweet?text=${xText}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X / Twitter
            </a>
          </div>
        </div>

        {/* S5 — Info */}
        <div style={{
          background: 'var(--color-bg-overlay)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '20px 24px',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              'Te hemos enviado un email con este enlace para no perderlo.',
              'En verano te avisaremos cuando abra el acceso anticipado.',
              'Cuantos más apuntes antes del lanzamiento, mejor posición final.',
            ].map((text) => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                  }} />
                </div>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            style={{ fontSize: '13px', color: 'var(--color-text-muted)', textDecoration: 'none' }}
          >
            ← Volver al inicio
          </Link>
          <span style={{ color: 'var(--color-border-strong)', margin: '0 12px' }}>·</span>
          <Link
            href="/legal/privacidad"
            style={{ fontSize: '13px', color: 'var(--color-text-muted)', textDecoration: 'none' }}
          >
            Política de privacidad
          </Link>
        </div>

      </div>
    </div>
  )
}
