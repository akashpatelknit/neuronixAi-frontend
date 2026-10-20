import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ApiError } from '@/services/apiErrors'
import { getErrorMessage, logDiagnostics } from '@/utils/errorUtils'
import { useAuth } from '../hooks/useAuth'
import { fieldErrors, loginSchema } from '../schemas/authSchemas'
import { PasswordField } from './PasswordField'

export function LoginForm() {
  const { login, sessionExpired } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const parsed = loginSchema.safeParse({ email: data.get('email'), password: data.get('password') })
    if (!parsed.success) return setErrors(fieldErrors(parsed.error))
    setErrors({})
    setFormError(undefined)
    setLoading(true)
    try {
      await login(parsed.data)
      const from = (location.state as { from?: string } | null)?.from
      navigate(from?.startsWith('/app') ? from : '/app', { replace: true })
    } catch (error) {
      logDiagnostics('Login failed', error)
      // On the login call a 401 means wrong credentials, not an expired session.
      setFormError(error instanceof ApiError && error.kind === 'unauthorized' ? 'Incorrect email or password.' : getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {sessionExpired && <p role="status" className="rounded-xl bg-amber-soft p-3 text-sm text-amber-ink">Your session has ended. Please sign in again.</p>}
      {formError && <p role="alert" className="rounded-xl bg-coral-soft p-3 text-sm text-coral-ink">{formError}</p>}
      <Input name="email" type="email" label="Email" autoComplete="email" error={errors.email} />
      <PasswordField name="password" label="Password" autoComplete="current-password" error={errors.password} />
      <Button type="submit" loading={loading} className="w-full">Sign in</Button>
      <p className="text-center text-sm text-ink-soft">New to NeuronixAI? <Link to="/register" className="font-medium text-violet-ink hover:underline">Create an account</Link></p>
    </form>
  )
}
