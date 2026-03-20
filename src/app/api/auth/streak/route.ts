import { NextResponse } from 'next/server'
import { handleStreakOnLogin } from '@/lib/streak'

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()
    if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 })

    await handleStreakOnLogin(userId)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
