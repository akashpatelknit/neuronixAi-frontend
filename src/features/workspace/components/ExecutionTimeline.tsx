import { Wrench } from 'lucide-react'
import { AgentChip } from '@/features/agents/components/AgentIcon'
import { StatusBadge } from '@/components/feedback/StatusBadge'
import { formatDateTime, formatDuration } from '@/utils/dateUtils'
import type { Execution } from '../types/workspace.types'

/** Renders only the fields the backend provided; nothing is filled in to look complete. */
export function ExecutionTimeline({ execution }: { execution: Execution }) {
  if (execution.steps.length === 0) return null
  return (
    <ol className="relative space-y-4 border-l-2 border-line pl-5" aria-label="Execution timeline">
      {execution.steps.map((step) => {
        const duration = formatDuration(step.startedAt, step.completedAt)
        return (
          <li key={step.id} className="relative">
            <span className="absolute -left-[1.72rem] top-1.5 size-3 rounded-full border-2 border-surface bg-violet" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-2">
              <AgentChip agentId={step.agentId} />
              <StatusBadge status={step.status} />
              {duration && <span className="text-xs text-ink-soft">{duration}</span>}
            </div>
            {step.responsibility && <p className="mt-1 text-sm text-ink-soft">{step.responsibility}</p>}
            {step.currentAction && step.status === 'running' && <p className="mt-1 text-sm font-medium text-violet-ink">{step.currentAction}…</p>}
            {(step.startedAt || step.completedAt) && (
              <p className="mt-1 text-xs text-ink-soft">
                {step.startedAt && <>Started {formatDateTime(step.startedAt)}</>}
                {step.completedAt && <> · Finished {formatDateTime(step.completedAt)}</>}
              </p>
            )}
            {step.tools?.map((tool) => (
              <p key={tool.name} className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-neutral-soft px-2 py-0.5 text-xs">
                <Wrench size={12} aria-hidden="true" /> {tool.name}
                {tool.summary && <span className="text-ink-soft"> — {tool.summary}</span>}
              </p>
            ))}
            {step.output && <p className="mt-2 whitespace-pre-wrap rounded-lg bg-canvas p-3 text-sm">{step.output}</p>}
            {step.error && (
              <p role="alert" className="mt-2 rounded-lg bg-coral-soft p-3 text-sm text-coral-ink">
                {step.error}
              </p>
            )}
          </li>
        )
      })}
    </ol>
  )
}
