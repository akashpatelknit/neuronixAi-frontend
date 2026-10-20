import { BookOpenCheck, Code2, LineChart, ListChecks, Microscope, PenLine, Sparkles, type LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { agentAccentClasses } from '../data/agentAccents'
import { findAgentDefinition } from '../data/agentCatalog'
import type { AgentAccent, AgentIconName } from '../types/agent.types'

const icons: Record<AgentIconName, LucideIcon> = {
  planning: ListChecks,
  coding: Code2,
  writing: PenLine,
  research: Microscope,
  analysis: LineChart,
  knowledge: BookOpenCheck,
  generic: Sparkles,
}

export function AgentIcon({ icon, accent, size = 20, className }: { icon: AgentIconName; accent: AgentAccent; size?: number; className?: string }) {
  const Icon = icons[icon]
  const a = agentAccentClasses[accent]
  return (
    <span className={cn('inline-flex size-10 shrink-0 items-center justify-center rounded-xl', a.soft, a.ink, className)}>
      <Icon size={size} aria-hidden="true" />
    </span>
  )
}

/** Icon + name for an agent id, falling back to a generic look for unknown agents. */
export function AgentChip({ agentId }: { agentId: string }) {
  const def = findAgentDefinition(agentId)
  const a = agentAccentClasses[def?.accent ?? 'violet']
  return (
    <Badge variant="secondary" className={cn('rounded-full px-2.5 py-1 font-semibold', a.soft, a.ink)}>
      <AgentIcon icon={def?.icon ?? 'generic'} accent={def?.accent ?? 'violet'} size={13} className="size-auto bg-transparent" />
      {def?.shortName ?? agentId}
    </Badge>
  )
}
