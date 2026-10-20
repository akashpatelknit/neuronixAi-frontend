import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/feedback/StatusBadge'
import { AgentChip } from '@/features/agents/components/AgentIcon'
import { formatRelative } from '@/utils/dateUtils'
import type { TaskSummary } from '../types/task.types'

/** Mobile representation of a task row. */
export function TaskCard({ task }: { task: TaskSummary }) {
  return (
    <Link to={`/app/tasks/${task.id}`} className="block rounded-2xl"><Card className="p-4 transition-ui hover:border-violet/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium">{task.title}</h3>
        <StatusBadge status={task.status} className="shrink-0" />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {task.agentIds.map((id) => (
          <AgentChip key={id} agentId={id} />
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-soft">Updated {formatRelative(task.updatedAt)}</p>
    </Card></Link>
  )
}
