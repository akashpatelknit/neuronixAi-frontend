import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/feedback/StatusBadge'
import { AgentChip } from '@/features/agents/components/AgentIcon'
import { formatDateTime } from '@/utils/dateUtils'
import type { TaskSummary } from '../types/task.types'

export function TaskTable({ tasks }: { tasks: TaskSummary[] }) {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4">Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Agents</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="px-4 font-medium">
                <Link to={`/app/tasks/${t.id}`} className="hover:text-violet-ink hover:underline">{t.title}</Link>
              </TableCell>
              <TableCell><StatusBadge status={t.status} /></TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1.5">{t.agentIds.length ? t.agentIds.map((id) => <AgentChip key={id} agentId={id} />) : <span className="text-muted-foreground">—</span>}</div>
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDateTime(t.createdAt)}</TableCell>
              <TableCell className="text-muted-foreground">{formatDateTime(t.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
