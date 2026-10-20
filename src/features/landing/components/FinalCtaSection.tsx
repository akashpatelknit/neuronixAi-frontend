import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function FinalCtaSection() {
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand-gradient px-6 py-16 text-center text-white shadow-lift">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-white/10" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-10 size-56 rounded-full bg-white/10" aria-hidden="true" />
        <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Focus on the outcome. Let NeuronixAI coordinate the work.</h2>
        <Button asChild variant="outline" size="lg" className="relative mt-8 border-transparent text-violet-ink"><Link to="/register">Get Started</Link></Button>
      </div>
    </section>
  )
}
