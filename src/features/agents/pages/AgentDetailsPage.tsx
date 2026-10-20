import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Card, CardHeader } from '@/components/ui/Card'
import { ErrorState } from '@/components/feedback/ErrorState'
import { EmptyState } from '@/components/feedback/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { buttonClasses } from '@/components/ui/Button'
import { Bot } from 'lucide-react'
import { formatRelative } from '@/utils/dateUtils'
import { AgentIcon } from '../components/AgentIcon'
import { AgentStatus } from '../components/AgentStatus'
import { useAgents } from '../hooks/useAgents'

export default function AgentDetailsPage() {
  const { agentId } = useParams()
  const { data, isLoading, error, refetch } = useAgents()
  const agent = data?.agents.find((a) => a.id === agentId)

  return (
    <div className="space-y-6">
      <Link to="/app/agents" className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-ink hover:underline">
        <ArrowLeft size={16} aria-hidden="true" /> All agents
      </Link>
      {isLoading && <Skeleton className="h-64" />}
      {error && <ErrorState error={error} onRetry={refetch} />}
      {data && !agent && <EmptyState icon={Bot} title="Agent not found" description="This agent is not in the catalog." actionLabel="Back to agents" actionTo="/app/agents" />}
      {agent && (
        <>
          <Card className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <AgentIcon icon={agent.icon} accent={agent.accent} className="size-14" size={28} />
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold">{agent.name}</h2>
                <p className="mt-1 text-ink-soft">{agent.description}</p>
              </div>
              <AgentStatus availability={agent.availability} />
            </div>
            {agent.availability === 'available' && (
              <Link to="/app/workspace" className={buttonClasses('primary', 'md', 'mt-5')}>
                Describe a task in the Workspace
              </Link>
            )}
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader title="Responsibilities" />
              <ul className="list-disc space-y-1 px-9 py-4 text-sm text-ink-soft">
                {agent.responsibilities.length ? agent.responsibilities.map((r) => <li key={r}>{r}</li>) : <li>Not described yet.</li>}
              </ul>
            </Card>
            <Card>
              <CardHeader title="Recent activity" />
              <div className="p-5 text-sm">
                {agent.recentActivity.length ? (
                  <ul className="space-y-2">
                    {agent.recentActivity.map((a) => (
                      <li key={a.at + a.summary} className="flex justify-between gap-3">
                        <span>{a.summary}</span>
                        <span className="shrink-0 text-ink-soft">{formatRelative(a.at)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-ink-soft">No recent activity reported for this agent.</p>
                )}
              </div>
            </Card>
          </div>
          <p className="text-xs text-ink-soft">Agent configuration is not offered because no configuration operations are confirmed in the backend.</p>
        </>
      )}
    </div>
  )
}
