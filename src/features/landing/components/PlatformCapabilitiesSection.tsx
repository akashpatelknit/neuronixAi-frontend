import { Card } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { platformCapabilities } from '../data/landingContent'

export function PlatformCapabilitiesSection() {
  return (
    <section id="capabilities" className="bg-surface/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight">Platform capabilities</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink-soft">What NeuronixAI is built to do. Exact availability depends on what your backend deployment supports.</p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platformCapabilities.map((c) => (
            <li key={c.title}><Card className="flex-row gap-3 p-5">
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-violet" aria-hidden="true" />
              <div><h3 className="font-semibold">{c.title}</h3><p className="mt-1 text-sm text-ink-soft">{c.body}</p></div>
            </Card></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
