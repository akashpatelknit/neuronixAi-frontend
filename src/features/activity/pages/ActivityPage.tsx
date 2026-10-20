import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Activity } from 'lucide-react'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { SkeletonList } from '@/components/ui/Skeleton'
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
      <select aria-label="Filter by event type" value={type} onChange={(e) => setType(e.target.value as ActivityType | 'all')} className="min-h-11 rounded-xl border border-line bg-surface px-3 text-sm focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20">
        <option value="all">All events</option>
        {(Object.keys(activityTypeLabels) as ActivityType[]).map((t) => (
          <option key={t} value={t}>{activityTypeLabels[t]}</option>
        ))}
      </select>
      {isLoading && <SkeletonList />}
      {error && <ErrorState error={error} onRetry={refetch} title="Could not load activity" />}
      {data && events.length === 0 && <EmptyState icon={Activity} title="No activity yet" description="Events appear here as agents work on your tasks." />}
      {events.length > 0 && <ActivityTimeline events={events} />}
    </div>
  )
}
