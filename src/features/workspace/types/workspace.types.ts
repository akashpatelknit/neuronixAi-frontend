import type { ExecutionStatus } from '@/types/common.types'

export interface ToolActivity {
  name: string
  summary?: string
}

/** One agent's part in an execution. Every optional field is shown only when the backend supplies it. */
export interface ExecutionStep {
  id: string
  agentId: string
  responsibility?: string
  status: ExecutionStatus
  currentAction?: string
  startedAt?: string
  completedAt?: string
  output?: string
  error?: string
  tools?: ToolActivity[]
}

export interface Execution {
  id: string
  taskDescription: string
  status: ExecutionStatus
  steps: ExecutionStep[]
  result?: string
  error?: string
  conversationId?: string
  createdAt?: string
  startedAt?: string
  completedAt?: string
  /** True only for demo-mode executions. They are never real backend activity. */
  simulated: boolean
}

export interface SubmitTaskRequest {
  prompt: string
  conversationId?: string
}

export interface ConversationTurn {
  id: string
  prompt: string
  executionId: string
}
