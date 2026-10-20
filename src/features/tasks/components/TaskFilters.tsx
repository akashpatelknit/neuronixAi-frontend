import { Search } from 'lucide-react'
import type { TaskQuery } from '../types/task.types'

interface Props {
  query: TaskQuery
  onChange: (change: Partial<TaskQuery>) => void
}

const field = 'min-h-11 rounded-xl border border-line bg-surface px-3 text-sm focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20'

export function TaskFilters({ query, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
        <input type="search" aria-label="Search tasks" placeholder="Search tasks" value={query.search} onChange={(e) => onChange({ search: e.target.value, page: 1 })} className={`${field} w-full pl-9`} />
      </div>
      <select aria-label="Filter by status" value={query.status} onChange={(e) => onChange({ status: e.target.value as TaskQuery['status'], page: 1 })} className={field}>
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>
      <select aria-label="Sort tasks" value={query.sort} onChange={(e) => onChange({ sort: e.target.value as TaskQuery['sort'] })} className={field}>
        <option value="updatedAt">Recently updated</option>
        <option value="createdAt">Recently created</option>
        <option value="title">Title (A–Z)</option>
      </select>
    </div>
  )
}
