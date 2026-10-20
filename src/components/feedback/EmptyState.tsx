import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '@/components/ui/Button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionTo?: string
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface/60 p-8 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-violet-soft text-violet">
        <Icon size={24} aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">{description}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className={buttonClasses('primary', 'md', 'mt-5')}>
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
