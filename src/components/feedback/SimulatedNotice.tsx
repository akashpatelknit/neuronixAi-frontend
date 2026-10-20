import { FlaskConical } from 'lucide-react'

/** Shown wherever demo-mode data is displayed so it is never mistaken for real activity. */
export function SimulatedNotice({ children = 'Simulated demo data — not real backend activity.' }: { children?: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-1.5 rounded-lg bg-amber-soft px-2.5 py-1 text-xs font-medium text-amber-ink">
      <FlaskConical size={13} aria-hidden="true" />
      {children}
    </p>
  )
}
