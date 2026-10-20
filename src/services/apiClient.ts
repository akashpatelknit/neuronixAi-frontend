import { appConfig } from '@/config/appConfig'
import type { ApiRequestOptions } from '@/types/api.types'
import { ApiError, apiErrorFromResponse } from './apiErrors'

type TokenGetter = () => string | null
type UnauthorizedHandler = () => void

let getToken: TokenGetter = () => null
let onUnauthorized: UnauthorizedHandler = () => {}

/** Called once by the auth provider so the client stays independent of React. */
export function configureApiClient(options: { getToken: TokenGetter; onUnauthorized: UnauthorizedHandler }) {
  getToken = options.getToken
  onUnauthorized = options.onUnauthorized
}

function buildUrl(path: string, query?: ApiRequestOptions['query']): string {
  const url = new URL(`${appConfig.apiBaseUrl}${path}`)
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
    }
  }
  return url.toString()
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined
  const text = await response.text()
  if (!text) return undefined
  try {
    return JSON.parse(text)
  } catch {
    return undefined
  }
}

/** The one place where fetch is called. Feature services go through this. */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  const token = options.anonymous ? null : getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let body: BodyInit | undefined
  if (options.formData) {
    body = options.formData
  } else if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(options.body)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort('timeout'), appConfig.requestTimeoutMs)
  options.signal?.addEventListener('abort', () => controller.abort(options.signal?.reason))

  let response: Response
  try {
    response = await fetch(buildUrl(path, options.query), {
      method: options.method ?? 'GET',
      headers,
      body,
      signal: controller.signal,
    })
  } catch (error) {
    if (controller.signal.aborted && controller.signal.reason === 'timeout') throw new ApiError('timeout')
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiError('network')
  } finally {
    clearTimeout(timeout)
  }

  const parsed = await parseBody(response)
  if (!response.ok) {
    const error = apiErrorFromResponse(response.status, parsed)
    // A 401 on an authenticated call means the session is no longer valid.
    // A 401 on login/register (anonymous) means bad credentials, so it is not treated as expiry.
    if (error.kind === 'unauthorized' && !options.anonymous) onUnauthorized()
    throw error
  }
  return parsed as T
}
