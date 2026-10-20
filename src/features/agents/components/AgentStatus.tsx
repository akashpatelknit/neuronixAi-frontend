import { CircleCheck, CircleSlash, Clock } from 'lucide-react'
import clsx from 'clsx'
import type { AgentAvailability } from '@/types/common.types'

const config = {
  available: { label: 'Available', Icon: CircleCheck, classes: 'bg-mint-soft text-mint-ink' },
  'coming-soon': { label: 'Coming soon', Icon: Clock, classes: 'bg-amber-soft text-amber-ink' },
  unavailable: { label: 'Not available', Icon: CircleSlash, classes: 'bg-neutral-soft text-ink-soft' },
} satisfies Record<AgentAvailability, { label: string; Icon: typeof Clock; classes: string }>

export function AgentStatus({ availability }: { availability: AgentAvailability }) {
  const { label, Icon, classes } = config[availability]
  return (
    <span className={clsx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', classes)}>
      <Icon size={13} aria-hidden="true" />
      {label}
    </span>
  )
}
