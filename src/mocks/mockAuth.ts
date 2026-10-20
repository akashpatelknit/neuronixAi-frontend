import type { AuthSession, LoginRequest, RegisterRequest } from '@/features/auth/types/auth.types'

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

/** Demo mode only: accepts any credentials and creates a clearly simulated session. */
export async function mockLogin(request: LoginRequest): Promise<AuthSession> {
  await delay()
  return { token: 'demo-session', simulated: true, user: { email: request.email, name: 'Demo user' } }
}

export async function mockRegister(request: RegisterRequest): Promise<AuthSession | null> {
  await delay()
  return { token: 'demo-session', simulated: true, user: { email: request.email, name: 'Demo user' } }
}
