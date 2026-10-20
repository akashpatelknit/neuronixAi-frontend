import type { ExecutionStatus } from '@/types/common.types'

export interface TaskSummary {
  id: string
  title: string
  status: ExecutionStatus
  createdAt?: string
  updatedAt?: string
  agentIds: string[]
  simulated: boolean
}

export type TaskSortKey = 'updatedAt' | 'createdAt' | 'title'

export interface TaskQuery {
  search: string
  status: ExecutionStatus | 'all'
  sort: TaskSortKey
  page: number
  pageSize: number
}
