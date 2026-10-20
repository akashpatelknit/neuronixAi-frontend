import { Link } from 'react-router-dom'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { AgentChip } from '@/features/agents/components/AgentIcon'
import { formatDateTime } from '@/utils/dateUtils'
import type { TaskSummary } from '../types/task.types'

export function TaskTable({ tasks }: { tasks: TaskSummary[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-canvas text-xs uppercase tracking-wide text-ink-soft">
          <tr>
            <th scope="col" className="px-4 py-3">Task</th>
            <th scope="col" className="px-4 py-3">Status</th>
            <th scope="col" className="px-4 py-3">Agents</th>
            <th scope="col" className="px-4 py-3">Created</th>
            <th scope="col" className="px-4 py-3">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {tasks.map((t) => (
            <tr key={t.id} className="transition-ui hover:bg-violet-soft/40">
              <td className="px-4 py-3 font-medium">
                <Link to={`/app/tasks/${t.id}`} className="hover:text-violet-ink hover:underline">
                  {t.title}
                </Link>
              </td>
              <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1.5">{t.agentIds.length ? t.agentIds.map((id) => <AgentChip key={id} agentId={id} />) : <span className="text-ink-soft">—</span>}</div>
              </td>
              <td className="px-4 py-3 text-ink-soft">{formatDateTime(t.createdAt)}</td>
              <td className="px-4 py-3 text-ink-soft">{formatDateTime(t.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
