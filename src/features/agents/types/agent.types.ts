import type { AgentAvailability } from '@/types/common.types'

export type AgentAccent = 'violet' | 'blue' | 'cyan' | 'coral' | 'amber' | 'mint'
export type AgentIconName = 'planning' | 'coding' | 'writing' | 'research' | 'analysis' | 'knowledge' | 'generic'

/** Static presentation + product description of an agent kind. */
export interface AgentDefinition {
  id: string
  name: string
  shortName: string
  description: string
  responsibilities: string[]
  capabilities: string[]
  accent: AgentAccent
  icon: AgentIconName
}

/** What the backend reports at runtime. */
export interface AgentRuntimeInfo {
  id: string
  name?: string
  description?: string
  availability: AgentAvailability
  capabilities?: string[]
  recentActivity?: { at: string; summary: string }[]
}

/** View model used by pages: catalog definition merged with runtime info. */
export interface Agent extends AgentDefinition {
  availability: AgentAvailability
  /** True when the backend did not report this agent at all. */
  notReportedByBackend: boolean
  recentActivity: { at: string; summary: string }[]
}
