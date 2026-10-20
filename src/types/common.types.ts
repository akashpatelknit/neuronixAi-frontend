export type ExecutionStatus = 'pending' | 'running' | 'waiting' | 'completed' | 'failed'

export type AgentAvailability = 'available' | 'coming-soon' | 'unavailable'

export interface PageParams {
  page?: number
  pageSize?: number
  search?: string
}

export interface Paged<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

/** Data returned by a service; `simulated` is true only for demo-mode data. */
export interface Sourced<T> {
  data: T
  simulated: boolean
}
