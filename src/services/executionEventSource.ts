import { appConfig } from '@/config/appConfig'
import type { Execution } from '@/features/workspace/types/workspace.types'

export type ExecutionListener = (execution: Execution) => void
export type ExecutionErrorListener = (error: unknown) => void

export interface ExecutionSubscription {
  close: () => void
}

type Fetcher = (executionId: string) => Promise<Execution>

const TERMINAL = new Set(['completed', 'failed'])

/**
 * Transport-agnostic way to follow an execution. UI code only calls `subscribe`.
 * Today it is implemented with REST polling because that is all the backend is
 * known to offer. A Server-Sent Events or WebSocket implementation can replace
 * this function without touching any component.
 */
export function subscribeToExecution(
  executionId: string,
  fetchExecution: Fetcher,
  onUpdate: ExecutionListener,
  onError: ExecutionErrorListener,
): ExecutionSubscription {
  let closed = false
  let timer: ReturnType<typeof setTimeout> | undefined

  const tick = async () => {
    try {
      const execution = await fetchExecution(executionId)
      if (closed) return
      onUpdate(execution)
      if (TERMINAL.has(execution.status)) return
    } catch (error) {
      if (closed) return
      onError(error)
      return
    }
    timer = setTimeout(tick, appConfig.executionPollIntervalMs)
  }
  void tick()

  return {
    close() {
      closed = true
      if (timer) clearTimeout(timer)
    },
  }
}
