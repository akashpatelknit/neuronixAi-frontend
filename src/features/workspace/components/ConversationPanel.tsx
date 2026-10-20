import { RotateCcw, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
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

          <div className="ml-0 rounded-2xl border border-line bg-surface p-4 shadow-card sm:ml-11">
            {turn.submitting && <LoadingSpinner label="Sending your task…" />}

            {turn.error && (
              <div role="alert" className="flex flex-wrap items-center justify-between gap-3 text-sm text-coral-ink">
                <p>{turn.error}</p>
                {!turn.execution && (
                  <Button variant="secondary" size="sm" onClick={() => onRetry(turn.id)}>
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
                  <Button variant="secondary" size="sm" onClick={() => onRetry(turn.id)}>
                    <RotateCcw size={14} aria-hidden="true" /> Retry task
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
