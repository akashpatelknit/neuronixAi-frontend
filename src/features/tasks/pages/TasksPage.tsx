import { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { ListTodo } from 'lucide-react'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { SkeletonList } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import { useDebounce } from '@/hooks/useDebounce'
import { appConfig } from '@/config/appConfig'
import { TaskCard } from '../components/TaskCard'
import { TaskFilters } from '../components/TaskFilters'
import { TaskTable } from '../components/TaskTable'
import { taskApi } from '../services/taskApi'
import type { TaskQuery } from '../types/task.types'

const PAGE_SIZE = 10

export default function TasksPage() {
  const [query, setQuery] = useState<TaskQuery>({ search: '', status: 'all', sort: 'updatedAt', page: 1, pageSize: PAGE_SIZE })
  const debouncedSearch = useDebounce(query.search)
  const effective = { ...query, search: debouncedSearch }
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ['tasks', effective], queryFn: () => taskApi.list(effective), placeholderData: keepPreviousData })
  const pages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1
  const filtered = query.search || query.status !== 'all'

  return (
    <div className="space-y-5">
      {appConfig.useMockData && <SimulatedNotice />}
      <TaskFilters query={query} onChange={(change) => setQuery((q) => ({ ...q, ...change }))} />
      {isLoading && <SkeletonList />}
      {error && <ErrorState error={error} onRetry={refetch} title="Could not load tasks" />}
      {data && data.items.length === 0 && (
        <EmptyState
          icon={ListTodo}
          title={filtered ? 'No tasks match your filters' : 'No tasks yet'}
          description={filtered ? 'Try a different search or status.' : 'Give NeuronixAI something to accomplish.'}
          actionLabel={filtered ? undefined : 'Open AI Workspace'}
          actionTo="/app/workspace"
        />
      )}
      {data && data.items.length > 0 && (
        <>
          <div className="hidden md:block"><TaskTable tasks={data.items} /></div>
          <div className="space-y-3 md:hidden">{data.items.map((t) => <TaskCard key={t.id} task={t} />)}</div>
          <nav aria-label="Pagination" className="flex items-center justify-between">
            <p className="text-sm text-ink-soft">Page {query.page} of {pages} · {data.total} tasks</p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" disabled={query.page <= 1} onClick={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}>Previous</Button>
              <Button variant="secondary" size="sm" disabled={query.page >= pages} onClick={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}>Next</Button>
            </div>
          </nav>
        </>
      )}
    </div>
  )
}
