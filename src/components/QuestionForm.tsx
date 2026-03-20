'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function QuestionForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    difficulty: 'Easy',
    solution: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const { error } = await supabase.from('questions').insert([formData])
      if (error) throw error
      
      setSuccess(true)
      setFormData({
        title: '',
        description: '',
        company: '',
        difficulty: 'Easy',
        solution: ''
      })
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      alert(err.message || 'Error creating question')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-white mb-2">Create New Question</h2>
        <p className="text-sm text-zinc-400">Add a new interview question to the platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-zinc-100 focus:outline-none focus:border-indigo-500"
            placeholder="Reverse a Linked List"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-zinc-100 focus:outline-none focus:border-indigo-500"
            placeholder="Given the head of a singly linked list..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-zinc-100 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Google, Meta"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-zinc-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Solution</label>
          <textarea
            required
            rows={4}
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
            className="w-full px-3 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-zinc-100 focus:outline-none focus:border-indigo-500 font-mono text-sm"
            placeholder="Code solution or explanation..."
          />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Create Question'}
          </button>
          
          {success && (
            <span className="text-sm font-medium text-green-400 bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20">
              Question created successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
