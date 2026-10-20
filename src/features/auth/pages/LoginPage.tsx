import { Navigate } from 'react-router-dom'
import { AuthShell } from '../components/AuthShell'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/app" replace />
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your NeuronixAI workspace.">
      <LoginForm />
    </AuthShell>
  )
}
