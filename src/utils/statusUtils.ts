import type { ExecutionStatus } from '@/types/common.types'

/** Backends spell statuses many ways (IN_PROGRESS, DONE, ...). Normalise them in one place. */
export function normalizeStatus(raw: unknown): ExecutionStatus {
  const value = String(raw ?? '').toLowerCase().replace(/[\s-]+/g, '_')
  switch (value) {
    case 'running':
    case 'in_progress':
    case 'processing':
    case 'started':
      return 'running'
    case 'waiting':
    case 'blocked':
    case 'awaiting_input':
      return 'waiting'
    case 'completed':
    case 'complete':
    case 'done':
    case 'success':
    case 'succeeded':
      return 'completed'
    case 'failed':
    case 'error':
    case 'cancelled':
    case 'canceled':
      return 'failed'
    default:
      return 'pending'
  }
}
