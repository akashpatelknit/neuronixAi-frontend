import { CheckCircle2, CircleDashed, Loader2, XCircle } from 'lucide-react'
import clsx from 'clsx'
import type { DocumentStatus as Status } from '../types/knowledgeBase.types'

const config = {
  uploaded: { label: 'Uploaded', Icon: CircleDashed, classes: 'bg-neutral-soft text-ink-soft' },
  processing: { label: 'Indexing', Icon: Loader2, classes: 'bg-violet-soft text-violet-ink' },
  indexed: { label: 'Indexed', Icon: CheckCircle2, classes: 'bg-mint-soft text-mint-ink' },
  failed: { label: 'Failed', Icon: XCircle, classes: 'bg-coral-soft text-coral-ink' },
} satisfies Record<Status, { label: string; Icon: typeof XCircle; classes: string }>

export function DocumentStatus({ status }: { status: Status }) {
  const { label, Icon, classes } = config[status]
  return (
    <span className={clsx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', classes)}>
      <Icon size={13} aria-hidden="true" className={status === 'processing' ? 'animate-spin motion-reduce:animate-none' : undefined} />
      {label}
    </span>
  )
}
