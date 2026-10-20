import { appConfig } from '@/config/appConfig'
import { apiRequest } from '@/services/apiClient'
import { endpoints } from '@/services/endpoints'
import { mockActivity } from '@/mocks/mockData'
import { asString, unwrapList } from '@/utils/responseUtils'
import type { ActivityEvent, ActivityType } from '../types/activity.types'

const KNOWN: ActivityType[] = ['task-created', 'agent-started', 'agent-completed', 'tool-executed', 'execution-failed', 'task-completed']

function toEvent(raw: Record<string, unknown>): ActivityEvent {
  const type = String(raw.type ?? '').toLowerCase().replace(/_/g, '-') as ActivityType
  return {
    id: String(raw.id),
    type: KNOWN.includes(type) ? type : 'task-created',
    summary: asString(raw.summary ?? raw.message ?? raw.description) ?? 'Activity',
    at: asString(raw.at ?? raw.createdAt ?? raw.timestamp),
    agentId: asString(raw.agentId),
    taskId: raw.taskId !== undefined ? String(raw.taskId) : undefined,
    simulated: false,
  }
}

export const activityApi = {
  async list(): Promise<ActivityEvent[]> {
    if (appConfig.useMockData) return mockActivity
    const raw = await apiRequest<unknown>(endpoints.activity.list)
    return unwrapList<Record<string, unknown>>(raw).items.map(toEvent)
  },
}
