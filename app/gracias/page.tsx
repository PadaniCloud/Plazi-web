'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function GraciasContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code') ?? ''
  const referralUrl = `https://plazi.es/?ref=${code}`
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full flex flex-col gap-6">
        <div>
          <span className="text-5xl font-bold text-[#1E3A8A]">Plazi</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-[#1E3A8A]">Ya estás dentro.</h1>
          <p className="mt-3 text-lg text-gray-600">
            Te avisaremos cuando abra el acceso anticipado.
          </p>
        </div>

        {code && (
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 flex flex-col gap-4">
            <p className="text-base font-medium text-gray-700">
              Comparte con otros opositores. Cada persona que se una gracias a ti sube tu posición.
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
              <span className="flex-1 truncate text-sm text-gray-500">{referralUrl}</span>
            </div>
            <button
              onClick={handleCopy}
              className="w-full rounded-lg bg-[#1E3A8A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1e40af]"
            >
              {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
            </button>
          </div>
        )}

        <Link href="/" className="text-sm text-[#3B82F6] hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default function GraciasPage() {
  return (
    <Suspense fallback={null}>
      <GraciasContent />
    </Suspense>
  )
}
