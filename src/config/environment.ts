/** Single place where Vite env vars are read. Never read import.meta.env elsewhere. */
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined

export const environment = {
  apiBaseUrl: (rawBaseUrl ?? 'http://localhost:8080').replace(/\/+$/, ''),
  useMockData: String(import.meta.env.VITE_USE_MOCK_DATA ?? 'false').toLowerCase() === 'true',
  isDev: import.meta.env.DEV,
} as const
