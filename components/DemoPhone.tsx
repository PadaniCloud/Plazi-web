'use client'

import { useState } from 'react'
import type { DemoQuestion } from '@/lib/waitlist'
import { track } from '@/lib/track'

interface DemoPhoneProps {
  questions: DemoQuestion[]
}

export function DemoPhone({ questions }: DemoPhoneProps) {
  const [qi, setQi] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const q = questions[qi]

  function handleAnswer(idx: number) {
    if (answered) return
    setAnswered(true)
    setSelected(idx)
    if (!localStorage.getItem('demo_started')) {
      localStorage.setItem('demo_started', '1')
      track('demo_started')
    }
  }

  function handleNext() {
    const next = qi + 1
    if (next >= questions.length) {
      if (!localStorage.getItem('demo_completed')) {
        localStorage.setItem('demo_completed', '1')
        track('demo_completed')
      }
      setDone(true)
      return
    }
    setQi(next)
    setAnswered(false)
    setSelected(null)
  }

  if (done) {
    return (
      <div className="phone">
        <div className="phone-bar"><span>9:41</span><span>●●●</span></div>
        <div className="p-header">
          <span className="p-qlabel2">Test oficial</span>
          <span className="p-prog">3 / 3</span>
        </div>
        <div className="p-body" style={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          <div className="p-done">
            <strong style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>¡Demo completada!</strong>
            Apúntate para acceder a +15.000 preguntas reales.
          </div>
        </div>
        <div className="p-nav">
          <div className="p-ni on"><div className="p-ni-ic">🏠</div>Inicio</div>
          <div className="p-ni"><div className="p-ni-ic">📝</div>Test</div>
          <div className="p-ni"><div className="p-ni-ic">📚</div>Temas</div>
          <div className="p-ni"><div className="p-ni-ic">📊</div>Stats</div>
        </div>
      </div>
    )
  }

  return (
    <div className="phone">
      <div className="phone-bar"><span>9:41</span><span>●●●</span></div>
      <div className="p-header">
        <span className="p-qlabel2">Test oficial</span>
        <span className="p-prog">{qi + 1} / {questions.length}</span>
      </div>
      <div className="p-body">
        <div className="p-q">{q.stem}</div>
        <div className="p-opts">
          {q.options.map((opt, idx) => {
            let cls = 'p-opt'
            if (answered) {
              cls += ' locked'
              if (idx === q.correct_index) cls += ' correct'
              else if (idx === selected) cls += ' wrong'
            }
            return (
              <button key={idx} className={cls} onClick={() => handleAnswer(idx)}>
                {String.fromCharCode(65 + idx)}) {opt}
              </button>
            )
          })}
        </div>
        {answered && (
          <div className="p-expl">
            <b>{selected === q.correct_index ? 'Correcto' : 'Incorrecto'}</b>
            {q.law_ref && (
              <div className="p-src"><span className="p-dot" /><span>{q.law_ref}</span></div>
            )}
          </div>
        )}
        {answered && (
          <button className="p-next" onClick={handleNext}>
            {qi + 1 < questions.length ? 'Siguiente pregunta →' : 'Ver resultado →'}
          </button>
        )}
      </div>
      <div className="p-nav">
        <div className="p-ni on"><div className="p-ni-ic">🏠</div>Inicio</div>
        <div className="p-ni"><div className="p-ni-ic">📝</div>Test</div>
        <div className="p-ni"><div className="p-ni-ic">📚</div>Temas</div>
        <div className="p-ni"><div className="p-ni-ic">📊</div>Stats</div>
      </div>
    </div>
  )
}
