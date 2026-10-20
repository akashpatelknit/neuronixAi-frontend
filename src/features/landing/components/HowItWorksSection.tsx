import { howItWorksSteps } from '../data/landingContent'

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h2 className="text-center text-3xl font-bold tracking-tight">How It Works</h2>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {howItWorksSteps.map((s, i) => (
          <li key={s.title} className="rounded-2xl border border-line bg-surface p-6 shadow-card">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-gradient font-bold text-white">{i + 1}</span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
