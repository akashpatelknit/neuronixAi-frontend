import { appConfig } from '@/config/appConfig'
import { apiRequest } from '@/services/apiClient'
import { endpoints } from '@/services/endpoints'
import { mockTasks } from '@/mocks/mockData'
import { asString, unwrapList } from '@/utils/responseUtils'
import { normalizeStatus } from '@/utils/statusUtils'
import type { Paged } from '@/types/common.types'
import type { TaskQuery, TaskSummary } from '../types/task.types'

function toTask(raw: Record<string, unknown>): TaskSummary {
  const agents = raw.agentIds ?? raw.agents
  return {
    id: String(raw.id),
    title: asString(raw.title ?? raw.prompt ?? raw.description) ?? 'Untitled task',
    status: normalizeStatus(raw.status),
    createdAt: asString(raw.createdAt),
    updatedAt: asString(raw.updatedAt ?? raw.createdAt),
    agentIds: Array.isArray(agents) ? agents.map((a) => String(typeof a === 'object' && a ? (a as Record<string, unknown>).id ?? (a as Record<string, unknown>).type : a).toLowerCase()) : [],
    simulated: false,
  }
}

/** Client-side filter/sort/paginate, used for demo data and when the backend returns a plain array. */
export function applyTaskQuery(tasks: TaskSummary[], q: TaskQuery): Paged<TaskSummary> {
  const needle = q.search.trim().toLowerCase()
  let list = tasks.filter((t) => (q.status === 'all' || t.status === q.status) && (!needle || t.title.toLowerCase().includes(needle)))
  list = [...list].sort((a, b) => (q.sort === 'title' ? a.title.localeCompare(b.title) : (b[q.sort] ?? '').localeCompare(a[q.sort] ?? '')))
  const start = (q.page - 1) * q.pageSize
  return { items: list.slice(start, start + q.pageSize), total: list.length, page: q.page, pageSize: q.pageSize }
}

export const taskApi = {
  async list(query: TaskQuery): Promise<Paged<TaskSummary>> {
    if (appConfig.useMockData) return applyTaskQuery(mockTasks, query)
    // Pagination/filter params are sent for backends that support them; the client-side pass keeps the UI correct either way.
    const raw = await apiRequest<unknown>(endpoints.tasks.list, {
      query: { search: query.search, status: query.status === 'all' ? undefined : query.status.toUpperCase(), page: query.page - 1, size: query.pageSize },
    })
    const parsed = unwrapList<Record<string, unknown>>(raw)
    const tasks = parsed.items.map(toTask)
    return Array.isArray(raw) ? applyTaskQuery(tasks, query) : { ...parsed, items: tasks, page: query.page, pageSize: query.pageSize }
  },

  async listRecent(limit = 5): Promise<TaskSummary[]> {
    const result = await taskApi.list({ search: '', status: 'all', sort: 'updatedAt', page: 1, pageSize: limit })
    return result.items
  },
}
