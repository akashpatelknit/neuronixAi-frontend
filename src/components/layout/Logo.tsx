import { Link } from 'react-router-dom'

export function Logo({ to = '/', showText = true }: { to?: string; showText?: boolean }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 font-semibold" aria-label="NeuronixAI home">
      <span className="flex size-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-card" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 18V6l10 12V6" /></svg>
      </span>
      {showText && <span className="text-lg tracking-tight">Neuronix<span className="text-violet">AI</span></span>}
    </Link>
  )
}
