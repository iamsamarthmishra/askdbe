import { createServer } from './supabase/server'

export async function handleStreakOnLogin(userId: string) {
  const supabase = await createServer()

  // Fetch the user's current profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('streak_count, last_login')
    .eq('id', userId)
    .single()

  if (error || !profile) return

  const todayStr = new Date().toISOString().split('T')[0]
  const lastLoginStr = profile.last_login ? new Date(profile.last_login).toISOString().split('T')[0] : null

  if (todayStr === lastLoginStr) {
    // Already logged in today, no change
    return
  }

  let newStreak = profile.streak_count || 0

  if (lastLoginStr) {
    const today = new Date(todayStr)
    const lastLogin = new Date(lastLoginStr)
    const diffTime = Math.abs(today.getTime() - lastLogin.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      newStreak += 1
    } else {
      newStreak = 1
    }
  } else {
    newStreak = 1
  }

  // Update profile
  await supabase
    .from('profiles')
    .update({ 
      streak_count: newStreak,
      last_login: todayStr
    })
    .eq('id', userId)
}
