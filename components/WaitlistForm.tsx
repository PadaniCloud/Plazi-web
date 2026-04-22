'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type Convocatoria = 'C1' | 'C2' | 'Otra'
const CONVOCATORIAS: { value: Convocatoria; label: string }[] = [
  { value: 'C2', label: 'C2 · Auxiliar' },
  { value: 'C1', label: 'C1 · Administrativo' },
  { value: 'Otra', label: 'Otra' },
]

export function WaitlistForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const refCode = searchParams.get('ref') ?? ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [convocatoria, setConvocatoria] = useState<Convocatoria | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<'duplicate' | 'generic' | null>(null)

  const isValid =
    name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    convocatoria !== null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setLoading(true)
    setError(null)

    const demo_completed =
      typeof window !== 'undefined' ? localStorage.getItem('demo_completed') ?? undefined : undefined

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, convocatoria, referral_code: refCode, demo_completed }),
      })
      const data = await res.json()

      if (res.status === 409) { setError('duplicate'); return }
      if (!res.ok) { setError('generic'); return }

      router.push(`/gracias?code=${data.own_code}`)
    } catch {
      setError('generic')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            style={value === 'Otra' ? { flex: 'none', minWidth: 62 } : undefined}
            onClick={() => setConvocatoria(value)}
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
