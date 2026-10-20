import { appConfig } from '@/config/appConfig'
import { apiRequest } from '@/services/apiClient'
import { endpoints } from '@/services/endpoints'
import { mockAgentRuntime } from '@/mocks/mockData'
import { unwrapList, asString } from '@/utils/responseUtils'
import type { AgentAvailability } from '@/types/common.types'
import { agentCatalog, findAgentDefinition, genericAgentDefinition } from '../data/agentCatalog'
import type { Agent, AgentRuntimeInfo } from '../types/agent.types'

function toAvailability(raw: unknown): AgentAvailability {
  const v = String(raw ?? '').toLowerCase()
  if (['available', 'active', 'enabled', 'online', 'ready'].includes(v)) return 'available'
  if (['coming_soon', 'coming-soon', 'planned'].includes(v)) return 'coming-soon'
  return 'unavailable'
}

function toRuntime(raw: Record<string, unknown>): AgentRuntimeInfo {
  return {
    id: String(raw.id ?? raw.type ?? raw.name ?? '').toLowerCase(),
    name: asString(raw.name),
    description: asString(raw.description),
    availability: toAvailability(raw.availability ?? raw.status),
    capabilities: Array.isArray(raw.capabilities) ? raw.capabilities.map(String) : undefined,
  }
}

/** Merge static catalog (look & copy) with what the backend actually reports (availability). */
export function mergeAgents(runtime: AgentRuntimeInfo[]): Agent[] {
  const byId = new Map(runtime.map((r) => [r.id, r]))
  const known: Agent[] = agentCatalog.map((def) => {
    const info = byId.get(def.id)
    return {
      ...def,
      description: info?.description ?? def.description,
      capabilities: info?.capabilities?.length ? info.capabilities : def.capabilities,
      availability: info?.availability ?? 'unavailable',
      notReportedByBackend: !info,
      recentActivity: info?.recentActivity ?? [],
    }
  })
  const extra: Agent[] = runtime
    .filter((r) => !findAgentDefinition(r.id))
    .map((r) => ({
      ...genericAgentDefinition(r.id, r.name),
      description: r.description ?? genericAgentDefinition(r.id).description,
      capabilities: r.capabilities ?? [],
      availability: r.availability,
      notReportedByBackend: false,
      recentActivity: r.recentActivity ?? [],
    }))
  return [...known, ...extra]
}

export const agentApi = {
  async list(): Promise<{ agents: Agent[]; simulated: boolean }> {
    if (appConfig.useMockData) return { agents: mergeAgents(mockAgentRuntime), simulated: true }
    const raw = await apiRequest<unknown>(endpoints.agents.list)
    const runtime = unwrapList<Record<string, unknown>>(raw).items.map(toRuntime)
    return { agents: mergeAgents(runtime), simulated: false }
  },
}
