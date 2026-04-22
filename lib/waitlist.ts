import { unstable_cache } from 'next/cache'
import { createServerClient } from './supabase'

export const getWaitlistCount = unstable_cache(
  async () => {
    const supabase = createServerClient()
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
    return count ?? 0
  },
  ['waitlist-count'],
  { revalidate: 60 }
)

export type DemoQuestion = {
  stem: string
  options: string[]
  correct_index: number
  law_ref: string | null
}

const FALLBACK_QUESTIONS: DemoQuestion[] = [
  {
    stem: '¿Quiénes tienen derecho a participar en los asuntos públicos, directamente o por medio de representantes?',
    options: ['Solo mayores de 25 años', 'Los ciudadanos españoles', 'Todos los residentes legales en España', 'Los electores inscritos en el censo'],
    correct_index: 1,
    law_ref: 'Constitución Española · Art. 23.1 · BOE 29/12/1978',
  },
  {
    stem: '¿Cuál de los siguientes NO es un derecho individual del empleado público según el EBEP?',
    options: ['A la inamovilidad en la condición de funcionario', 'Al desempeño efectivo de las funciones', 'A la negociación colectiva sin ningún límite', 'A la formación continua y actualización permanente'],
    correct_index: 2,
    law_ref: 'EBEP (RDL 5/2015) · Art. 14 · BOE 31/10/2015',
  },
  {
    stem: '¿Cuál es el plazo máximo para resolver y notificar cuando la ley no establece uno específico?',
    options: ['1 mes', '3 meses', '6 meses', '12 meses'],
    correct_index: 1,
    law_ref: 'Ley 39/2015 LPAC · Art. 21.3 · BOE 02/10/2015',
  },
]

export const getHeroQuestions = unstable_cache(
  async (): Promise<DemoQuestion[]> => {
    try {
      const supabase = createServerClient()
      const { data, error } = await supabase
        .from('historical_questions')
        .select('stem, options, correct_index, law_ref')
        .not('topic_id', 'is', null)
        .order('id')
        .limit(3)
      if (error || !data || data.length < 3) return FALLBACK_QUESTIONS
      return data.map((row) => ({
        stem: row.stem as string,
        options: Array.isArray(row.options) ? row.options as string[] : [],
        correct_index: row.correct_index as number,
        law_ref: row.law_ref as string | null,
      }))
    } catch {
      return FALLBACK_QUESTIONS
    }
  },
  ['hero-questions'],
  { revalidate: 3600 }
)

export function generateOwnCode(name: string): string {
  const prefix = name.trim().toLowerCase().replace(/[^a-z]/g, '').slice(0, 3).padEnd(3, 'x')
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const random = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return prefix + random
}
