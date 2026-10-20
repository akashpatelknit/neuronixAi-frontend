import type { Agent } from '../types/agent.types'
import { AgentCard } from './AgentCard'

export function AgentGrid({ agents }: { agents: Agent[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} to={`/app/agents/${agent.id}`} />
      ))}
    </div>
  )
}
