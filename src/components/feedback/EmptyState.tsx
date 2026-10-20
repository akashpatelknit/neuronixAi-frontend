import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionTo?: string
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <Card className="border-dashed bg-card/60 shadow-none">
      <CardContent className="p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-violet-soft text-violet">
          <Icon size={24} aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-semibold">{title}</h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
        {actionLabel && actionTo && (
          <Button asChild className="mt-5">
            <Link to={actionTo}>{actionLabel}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
