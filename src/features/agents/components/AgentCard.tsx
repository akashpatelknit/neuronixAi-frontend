import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { agentAccentClasses } from '../data/agentAccents'
import type { AgentAvailability } from '@/types/common.types'
import type { AgentDefinition } from '../types/agent.types'
import { AgentIcon } from './AgentIcon'
import { AgentStatus } from './AgentStatus'

type CardAgent = AgentDefinition & { availability?: AgentAvailability; notReportedByBackend?: boolean }

/** Used by both the landing page (static, no link) and the Agents page (links to details). */
export function AgentCard({ agent, to }: { agent: CardAgent; to?: string }) {
  const accent = agentAccentClasses[agent.accent]
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <AgentIcon icon={agent.icon} accent={agent.accent} />
        {agent.availability && <AgentStatus availability={agent.availability} />}
      </div>
      <h3 className="mt-4 text-base font-semibold">{agent.name}</h3>
      <p className="mt-1 text-sm text-ink-soft">{agent.description}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Capabilities">
        {agent.capabilities.map((c) => (
          <li key={c} className={clsx('rounded-full px-2.5 py-1 text-xs font-medium', accent.soft, accent.ink)}>
            {c}
          </li>
        ))}
      </ul>
      {agent.notReportedByBackend && <p className="mt-3 text-xs text-ink-soft">The backend did not report this agent.</p>}
    </>
  )
  const classes = 'block h-full rounded-2xl border border-line bg-surface p-5 shadow-card transition-ui hover:-translate-y-1 hover:shadow-lift'
  return to ? (
    <Link to={to} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  )
}
