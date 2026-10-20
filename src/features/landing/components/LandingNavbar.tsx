import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { buttonClasses } from '@/components/ui/Button'
import { navLinks } from '../data/landingContent'

export function LandingNavbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink-soft transition-ui hover:text-violet-ink">{l.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login" className={buttonClasses('ghost', 'md')}>Login</Link>
          <Link to="/register" className={buttonClasses('primary', 'md')}>Get Started</Link>
        </div>
        <button type="button" className="rounded-lg p-2 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="landing-menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div id="landing-menu" className="border-t border-line bg-surface px-4 py-3 md:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-violet-soft">{l.label}</a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link to="/login" className={buttonClasses('secondary')}>Login</Link>
            <Link to="/register" className={buttonClasses('primary')}>Get Started</Link>
          </div>
        </div>
      )}
    </header>
  )
}
