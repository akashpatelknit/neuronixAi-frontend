import { useAuth } from '@/features/auth/hooks/useAuth'

export function DashboardWelcome() {
  const { session } = useAuth()
  const name = session?.user.name ?? session?.user.email.split('@')[0]
  return (
    <div className="rounded-2xl bg-brand-gradient p-6 text-white shadow-lift">
      <h2 className="text-2xl font-semibold">Welcome{name ? `, ${name}` : ''}</h2>
      <p className="mt-1 max-w-xl text-white/85">Describe the outcome. NeuronixAI coordinates the work.</p>
    </div>
  )
}
