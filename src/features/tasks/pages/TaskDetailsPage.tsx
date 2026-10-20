import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { StatusBadge } from '@/components/feedback/StatusBadge'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/feedback/ErrorState'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { AgentRoutingView } from '@/features/workspace/components/AgentRoutingView'
import { ExecutionResult } from '@/features/workspace/components/ExecutionResult'
import { ExecutionTimeline } from '@/features/workspace/components/ExecutionTimeline'
import { workspaceApi } from '@/features/workspace/services/workspaceApi'
import { formatDateTime, formatDuration } from '@/utils/dateUtils'

export default function TaskDetailsPage() {
  const { taskId = '' } = useParams()
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ['task', taskId], queryFn: () => workspaceApi.getExecution(taskId) })

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to="/app/tasks" className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-ink hover:underline">
        <ArrowLeft size={16} aria-hidden="true" /> All tasks
      </Link>
      {isLoading && <Skeleton className="h-56" />}
      {error && <ErrorState error={error} onRetry={refetch} title="Could not load this task" />}
      {data && (
        <Card className="space-y-5 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={data.status} />
            {data.simulated && <SimulatedNotice />}
          </div>
          <h2 className="text-lg font-semibold">{data.taskDescription || 'Untitled task'}</h2>
          <dl className="grid gap-2 text-sm sm:grid-cols-3">
            <div><dt className="text-ink-soft">Execution ID</dt><dd className="break-all">{data.id}</dd></div>
            <div><dt className="text-ink-soft">Created</dt><dd>{formatDateTime(data.createdAt)}</dd></div>
            <div><dt className="text-ink-soft">Duration</dt><dd>{formatDuration(data.createdAt, data.completedAt) ?? '—'}</dd></div>
          </dl>
          <AgentRoutingView execution={data} />
          <ExecutionTimeline execution={data} />
          <ExecutionResult execution={data} />
        </Card>
      )}
    </div>
  )
}
