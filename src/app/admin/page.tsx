import { getProfile, getUser, signOut } from '@/lib/auth'
import { createServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminTable from '@/components/AdminTable'
import QuestionForm from '@/components/QuestionForm'

export default async function AdminPage() {
  const user = await getUser()
  const profile = await getProfile()

  if (!user || !profile || profile.role !== 'admin') {
    redirect('/login')
  }

  const supabase = await createServer()
  const { data: users } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-[#333]">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Admin Dashboard</h1>
            <p className="text-zinc-400">Manage UPAI.SPACE platform</p>
          </div>
          <form action={async () => {
            'use server'
            await signOut()
            redirect('/login')
          }}>
            <button type="submit" className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors font-medium">
              Sign out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AdminTable users={users || []} />
          </div>
          
          <div className="space-y-8">
            <QuestionForm />
            
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
              <h2 className="text-xl font-medium text-white mb-2">Quick Actions</h2>
              <div className="space-y-3 mt-4">
                <button className="w-full text-left px-4 py-3 bg-[#2a2a2a] hover:bg-[#333] border border-[#444] rounded-lg transition-colors flex items-center justify-between group">
                  <span className="text-zinc-300 font-medium">Manage Subscriptions</span>
                  <span className="text-zinc-500 group-hover:text-white transition-colors">→</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-[#2a2a2a] hover:bg-[#333] border border-[#444] rounded-lg transition-colors flex items-center justify-between group">
                  <span className="text-zinc-300 font-medium">Create Coupon</span>
                  <span className="text-zinc-500 group-hover:text-white transition-colors">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
