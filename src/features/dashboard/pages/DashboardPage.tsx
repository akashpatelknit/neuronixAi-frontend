import { useQuery } from '@tanstack/react-query'
import { ErrorState } from '@/components/feedback/ErrorState'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardMetrics } from '../components/DashboardMetrics'
import { DashboardWelcome } from '../components/DashboardWelcome'
import { QuickTaskComposer } from '../components/QuickTaskComposer'
import { RecentAgentActivity } from '../components/RecentAgentActivity'
import { RecentTasks } from '../components/RecentTasks'
import { dashboardApi } from '../services/dashboardApi'

export default function DashboardPage() {
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ['dashboard'], queryFn: dashboardApi.load })
  return (
    <div className="space-y-6">
      <DashboardWelcome />
      <QuickTaskComposer />
      {data?.simulated && <SimulatedNotice>Demo mode: everything below is simulated sample data.</SimulatedNotice>}
      {isLoading && <Skeleton className="h-64" />}
      {error && <ErrorState error={error} onRetry={refetch} title="Could not load your workspace overview" />}
      {data && (
        <>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2"><RecentTasks tasks={data.recentTasks} /></div>
            <DashboardMetrics counts={data.statusCounts} />
          </div>
          <RecentAgentActivity events={data.recentActivity} conversations={data.recentConversations} />
        </>
      )}
    </div>
  )
}
