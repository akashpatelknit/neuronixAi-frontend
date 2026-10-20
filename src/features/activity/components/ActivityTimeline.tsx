import { CheckCircle2, Cpu, FilePlus2, PlayCircle, Wrench, XCircle, type LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import { formatDateTime } from '@/utils/dateUtils'
import type { ActivityEvent, ActivityType } from '../types/activity.types'

export const activityTypeLabels: Record<ActivityType, string> = {
  'task-created': 'Task created',
  'agent-started': 'Agent started',
  'agent-completed': 'Agent completed',
  'tool-executed': 'Tool executed',
  'execution-failed': 'Execution failed',
  'task-completed': 'Task completed',
}

const icons: Record<ActivityType, { Icon: LucideIcon; classes: string }> = {
  'task-created': { Icon: FilePlus2, classes: 'bg-violet-soft text-violet-ink' },
  'agent-started': { Icon: PlayCircle, classes: 'bg-blue-soft text-blue-ink' },
  'agent-completed': { Icon: Cpu, classes: 'bg-mint-soft text-mint-ink' },
  'tool-executed': { Icon: Wrench, classes: 'bg-cyan-soft text-cyan-ink' },
  'execution-failed': { Icon: XCircle, classes: 'bg-coral-soft text-coral-ink' },
  'task-completed': { Icon: CheckCircle2, classes: 'bg-mint-soft text-mint-ink' },
}

export function ActivityTimeline({ events }: { events: ActivityEvent[] }) {
  return (
    <ol className="space-y-3">
      {events.map((e) => {
        const { Icon, classes } = icons[e.type]
        return (
          <li key={e.id} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-card">
            <span className={clsx('flex size-9 shrink-0 items-center justify-center rounded-xl', classes)}><Icon size={17} aria-hidden="true" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{e.summary}</p>
              <p className="text-xs text-ink-soft">{activityTypeLabels[e.type]} · {formatDateTime(e.at)}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
