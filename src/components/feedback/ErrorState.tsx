import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getErrorMessage } from '@/utils/errorUtils'

export function ErrorState({ error, onRetry, title = 'We could not load this' }: { error: unknown; onRetry?: () => void; title?: string }) {
  return (
    <div role="alert" className="rounded-2xl border border-coral/30 bg-coral-soft p-6 text-center">
      <AlertTriangle className="mx-auto text-coral-ink" size={28} aria-hidden="true" />
      <h3 className="mt-3 font-semibold text-coral-ink">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">{getErrorMessage(error)}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  )
}
