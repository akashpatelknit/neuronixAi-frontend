import { FlaskConical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

/** Shown wherever demo-mode data is displayed so it is never mistaken for real activity. */
export function SimulatedNotice({ children = 'Simulated demo data — not real backend activity.' }: { children?: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="h-auto whitespace-normal rounded-lg bg-amber-soft px-2.5 py-1 font-medium text-amber-ink">
      <FlaskConical aria-hidden="true" />
      {children}
    </Badge>
  )
}
