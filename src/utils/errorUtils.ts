import { ApiError } from '@/services/apiErrors'

/** User-facing text for any thrown value. Never includes stack traces. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message
  return 'Something went wrong. Please try again.'
}

export function isApiErrorKind(error: unknown, kind: ApiError['kind']): boolean {
  return error instanceof ApiError && error.kind === kind
}

/** Developer diagnostics go to the console in dev only, separate from UI text. */
export function logDiagnostics(context: string, error: unknown) {
  if (import.meta.env.DEV) console.warn(`[NeuronixAI] ${context}`, error)
}
