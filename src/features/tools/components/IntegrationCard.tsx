import { Plug } from 'lucide-react'
import { Pill } from '@/components/ui/StatusBadge'
import type { Integration } from '../types/integration.types'

export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-violet-soft text-violet-ink"><Plug size={18} aria-hidden="true" /></span>
        <Pill tone={integration.status === 'connected' ? 'mint' : 'amber'}>{integration.status === 'connected' ? 'Connected' : 'Coming soon'}</Pill>
      </div>
      <h3 className="mt-4 font-semibold">{integration.name}</h3>
      <p className="mt-1 text-sm text-ink-soft">{integration.description}</p>
    </div>
  )
}
