'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Convocatoria = 'C1' | 'C2'
type TiempoPrep = 'nuevo' | '6m' | '1y' | 'repetidor'

const CONVOCATORIAS: { value: Convocatoria; label: string }[] = [
  { value: 'C2', label: 'C2 · Auxiliar' },
  { value: 'C1', label: 'C1 · Administrativo' },
]

const TIEMPO_PREP: { value: TiempoPrep; label: string }[] = [
  { value: 'nuevo', label: 'Primera vez' },
  { value: '6m', label: 'Llevo ~6 meses' },
  { value: '1y', label: 'Más de 1 año' },
  { value: 'repetidor', label: 'Ya me presenté' },
]

type SuccessData = { position: number; referral_code: string; referral_link: string }

export function WaitlistForm() {
  const searchParams = useSearchParams()
  const referralCode = searchParams.get('ref')

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [convocatoria, setConvocatoria] = useState<Convocatoria | null>(null)
  const [tiempoPrep, setTiempoPrep] = useState<TiempoPrep | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<'duplicate' | 'generic' | null>(null)
  const [success, setSuccess] = useState<SuccessData | null>(null)
  const [copied, setCopied] = useState(false)

  const isValid =
    nombre.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    convocatoria !== null &&
    tiempoPrep !== null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email,
          convocatoria,
          tiempo_prep: tiempoPrep,
          referral_code: referralCode ?? null,
        }),
      })
      const data = await res.json()

      if (res.status === 409) { setError('duplicate'); return }
      if (!res.ok) { setError('generic'); return }

      setSuccess(data)
    } catch {
      setError('generic')
    } finally {
      setLoading(false)
    }
  }

  function copyLink() {
    if (!success) return
    navigator.clipboard.writeText(success.referral_link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  if (success) {
    return (
      <div className="wl-success">
        <div className="wl-pos">#{success.position}</div>
        <p className="wl-title">Ya estás dentro</p>
        <p className="wl-sub">Sube posiciones compartiendo tu enlace. Cada referido suma +10 puntos a tu marcador.</p>
        <div className="wl-ref-box">
          <span className="wl-ref-url">{success.referral_link}</span>
          <button className="wl-copy-btn" onClick={copyLink}>
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>
        <p className="wl-email-note">Te avisaremos cuando abra la beta.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label>Email</label>
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="pills-label">Convocatoria</div>
      <div className="pills">
        {CONVOCATORIAS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`pill${convocatoria === value ? ' active' : ''}`}
            onClick={() => setConvocatoria(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="pills-label">Tiempo preparando</div>
      <div className="pills pills--wrap">
        {TIEMPO_PREP.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`pill${tiempoPrep === value ? ' active' : ''}`}
            onClick={() => setTiempoPrep(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {error === 'duplicate' && (
        <p className="form-dup">Este email ya está en la lista 🎉</p>
      )}
      {error === 'generic' && (
        <p className="form-error">Algo fue mal. Inténtalo de nuevo.</p>
      )}

      <button type="submit" className="btn-cta" disabled={loading || !isValid}>
        {loading ? 'Enviando…' : 'Apuntarme →'}
      </button>
      <p className="form-note">
        Sin spam. Sin tarjeta.{' '}
        <Link href="/legal/privacidad">Política de privacidad</Link>
      </p>
    </form>
  )
}
