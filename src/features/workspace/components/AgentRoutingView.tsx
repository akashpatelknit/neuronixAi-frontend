import { Fragment } from 'react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { AgentChip } from '@/features/agents/components/AgentIcon'
import type { Execution } from '../types/workspace.types'

/** Shows which agents the backend selected for this execution, in order. Renders nothing if none were reported. */
export function AgentRoutingView({ execution }: { execution: Execution }) {
  if (execution.steps.length === 0) {
    return <p className="text-sm text-ink-soft">The backend has not reported which agents are handling this task.</p>
  }
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">Agents selected for this task</p>
      <ol className="flex flex-col items-start gap-1.5 sm:flex-row sm:flex-wrap sm:items-center">
        {execution.steps.map((step, i) => (
          <Fragment key={step.id}>
            {i > 0 && (
              <li aria-hidden="true" className="text-ink-soft">
                <ArrowRight size={14} className="hidden sm:block" />
                <ArrowDown size={14} className="ml-2 sm:hidden" />
              </li>
            )}
            <li>
              <AgentChip agentId={step.agentId} />
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  )
}
