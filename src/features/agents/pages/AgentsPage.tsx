import { Bot } from 'lucide-react'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { Skeleton } from '@/components/ui/Skeleton'
import { AgentGrid } from '../components/AgentGrid'
import { useAgents } from '../hooks/useAgents'

export default function AgentsPage() {
  const { data, isLoading, error, refetch } = useAgents()
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-ink-soft">
        NeuronixAI routes your task to the right specialized capabilities. Availability below reflects what the backend reports — you never have to pick an agent yourself.
      </p>
      {data?.simulated && <SimulatedNotice />}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      )}
      {error && <ErrorState error={error} onRetry={refetch} title="Could not load agents" />}
      {data && data.agents.length === 0 && <EmptyState icon={Bot} title="No agents yet" description="The backend has not reported any agents." />}
      {data && <AgentGrid agents={data.agents} />}
    </div>
  )
}
