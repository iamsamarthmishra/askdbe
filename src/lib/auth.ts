import { createServer } from './supabase/server'

export async function getUser() {
  const supabase = await createServer()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getProfile() {
  const user = await getUser()
  if (!user) return null

  const supabase = await createServer()
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

export async function signOut() {
  const supabase = await createServer()
  await supabase.auth.signOut()
}
