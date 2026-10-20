export type ActivityType =
  | 'task-created'
  | 'agent-started'
  | 'agent-completed'
  | 'tool-executed'
  | 'execution-failed'
  | 'task-completed'

export interface ActivityEvent {
  id: string
  type: ActivityType
  summary: string
  at?: string
  agentId?: string
  taskId?: string
  simulated: boolean
}
