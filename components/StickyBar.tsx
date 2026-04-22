'use client'

import { useEffect, useState } from 'react'

export function StickyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const form = document.getElementById('form')
    if (!form) return
    const obs = new IntersectionObserver(
      (entries) => setVisible(!entries[0].isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(form)
    return () => obs.disconnect()
  }, [])

  function scrollToForm() {
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`sticky-bar${visible ? ' visible' : ''}`}>
      <button onClick={scrollToForm}>
        Apuntarme — acceso completo gratis al lanzar →
      </button>
    </div>
  )
}
