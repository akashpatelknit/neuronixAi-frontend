import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ApiError } from '@/services/apiErrors'
import { getErrorMessage, logDiagnostics } from '@/utils/errorUtils'
import { useAuth } from '../hooks/useAuth'
import { fieldErrors, registerSchema } from '../schemas/authSchemas'
import { FormField } from './FormField'
import { Loader2 } from 'lucide-react'
import { PasswordField } from './PasswordField'

export function RegisterForm() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string>()
  const [created, setCreated] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const parsed = registerSchema.safeParse({ email: data.get('email'), password: data.get('password'), confirmPassword: data.get('confirmPassword') })
    if (!parsed.success) return setErrors(fieldErrors(parsed.error))
    setErrors({})
    setFormError(undefined)
    setLoading(true)
    try {
      const signedIn = await register({ email: parsed.data.email, password: parsed.data.password })
      if (signedIn) navigate('/app', { replace: true })
      else setCreated(true)
    } catch (error) {
      logDiagnostics('Registration failed', error)
      setFormError(error instanceof ApiError && error.kind === 'conflict' ? 'An account with this email already exists.' : getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  if (created) {
    return (
      <div role="status" className="space-y-3 text-center">
        <p className="font-semibold text-mint-ink">Account created</p>
        <p className="text-sm text-ink-soft">You can now sign in with your new account.</p>
        <Link to="/login" className="inline-block font-medium text-violet-ink hover:underline">Go to sign in</Link>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {formError && <p role="alert" className="rounded-xl bg-coral-soft p-3 text-sm text-coral-ink">{formError}</p>}
      <FormField name="email" type="email" label="Email" autoComplete="email" error={errors.email} />
      <PasswordField name="password" label="Password" autoComplete="new-password" hint="At least 8 characters." error={errors.password} />
      <PasswordField name="confirmPassword" label="Confirm password" autoComplete="new-password" error={errors.confirmPassword} />
      <Button type="submit" disabled={loading} className="h-11 w-full bg-brand-gradient">{loading && <Loader2 className="animate-spin" />}Create account</Button>
      <p className="text-center text-sm text-ink-soft">Already have an account? <Link to="/login" className="font-medium text-violet-ink hover:underline">Sign in</Link></p>
    </form>
  )
}
