import { Card } from '@/components/ui/card'
import { Loader2, RotateCcw, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/feedback/StatusBadge'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import type { TurnState } from '../hooks/useTaskExecution'
import { AgentRoutingView } from './AgentRoutingView'
import { ExecutionResult } from './ExecutionResult'
import { ExecutionTimeline } from './ExecutionTimeline'

export function ConversationPanel({ turns, onRetry }: { turns: TurnState[]; onRetry: (turnId: string) => void }) {
  return (
    <div className="space-y-6" aria-live="polite">
      {turns.map((turn) => (
        <section key={turn.id} className="space-y-3" aria-label="Task">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-violet-soft text-violet-ink">
              <User size={16} aria-hidden="true" />
            </span>
            <p className="whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-surface px-4 py-2.5 text-sm shadow-card">{turn.prompt}</p>
          </div>

          <Card className="ml-0 p-4 sm:ml-11">
            {turn.submitting && <p role="status" className="inline-flex items-center gap-2 text-sm"><Loader2 className="size-4 animate-spin" aria-hidden="true" />Sending your task…</p>}

            {turn.error && (
              <div role="alert" className="flex flex-wrap items-center justify-between gap-3 text-sm text-coral-ink">
                <p>{turn.error}</p>
                {!turn.execution && (
                  <Button variant="outline" size="sm" onClick={() => onRetry(turn.id)}>
                    <RotateCcw size={14} aria-hidden="true" /> Retry
                  </Button>
                )}
              </div>
            )}

            {turn.execution && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={turn.execution.status} />
                  <span className="text-xs text-ink-soft">Execution {turn.execution.id}</span>
                  {turn.execution.simulated && <SimulatedNotice>Simulated demo workflow</SimulatedNotice>}
                </div>
                <AgentRoutingView execution={turn.execution} />
                <ExecutionTimeline execution={turn.execution} />
                <ExecutionResult execution={turn.execution} />
                {turn.execution.status === 'failed' && (
                  <Button variant="outline" size="sm" onClick={() => onRetry(turn.id)}>
                    <RotateCcw size={14} aria-hidden="true" /> Retry task
                  </Button>
                )}
              </div>
            )}
          </Card>
        </section>
      ))}
    </div>
  )
}
