import { Card } from '@/components/ui/card'
import { StatusBadge } from '@/components/feedback/StatusBadge'
import { Pill } from '@/components/feedback/StatusBadge'
import type { ExecutionStatus } from '@/types/common.types'

const states: { status: ExecutionStatus; note: string }[] = [
  { status: 'pending', note: 'Queued, not started yet' },
  { status: 'running', note: 'An agent is working' },
  { status: 'waiting', note: 'Waiting on something' },
  { status: 'completed', note: 'Finished with a result' },
  { status: 'failed', note: 'Stopped with an error' },
]

export function ExecutionTransparencySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">See what happened, not just a spinner</h2>
          <p className="mt-3 text-ink-soft">Inspect supported execution details — which agents ran, their status, timing and output — instead of relying on unexplained loading indicators.</p>
          <p className="mt-3"><Pill tone="amber">Illustrative timeline</Pill></p>
        </div>
        <Card className="rounded-3xl p-5"><ol className="space-y-3" aria-label="Example execution states">
          {states.map((s) => (
            <li key={s.status} className="flex items-center justify-between gap-3 rounded-xl bg-canvas px-4 py-3">
              <StatusBadge status={s.status} />
              <span className="text-sm text-ink-soft">{s.note}</span>
            </li>
          ))}
        </ol></Card>
      </div>
    </section>
  )
}
