'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

type Convocatoria = 'C1' | 'C2' | 'Otra'
type Experience = 'Acabo de empezar' | '6 meses' | 'Más de 1 año' | 'Ya me presenté'

const CONVOCATORIAS: Convocatoria[] = ['C1', 'C2', 'Otra']
const EXPERIENCES: Experience[] = ['Acabo de empezar', '6 meses', 'Más de 1 año', 'Ya me presenté']

export function WaitlistForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const refCode = searchParams.get('ref') ?? ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [convocatoria, setConvocatoria] = useState<Convocatoria | null>(null)
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<'duplicate' | 'generic' | null>(null)

  const isValid = name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && convocatoria !== null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, convocatoria, experience, referral_code: refCode }),
      })
      const data = await res.json()

      if (res.status === 409) {
        setError('duplicate')
        return
      }
      if (!res.ok) {
        setError('generic')
        return
      }

      router.push(`/gracias?code=${data.own_code}`)
    } catch {
      setError('generic')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      />
      <input
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      />

      <fieldset>
        <legend className="text-sm font-medium text-gray-600 mb-2">Convocatoria</legend>
        <div className="flex flex-wrap gap-2">
          {CONVOCATORIAS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setConvocatoria(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
                convocatoria === c
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#3B82F6]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium text-gray-600 mb-2">¿Cuánto llevas? <span className="font-normal text-gray-400">(opcional)</span></legend>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setExperience(experience === ex ? null : ex)}
              className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
                experience === ex
                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#3B82F6]'
              }`}
            >
              {ex}
            </button>
          ))}
        </div>
      </fieldset>

      {error === 'duplicate' && (
        <p className="text-sm text-[#3B82F6] font-medium">Este email ya está en la lista 🎉</p>
      )}
      {error === 'generic' && (
        <p className="text-sm text-red-500">Algo fue mal. Inténtalo de nuevo.</p>
      )}

      <button
        type="submit"
        disabled={loading || !isValid}
        className="w-full rounded-lg bg-[#1E3A8A] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
      >
        {loading ? 'Enviando…' : 'Consigue acceso anticipado →'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Sin spam. Sin tarjeta.{' '}
        <Link href="/legal/privacidad" className="underline hover:text-gray-600">
          Política de privacidad
        </Link>
      </p>
    </form>
  )
}
