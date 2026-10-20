import { z } from 'zod'

const email = z.string().trim().min(1, 'Email is required').email('Enter a valid email address')

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
})

/** Minimum length only: the backend's real password policy is not known, so we do not invent more rules. */
export const registerSchema = z
  .object({
    email,
    password: z.string().min(8, 'Use at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((v) => v.password === v.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match' })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!result[key]) result[key] = issue.message
  }
  return result
}
