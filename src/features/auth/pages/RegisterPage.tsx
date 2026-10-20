import { Navigate } from 'react-router-dom'
import { AuthShell } from '../components/AuthShell'
import { RegisterForm } from '../components/RegisterForm'
import { useAuth } from '../hooks/useAuth'

export default function RegisterPage() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/app" replace />
  return (
    <AuthShell title="Create your account" subtitle="Start coordinating specialized agents around your goals.">
      <RegisterForm />
    </AuthShell>
  )
}
