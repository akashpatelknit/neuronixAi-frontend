import { appConfig } from '@/config/appConfig'
import { apiRequest } from '@/services/apiClient'
import { endpoints } from '@/services/endpoints'
import { ApiError } from '@/services/apiErrors'
import { mockLogin, mockRegister } from '@/mocks/mockAuth'
import type { AuthSession, LoginRequest, RegisterRequest } from '../types/auth.types'

interface BackendAuthResponse {
  token?: string
  accessToken?: string
  jwt?: string
  user?: { email?: string; name?: string; username?: string }
  email?: string
  name?: string
}

/** Maps whichever token field the backend uses into our AuthSession. */
function toSession(response: BackendAuthResponse, fallbackEmail: string): AuthSession {
  const token = response.token ?? response.accessToken ?? response.jwt
  if (!token) throw new ApiError('unknown', undefined, 'The server response did not include a session token.')
  return {
    token,
    simulated: false,
    user: {
      email: response.user?.email ?? response.email ?? fallbackEmail,
      name: response.user?.name ?? response.user?.username ?? response.name,
    },
  }
}

export const authApi = {
  async login(request: LoginRequest): Promise<AuthSession> {
    if (appConfig.useMockData) return mockLogin(request)
    const response = await apiRequest<BackendAuthResponse>(endpoints.auth.login, { method: 'POST', body: request, anonymous: true })
    return toSession(response, request.email)
  },

  async register(request: RegisterRequest): Promise<AuthSession | null> {
    if (appConfig.useMockData) return mockRegister(request)
    const response = await apiRequest<BackendAuthResponse | undefined>(endpoints.auth.register, { method: 'POST', body: request, anonymous: true })
    // Some backends return a token on register, others require a separate login.
    return response && (response.token ?? response.accessToken ?? response.jwt) ? toSession(response, request.email) : null
  },
}
