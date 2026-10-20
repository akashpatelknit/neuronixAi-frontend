import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Activity } from 'lucide-react'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { ListSkeleton } from '@/components/feedback/ListSkeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ActivityTimeline, activityTypeLabels } from '../components/ActivityTimeline'
import { activityApi } from '../services/activityApi'
import type { ActivityType } from '../types/activity.types'

export default function ActivityPage() {
  const [type, setType] = useState<ActivityType | 'all'>('all')
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ['activity'], queryFn: activityApi.list })
  const events = (data ?? []).filter((e) => type === 'all' || e.type === type)

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {data?.some((e) => e.simulated) && <SimulatedNotice>Simulated demo events — not live backend activity.</SimulatedNotice>}
      <Select value={type} onValueChange={(v) => setType(v as ActivityType | 'all')}>
        <SelectTrigger aria-label="Filter by event type" className="h-11 w-full bg-card sm:w-56"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All events</SelectItem>
          {(Object.keys(activityTypeLabels) as ActivityType[]).map((t) => (
            <SelectItem key={t} value={t}>{activityTypeLabels[t]}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isLoading && <ListSkeleton />}
      {error && <ErrorState error={error} onRetry={refetch} title="Could not load activity" />}
      {data && events.length === 0 && <EmptyState icon={Activity} title="No activity yet" description="Events appear here as agents work on your tasks." />}
      {events.length > 0 && <ActivityTimeline events={events} />}
    </div>
  )
}
