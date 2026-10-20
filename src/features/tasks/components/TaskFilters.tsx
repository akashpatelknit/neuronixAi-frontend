import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { TaskQuery } from '../types/task.types'

interface Props {
  query: TaskQuery
  onChange: (change: Partial<TaskQuery>) => void
}

export function TaskFilters({ query, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input type="search" aria-label="Search tasks" placeholder="Search tasks" value={query.search} onChange={(e) => onChange({ search: e.target.value, page: 1 })} className="h-11 bg-card pl-9" />
      </div>
      <Select value={query.status} onValueChange={(v) => onChange({ status: v as TaskQuery['status'], page: 1 })}>
        <SelectTrigger aria-label="Filter by status" className="h-11 w-full bg-card sm:w-44"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="running">Running</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
        </SelectContent>
      </Select>
      <Select value={query.sort} onValueChange={(v) => onChange({ sort: v as TaskQuery['sort'] })}>
        <SelectTrigger aria-label="Sort tasks" className="h-11 w-full bg-card sm:w-48"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="updatedAt">Recently updated</SelectItem>
          <SelectItem value="createdAt">Recently created</SelectItem>
          <SelectItem value="title">Title (A–Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
