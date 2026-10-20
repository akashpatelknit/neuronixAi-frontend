import { CheckCircle2, CircleDashed, Hourglass, Loader2, XCircle } from 'lucide-react'
import clsx from 'clsx'
import type { ExecutionStatus } from '@/types/common.types'

const config: Record<ExecutionStatus, { label: string; classes: string; Icon: typeof CheckCircle2; spin?: boolean }> = {
  pending: { label: 'Pending', classes: 'bg-neutral-soft text-ink-soft', Icon: CircleDashed },
  running: { label: 'Running', classes: 'bg-violet-soft text-violet-ink', Icon: Loader2, spin: true },
  waiting: { label: 'Waiting', classes: 'bg-amber-soft text-amber-ink', Icon: Hourglass },
  completed: { label: 'Completed', classes: 'bg-mint-soft text-mint-ink', Icon: CheckCircle2 },
  failed: { label: 'Failed', classes: 'bg-coral-soft text-coral-ink', Icon: XCircle },
}

export function statusLabel(status: ExecutionStatus) {
  return config[status].label
}

/** Status is always shown with an icon and a text label, never color alone. */
export function StatusBadge({ status, className }: { status: ExecutionStatus; className?: string }) {
  const { label, classes, Icon, spin } = config[status]
  return (
    <span className={clsx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', classes, className)}>
      <Icon size={13} aria-hidden="true" className={spin ? 'animate-spin motion-reduce:animate-none' : undefined} />
      {label}
    </span>
  )
}

export function Pill({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'violet' | 'amber' | 'mint' | 'coral' }) {
  const tones = {
    neutral: 'bg-neutral-soft text-ink-soft',
    violet: 'bg-violet-soft text-violet-ink',
    amber: 'bg-amber-soft text-amber-ink',
    mint: 'bg-mint-soft text-mint-ink',
    coral: 'bg-coral-soft text-coral-ink',
  }
  return <span className={clsx('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', tones[tone])}>{children}</span>
}
