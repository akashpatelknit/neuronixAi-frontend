import { Card } from '@/components/ui/card'
import { ArrowDown, FileCheck2, MessageSquareText, Workflow } from 'lucide-react'
import { agentCatalog } from '@/features/agents/data/agentCatalog'
import { AgentIcon } from '@/features/agents/components/AgentIcon'
import { agentAccentClasses } from '@/features/agents/data/agentAccents'
import clsx from 'clsx'

function Connector() {
  return (
    <svg width="24" height="28" viewBox="0 0 24 28" className="mx-auto text-violet/60" aria-hidden="true">
      <line x1="12" y1="0" x2="12" y2="22" stroke="currentColor" strokeWidth="2" className="flow-line" />
      <path d="M6 18l6 7 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Conceptual illustration. It is not a live execution feed. */
export function AgentOrchestrationVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-md" aria-label="Illustration: a task is orchestrated across specialized agents into a result">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-gradient opacity-10 blur-2xl" aria-hidden="true" />
      <Card className="rounded-3xl bg-card/90 p-5 shadow-lift">
        <div className="flex items-start gap-3 rounded-2xl bg-canvas p-3.5">
          <MessageSquareText size={18} className="mt-0.5 shrink-0 text-violet" aria-hidden="true" />
          <p className="text-sm">“Research our competitors, compare them, and draft a summary for the team.”</p>
        </div>
        <Connector />
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white">
          <Workflow size={17} aria-hidden="true" /> Orchestration layer
        </div>
        <Connector />
        <ul className="grid grid-cols-3 gap-2.5">
          {agentCatalog.map((a, i) => (
            <li key={a.id} className={clsx('float-soft flex flex-col items-center gap-1.5 rounded-2xl border p-2.5 text-center', agentAccentClasses[a.accent].border, agentAccentClasses[a.accent].soft)} style={{ animationDelay: `${i * 0.35}s` }}>
              <AgentIcon icon={a.icon} accent={a.accent} size={18} className="size-9 bg-surface" />
              <span className={clsx('text-xs font-semibold', agentAccentClasses[a.accent].ink)}>{a.shortName}</span>
            </li>
          ))}
        </ul>
        <div className="my-1 flex justify-center text-violet/60" aria-hidden="true"><ArrowDown size={22} /></div>
        <div className="flex items-center gap-3 rounded-2xl border border-mint/50 bg-mint-soft p-3.5">
          <FileCheck2 size={20} className="shrink-0 text-mint-ink" aria-hidden="true" />
          <p className="text-sm font-medium text-mint-ink">Delivered: a clear, reviewable result</p>
        </div>
      </Card>
      <figcaption className="mt-3 text-center text-xs text-ink-soft">Conceptual illustration, not a live execution.</figcaption>
    </figure>
  )
}
