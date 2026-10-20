import { appConfig } from '@/config/appConfig'
import { apiRequest } from '@/services/apiClient'
import { endpoints } from '@/services/endpoints'
import { mockGetExecution, mockSubmitTask } from '@/mocks/mockWorkspace'
import { normalizeStatus } from '@/utils/statusUtils'
import { asString } from '@/utils/responseUtils'
import type { Execution, ExecutionStep, SubmitTaskRequest } from '../types/workspace.types'

type Raw = Record<string, unknown>
const isRecord = (v: unknown): v is Raw => !!v && typeof v === 'object'

function toStep(raw: Raw, index: number): ExecutionStep {
  const tools = Array.isArray(raw.tools) ? raw.tools.filter(isRecord).map((t) => ({ name: String(t.name ?? 'Tool'), summary: asString(t.summary) })) : undefined
  return {
    id: String(raw.id ?? index),
    agentId: String(raw.agentId ?? raw.agent ?? raw.agentType ?? 'unknown').toLowerCase(),
    responsibility: asString(raw.responsibility ?? raw.description),
    status: normalizeStatus(raw.status),
    currentAction: asString(raw.currentAction),
    startedAt: asString(raw.startedAt),
    completedAt: asString(raw.completedAt ?? raw.finishedAt),
    output: asString(raw.output ?? raw.result),
    error: asString(raw.error),
    tools,
  }
}

/** Adapter: backend task/execution JSON -> Execution view model. Only copies fields that exist. */
export function toExecution(raw: Raw): Execution {
  const steps = Array.isArray(raw.steps ?? raw.agents ?? raw.agentRuns)
    ? ((raw.steps ?? raw.agents ?? raw.agentRuns) as unknown[]).filter(isRecord).map(toStep)
    : []
  return {
    id: String(raw.id ?? raw.executionId),
    taskDescription: asString(raw.prompt ?? raw.taskDescription ?? raw.title ?? raw.description) ?? '',
    status: normalizeStatus(raw.status),
    steps,
    result: asString(raw.result ?? raw.response ?? raw.answer),
    error: asString(raw.error ?? raw.errorMessage),
    conversationId: raw.conversationId !== undefined ? String(raw.conversationId) : undefined,
    createdAt: asString(raw.createdAt),
    startedAt: asString(raw.startedAt),
    completedAt: asString(raw.completedAt ?? raw.finishedAt),
    simulated: false,
  }
}

export const workspaceApi = {
  async submitTask(request: SubmitTaskRequest): Promise<Execution> {
    if (appConfig.useMockData) return mockSubmitTask(request)
    const raw = await apiRequest<Raw>(endpoints.tasks.create, { method: 'POST', body: request })
    return toExecution(raw)
  },

  async getExecution(id: string): Promise<Execution> {
    if (appConfig.useMockData) return mockGetExecution(id)
    const raw = await apiRequest<Raw>(endpoints.tasks.detail(id))
    return toExecution(raw)
  },
}
