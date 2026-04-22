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

export function generateOwnCode(name: string): string {
  const prefix = name.trim().toLowerCase().replace(/[^a-z]/g, '').slice(0, 3).padEnd(3, 'x')
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const random = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return prefix + random
}
