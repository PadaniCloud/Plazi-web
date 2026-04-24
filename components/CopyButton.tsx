'use client'

import { useState } from 'react'

export function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        background: 'var(--color-accent)',
        color: 'var(--color-accent-text)',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 16px',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'var(--transition)',
        fontFamily: 'var(--font-heading)',
      }}
    >
      {copied ? '¡Copiado!' : 'Copiar'}
    </button>
  )
}
