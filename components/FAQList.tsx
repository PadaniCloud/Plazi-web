'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: '¿Es gratis de verdad?',
    a: 'Sí. El acceso a todos los tests y temarios es gratuito sin límite de tiempo ni de preguntas. No se requiere tarjeta. Las funcionalidades avanzadas nunca restringen los tests básicos.',
  },
  {
    q: '¿Para qué oposición sirve?',
    a: 'Para las oposiciones AGE en turno libre: C2 Auxiliar Administrativo del Estado y C1 Administrativo del Estado. Contenido del BOE oficial y exámenes históricos del INAP.',
  },
  {
    q: '¿Qué incluye el acceso anticipado?',
    a: 'Todos los apuntados ahora tendrán acceso completo desde el primer día que lancemos. Los primeros 100 del ranking lo mantienen gratis hasta su próximo examen. El resto pasa al plan gratuito ilimitado en tests.',
  },
  {
    q: '¿Tengo que dejar mi academia?',
    a: 'No. Plazi es complementario a cualquier academia o temario. Se encarga del repaso sistemático y la dirección diaria. Puedes combinarlo sin problema.',
  },
  {
    q: '¿Cuándo se puede empezar a usar?',
    a: 'El acceso anticipado para los de la lista abre en verano de 2026. El lanzamiento público está previsto para septiembre de 2026. Los de la lista serán avisados por email.',
  },
]

export function FAQList() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="faq-list">
      {FAQS.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
            {item.q}
            <span className="faq-arrow">+</span>
          </button>
          <div className="faq-a">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
