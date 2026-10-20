import { AlertTriangle, Sparkles } from 'lucide-react'
import type { Execution } from '../types/workspace.types'

/** Result text is rendered as plain text (no HTML injection) with preserved line breaks. */
export function ExecutionResult({ execution }: { execution: Execution }) {
  if (execution.status === 'failed') {
    return (
      <div role="alert" className="flex gap-3 rounded-xl bg-coral-soft p-4 text-sm text-coral-ink">
        <AlertTriangle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>{execution.error ?? 'This task failed. The backend did not provide more details.'}</p>
      </div>
    )
  }
  if (execution.status !== 'completed' || !execution.result) return null
  return (
    <div className="rounded-xl border border-mint/40 bg-mint-soft/50 p-4">
      <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mint-ink">
        <Sparkles size={13} aria-hidden="true" /> Result
      </p>
      <p className="whitespace-pre-wrap text-sm leading-relaxed">{execution.result}</p>
    </div>
  )
}
