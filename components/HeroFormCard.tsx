'use client'

import { useEffect, useState, Suspense } from 'react'
import { WaitlistForm } from './WaitlistForm'

export function HeroFormCard() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => {})
  }, [])

  const pct = count !== null ? Math.min(Math.round((count / 200) * 100), 100) : 28

  return (
    <div className="form-card" id="form">
      <div className="prog-header">
        <span className="prog-label">Personas apuntadas</span>
        <span className="prog-count">
          <span>{count ?? '…'}</span> y subiendo
        </span>
      </div>
      <div className="prog-bar">
        <div className="prog-fill" style={{ width: `${pct}%` }} />
      </div>
      <Suspense fallback={null}>
        <WaitlistForm />
      </Suspense>
    </div>
  )
}
