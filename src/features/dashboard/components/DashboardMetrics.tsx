import { StatusBadge } from '@/components/ui/StatusBadge'
import { Card, CardHeader } from '@/components/ui/Card'
import type { ExecutionStatus } from '@/types/common.types'

const ORDER: ExecutionStatus[] = ['running', 'pending', 'completed', 'failed']

export function DashboardMetrics({ counts }: { counts: Record<ExecutionStatus, number> }) {
  return (
    <Card>
      <CardHeader title="Task status" />
      <ul className="grid grid-cols-2 gap-3 p-5">
        {ORDER.map((s) => (
          <li key={s} className="rounded-xl bg-canvas p-3">
            <p className="text-2xl font-semibold">{counts[s]}</p>
            <StatusBadge status={s} className="mt-1" />
          </li>
        ))}
      </ul>
    </Card>
  )
}
