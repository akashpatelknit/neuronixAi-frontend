import { Skeleton } from '@/components/ui/skeleton'

export function ListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div role="status" aria-label="Loading" className="space-y-3">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-xl" />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  )
}
