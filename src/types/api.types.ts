export type ApiErrorKind =
  | 'bad-request'
  | 'unauthorized'
  | 'forbidden'
  | 'not-found'
  | 'conflict'
  | 'rate-limited'
  | 'server'
  | 'network'
  | 'timeout'
  | 'unknown'

export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  formData?: FormData
  query?: Record<string, string | number | boolean | undefined>
  /** Skip attaching the bearer token (login/register). */
  anonymous?: boolean
  signal?: AbortSignal
}
