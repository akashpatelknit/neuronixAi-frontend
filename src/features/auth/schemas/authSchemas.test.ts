import { describe, expect, it } from 'vitest'
import { loginSchema, registerSchema } from './authSchemas'

describe('authSchemas', () => {
  it('rejects invalid email on login', () => {
    expect(loginSchema.safeParse({ email: 'nope', password: 'x' }).success).toBe(false)
  })
  it('requires matching passwords on register', () => {
    const result = registerSchema.safeParse({ email: 'a@b.co', password: 'longenough', confirmPassword: 'different' })
    expect(result.success).toBe(false)
  })
  it('accepts valid registration', () => {
    expect(registerSchema.safeParse({ email: 'a@b.co', password: 'longenough', confirmPassword: 'longenough' }).success).toBe(true)
  })
})
