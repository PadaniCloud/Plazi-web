'use client'

import { useEffect } from 'react'
import { track } from '@/lib/track'

export function Analytics() {
  useEffect(() => {
    const marks = { 50: false, 75: false }
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const pct = Math.round((window.scrollY / scrollable) * 100)
      if (pct >= 50 && !marks[50]) { marks[50] = true; track('scroll_50') }
      if (pct >= 75 && !marks[75]) { marks[75] = true; track('scroll_75') }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const ctaButtons = document.querySelectorAll('.btn-cta, .btn-inline')
    ctaButtons.forEach((b) => {
      b.addEventListener('click', () => {
        const label = b.closest('#form') ? 'hero' : b.closest('.cta-box') ? 'final' : 'banner'
        track('cta_click', { label })
      })
    })

    document.querySelector('.btn-eb')?.addEventListener('click', () => track('early_bird_click'))

    let formTouched = false
    document.querySelectorAll('.field input').forEach((i) => {
      i.addEventListener('focus', () => {
        if (!formTouched) { formTouched = true; track('form_focus') }
      }, { once: true })
    })

    return () => { window.removeEventListener('scroll', onScroll) }
  }, [])

  return null
}
