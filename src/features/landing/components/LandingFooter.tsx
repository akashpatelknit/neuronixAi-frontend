import { Link } from 'react-router-dom'
import { Logo } from '@/components/layout/Logo'
import { navLinks } from '../data/landingContent'

export function LandingFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-2 max-w-xs text-sm text-ink-soft">An intelligent AI workspace where specialized agents coordinate around your goals.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          {navLinks.map((l) => <a key={l.href} href={l.href} className="hover:text-violet-ink">{l.label}</a>)}
          <Link to="/login" className="hover:text-violet-ink">Login</Link>
          <Link to="/register" className="hover:text-violet-ink">Get Started</Link>
        </nav>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-ink-soft">© {new Date().getFullYear()} NeuronixAI</p>
    </footer>
  )
}
