import AuthForm from '@/components/AuthForm'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-zinc-100 p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">UPAI.SPACE</h1>
        <p className="text-zinc-400">Join the ultimate interview prep platform</p>
      </div>

      <AuthForm type="signup" />

      <p className="mt-6 text-sm text-zinc-400">
        Already have an account?{' '}
        <Link href="/login" className="text-zinc-200 hover:text-white underline underline-offset-4">
          Login
        </Link>
      </p>
    </div>
  )
}
