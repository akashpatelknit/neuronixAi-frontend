import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AgentOrchestrationVisual } from './AgentOrchestrationVisual'

export function HeroSection() {
  return (
    <section className="bg-hero-gradient">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:pt-20">
        <div>
          <p className="inline-flex items-center rounded-full bg-violet-soft px-3 py-1 text-sm font-semibold text-violet-ink">Multi-agent AI workspace</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            One AI Workspace. <span className="text-brand-gradient">A Team of Specialized Agents.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">
            Tell NeuronixAI what you want to accomplish. From coding and planning to writing, research, analysis, and document intelligence, it brings the right AI capabilities together around your goal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brand-gradient"><Link to="/register">Start Building <ArrowRight size={18} aria-hidden="true" /></Link></Button>
            <Button asChild variant="outline" size="lg"><a href="#product">Explore the Platform</a></Button>
          </div>
          <p className="mt-6 text-sm text-ink-soft">One workspace. Multiple specialized capabilities. A clearer path from idea to result.</p>
        </div>
        <AgentOrchestrationVisual />
      </div>
    </section>
  )
}
