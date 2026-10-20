export interface AuthUser {
  email: string
  name?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface AuthSession {
  token: string
  user: AuthUser
  /** True when the session comes from demo mode, not the real backend. */
  simulated: boolean
}
