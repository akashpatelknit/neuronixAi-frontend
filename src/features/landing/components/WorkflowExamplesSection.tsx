import { ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { agentAccentClasses } from '@/features/agents/data/agentAccents'
import { Pill } from '@/components/ui/StatusBadge'
import { pipelineStages, workflowExamples } from '../data/landingContent'

export function WorkflowExamplesSection() {
  return (
    <section id="product" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">One Request. The Right Agents.</h2>
        <p className="mt-3 text-ink-soft">Different tasks need different intelligence. One workspace brings them together.</p>
        <p className="mt-2"><Pill tone="amber">Illustrative workflows — not live executions</Pill></p>
      </div>

      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="How NeuronixAI works on a task">
        {pipelineStages.map((s, i) => (
          <li key={s.name} className="rounded-2xl border border-line bg-surface p-4 shadow-card">
            <span className="text-xs font-bold text-violet">0{i + 1}</span>
            <h3 className="font-semibold">{s.name}</h3>
            <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {workflowExamples.map((w) => (
          <article key={w.request} className="rounded-2xl border border-line bg-surface p-5 shadow-card transition-ui hover:shadow-lift">
            <p className="font-semibold">“{w.request}”</p>
            <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Possible workflow">
              {w.agents.map((a) => (
                <li key={a.id + a.label} className="flex items-center gap-2">
                  <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold', agentAccentClasses[a.accent].soft, agentAccentClasses[a.accent].ink)}>{a.label} Agent</span>
                  <ArrowRight size={14} className="text-ink-soft" aria-hidden="true" />
                </li>
              ))}
              <li className="rounded-full bg-mint-soft px-3 py-1 text-xs font-semibold text-mint-ink">{w.outcome}</li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
