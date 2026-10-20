import type { ApiErrorKind } from '@/types/api.types'

const KIND_BY_STATUS: Record<number, ApiErrorKind> = {
  400: 'bad-request',
  401: 'unauthorized',
  403: 'forbidden',
  404: 'not-found',
  409: 'conflict',
  429: 'rate-limited',
}

const DEFAULT_MESSAGES: Record<ApiErrorKind, string> = {
  'bad-request': 'The request was not valid. Please check your input and try again.',
  unauthorized: 'You are not authorized for this action. Please sign in again.',
  forbidden: 'You do not have permission to do that.',
  'not-found': 'The requested item could not be found.',
  conflict: 'This conflicts with existing data.',
  'rate-limited': 'Too many requests. Please wait a moment and try again.',
  server: 'The server ran into a problem. Please try again shortly.',
  network: 'Cannot reach the NeuronixAI server. Check your connection and the API address.',
  timeout: 'The request took too long. Please try again.',
  unknown: 'Something went wrong. Please try again.',
}

export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status?: number
  /** Safe, backend-provided message (if any). Never a stack trace. */
  readonly serverMessage?: string

  constructor(kind: ApiErrorKind, status?: number, serverMessage?: string) {
    super(serverMessage ?? DEFAULT_MESSAGES[kind])
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
    this.serverMessage = serverMessage
  }
}

/** Pick a short, user-safe message out of a Spring-style error body. */
export function extractServerMessage(body: unknown): string | undefined {
  if (!body || typeof body !== 'object') return undefined
  const record = body as Record<string, unknown>
  for (const key of ['message', 'detail', 'error']) {
    const value = record[key]
    if (typeof value === 'string' && value.trim() && value.length <= 200 && !/\bat [\w$.]+\(/.test(value)) {
      return value.trim()
    }
  }
  return undefined
}

export function apiErrorFromResponse(status: number, body: unknown): ApiError {
  const kind: ApiErrorKind = KIND_BY_STATUS[status] ?? (status >= 500 ? 'server' : 'unknown')
  // Server errors can leak internals, so we only trust messages from 4xx responses.
  const serverMessage = status >= 500 ? undefined : extractServerMessage(body)
  return new ApiError(kind, status, serverMessage)
}

export function defaultMessageFor(kind: ApiErrorKind): string {
  return DEFAULT_MESSAGES[kind]
}
