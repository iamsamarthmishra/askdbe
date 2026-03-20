'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface AuthFormProps {
  type: 'login' | 'signup'
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Admin bypass logic
      let actualEmail = email.trim()
      let isAdminBypass = false

      if (actualEmail.includes('#admin')) {
        isAdminBypass = true
        actualEmail = actualEmail.replace('#admin', '') // Use their real email so they can confirm it!
      } else if (actualEmail === 'knpaisp') {
        isAdminBypass = true
        actualEmail = 'knpaisp_admin2@upai.space' // Changed slightly to avoid rate limit, but STILL FAILS if Email Confirm is ON
      }

      if (type === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: actualEmail,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        })
        if (signUpError) throw signUpError

        if (data.session || isAdminBypass) {
          // They are logged in immediately (email confirm is off, or it's admin cheat code)
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user!.id,
              name: isAdminBypass ? 'Admin User' : name,
              role: isAdminBypass ? 'admin' : 'student',
              streak_count: 0,
              last_login: new Date().toISOString()
            })
          
          if (profileError && profileError.code !== '23505') {
            console.error('Profile creation error:', profileError)
          }

          router.push(isAdminBypass ? '/admin' : '/dashboard')
          router.refresh()
        } else if (data.user) {
          // Session is null -> email confirmation is required
          setError('Signup successful! Please check your email to confirm your account before logging in.')
        } else {
           throw new Error('An unknown error occurred during signup.')
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: actualEmail,
          password,
        })
        
        // Auto-create Admin if doesn't exist upon login using the cheat code
        if (signInError && isAdminBypass && signInError.message.includes('Invalid login credentials')) {
           const { data: signUpData, error: autoSignUpErr } = await supabase.auth.signUp({
              email: actualEmail,
              password,
           })
           if (autoSignUpErr) throw autoSignUpErr
           if (!signUpData.user) throw new Error('Auto Admin setup failed')
           
           await supabase.from('profiles').insert({
              id: signUpData.user.id,
              name: 'Admin (' + email.replace('#admin', '') + ')',
              role: 'admin',
              streak_count: 0,
              last_login: new Date().toISOString()
           })
           router.push('/admin')
           router.refresh()
           return
        } else if (signInError) {
           throw signInError
        }
        
        // Handle Profile Creation if missing
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('id', data.user.id)
          .single()

        if (!profile) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            name: data.user.user_metadata?.full_name || actualEmail.split('@')[0],
            role: isAdminBypass ? 'admin' : 'student',
            streak_count: 0,
            last_login: new Date().toISOString()
          })
        } else if (isAdminBypass && profile.role !== 'admin') {
           // Upgrade existing to admin if they used cheat code
           await supabase.from('profiles').update({ role: 'admin' }).eq('id', data.user.id)
        }

        await fetch('/api/auth/streak', { method: 'POST', body: JSON.stringify({ userId: data.user.id }) }).catch(() => {})
        
        router.push(isAdminBypass || profile?.role === 'admin' ? '/admin' : '/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-medium text-zinc-100">
          {type === 'login' ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          {type === 'login' ? 'Enter your details to sign in' : 'Start your interview prep today'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
              placeholder="J. Oppenheimer"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Email or Admin ID</label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
            placeholder={type === 'login' ? 'name@example.com or ID#admin' : 'name@example.com'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500 transition-colors"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="text-sm text-red-500 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-zinc-100 text-zinc-900 rounded-lg font-medium hover:bg-white transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}
