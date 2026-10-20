import { agentCatalog } from '@/features/agents/data/agentCatalog'
import { AgentCard } from '@/features/agents/components/AgentCard'

export function AgentCapabilitiesSection() {
  return (
    <section id="agents" className="bg-surface/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Specialized agents, one workspace</h2>
          <p className="mt-3 text-ink-soft">Each agent has a distinct responsibility. NeuronixAI coordinates them around your goal — Knowledge / RAG is one capability among many.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agentCatalog.map((a) => (
            <AgentCard key={a.id} agent={a} />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">Availability of each agent depends on your NeuronixAI deployment and is shown inside the app.</p>
      </div>
    </section>
  )
}
