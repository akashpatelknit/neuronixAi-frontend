/**
 * Backend endpoint paths in one place.
 *
 * ASSUMPTION: the Spring Boot repository was not available when this frontend
 * was built, so these paths follow common REST conventions and are NOT verified.
 * If the real controllers differ, change the paths here and the response
 * mapping in the matching feature `*Api.ts` adapter. No component needs to change.
 */
export const endpoints = {
  auth: { login: '/api/auth/login', register: '/api/auth/register' },
  agents: { list: '/api/agents', detail: (id: string) => `/api/agents/${encodeURIComponent(id)}` },
  tasks: { list: '/api/tasks', create: '/api/tasks', detail: (id: string) => `/api/tasks/${encodeURIComponent(id)}` },
  conversations: { list: '/api/conversations', detail: (id: string) => `/api/conversations/${encodeURIComponent(id)}` },
  activity: { list: '/api/activity' },
  documents: { list: '/api/documents', upload: '/api/documents', query: '/api/documents/query' },
} as const
