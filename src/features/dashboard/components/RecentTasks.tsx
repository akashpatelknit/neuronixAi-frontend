import { Link } from 'react-router-dom'
import { ListTodo } from 'lucide-react'
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/feedback/StatusBadge'
import { EmptyState } from '@/components/feedback/EmptyState'
import { formatRelative } from '@/utils/dateUtils'
import type { TaskSummary } from '@/features/tasks/types/task.types'

export function RecentTasks({ tasks }: { tasks: TaskSummary[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Recent tasks</CardTitle><CardAction><Link to="/app/tasks" className="text-sm font-medium text-violet-ink hover:underline">View all</Link></CardAction></CardHeader>
      {tasks.length === 0 ? (
        <div className="p-5"><EmptyState icon={ListTodo} title="No tasks yet" description="Give NeuronixAI something to accomplish." /></div>
      ) : (
        <ul className="divide-y divide-line">
          {tasks.map((t) => (
            <li key={t.id}>
              <Link to={`/app/tasks/${t.id}`} className="flex items-center justify-between gap-3 px-5 py-3 transition-ui hover:bg-violet-soft/40">
                <span className="min-w-0"><span className="block truncate text-sm font-medium">{t.title}</span><span className="text-xs text-ink-soft">{formatRelative(t.updatedAt)}</span></span>
                <StatusBadge status={t.status} className="shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
