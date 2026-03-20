'use client'

export default function AdminTable({ users }: { users: any[] }) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden">
      <div className="p-6 border-b border-[#333]">
        <h2 className="text-xl font-medium text-white">Platform Users</h2>
        <p className="text-sm text-zinc-400 mt-1">Manage all students and admins.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-[#2a2a2a] text-xs uppercase font-semibold text-zinc-400 border-b border-[#333]">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Streak</th>
              <th className="px-6 py-4">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-[#333] last:border-0 hover:bg-[#2a2a2a]/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{user.name || 'Unknown'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${user.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${user.plan === 'premium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'}`}>
                      {user.plan || 'free'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.streak_count || 0}</td>
                  <td className="px-6 py-4 text-zinc-400">
                    {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
