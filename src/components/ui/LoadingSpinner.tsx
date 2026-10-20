import { Loader2 } from 'lucide-react'

export function LoadingSpinner({ size = 20, label }: { size?: number; label?: string }) {
  return (
    <span role="status" className="inline-flex items-center gap-2">
      <Loader2 size={size} className="animate-spin" aria-hidden="true" />
      {label ? <span className="text-sm">{label}</span> : <span className="sr-only">Loading</span>}
    </span>
  )
}
