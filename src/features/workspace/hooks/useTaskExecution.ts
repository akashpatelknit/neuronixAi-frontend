import { useCallback, useEffect, useRef, useState } from 'react'
import { subscribeToExecution, type ExecutionSubscription } from '@/services/executionEventSource'
import { getErrorMessage, logDiagnostics } from '@/utils/errorUtils'
import { workspaceApi } from '../services/workspaceApi'
import type { ConversationTurn, Execution } from '../types/workspace.types'

export interface TurnState extends ConversationTurn {
  execution?: Execution
  submitting: boolean
  error?: string
}

/** Submits tasks and follows each execution through the transport-agnostic event source. */
export function useTaskExecution() {
  const [turns, setTurns] = useState<TurnState[]>([])
  const [conversationId, setConversationId] = useState<string>()
  const subs = useRef(new Map<string, ExecutionSubscription>())
  const conversationRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    const active = subs.current
    return () => active.forEach((s) => s.close())
  }, [])

  const patch = useCallback((turnId: string, change: Partial<TurnState>) => {
    setTurns((all) => all.map((t) => (t.id === turnId ? { ...t, ...change } : t)))
  }, [])

  const follow = useCallback(
    (turnId: string, executionId: string) => {
      subs.current.get(turnId)?.close()
      const sub = subscribeToExecution(
        executionId,
        workspaceApi.getExecution,
        (execution) => patch(turnId, { execution }),
        (error) => {
          logDiagnostics('Execution updates failed', error)
          patch(turnId, { error: getErrorMessage(error) })
        },
      )
      subs.current.set(turnId, sub)
    },
    [patch],
  )

  const submit = useCallback(
    async (prompt: string) => {
      const turnId = crypto.randomUUID()
      setTurns((all) => [...all, { id: turnId, prompt, executionId: '', submitting: true }])
      try {
        const execution = await workspaceApi.submitTask({ prompt, conversationId: conversationRef.current })
        if (execution.conversationId) {
          conversationRef.current = execution.conversationId
          setConversationId(execution.conversationId)
        }
        patch(turnId, { execution, executionId: execution.id, submitting: false })
        if (execution.status !== 'completed' && execution.status !== 'failed') follow(turnId, execution.id)
      } catch (error) {
        logDiagnostics('Task submission failed', error)
        patch(turnId, { submitting: false, error: getErrorMessage(error) })
      }
    },
    [follow, patch],
  )

  const retry = useCallback(
    (turnId: string) => {
      const turn = turns.find((t) => t.id === turnId)
      if (!turn) return
      setTurns((all) => all.filter((t) => t.id !== turnId))
      void submit(turn.prompt)
    },
    [turns, submit],
  )

  const reset = useCallback(() => {
    subs.current.forEach((s) => s.close())
    subs.current.clear()
    conversationRef.current = undefined
    setConversationId(undefined)
    setTurns([])
  }, [])

  return { turns, conversationId, submit, retry, reset }
}
