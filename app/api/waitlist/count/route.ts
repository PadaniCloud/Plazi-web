import { getWaitlistCount } from '@/lib/waitlist'

export const revalidate = 60

export async function GET() {
  const count = await getWaitlistCount()
  return Response.json({ count })
}
