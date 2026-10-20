import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { appConfig } from '@/config/appConfig'
import { configureApiClient } from '@/services/apiClient'
import { authApi } from '../services/authApi'
import type { AuthSession, LoginRequest, RegisterRequest } from '../types/auth.types'

interface AuthContextValue {
  session: AuthSession | null
  isAuthenticated: boolean
  sessionExpired: boolean
  login: (request: LoginRequest) => Promise<void>
  /** Returns true when registration also signed the user in. */
  register: (request: RegisterRequest) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(appConfig.authTokenStorageKey)
    return raw ? (JSON.parse(raw) as AuthSession) : null
  } catch {
    return null
  }
}

function storeSession(session: AuthSession | null) {
  try {
    if (session) sessionStorage.setItem(appConfig.authTokenStorageKey, JSON.stringify(session))
    else sessionStorage.removeItem(appConfig.authTokenStorageKey)
  } catch {
    /* storage unavailable: the session simply lasts until reload */
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // sessionStorage (not localStorage) limits how long the token lingers on the device.
  const [session, setSession] = useState<AuthSession | null>(readStoredSession)
  const [sessionExpired, setSessionExpired] = useState(false)

  const clear = useCallback(() => {
    storeSession(null)
    setSession(null)
  }, [])

  // Configured during first render (idempotent) so child queries never run before the token getter exists.
  useState(() => {
    configureApiClient({
      getToken: () => readStoredSession()?.token ?? null,
      onUnauthorized: () => {
        storeSession(null)
        setSession(null)
        setSessionExpired(true)
      },
    })
  })

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: session !== null,
      sessionExpired,
      async login(request) {
        const next = await authApi.login(request)
        storeSession(next)
        setSessionExpired(false)
        setSession(next)
      },
      async register(request) {
        const next = await authApi.register(request)
        if (!next) return false
        storeSession(next)
        setSession(next)
        return true
      },
      logout: clear,
    }),
    [session, sessionExpired, clear],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
