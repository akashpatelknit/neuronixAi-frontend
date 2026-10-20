import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, LogOut, Menu, Settings, Sparkles, UserRound } from 'lucide-react'
import { buttonClasses } from '@/components/ui/Button'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { titleForPath } from './navItems'

export function AppHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { pathname } = useLocation()
  const { session, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const title = titleForPath(pathname)
  const isDetail = pathname.split('/').length > 3

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => !menuRef.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface/90 px-4 backdrop-blur sm:px-6">
      <button type="button" onClick={onOpenMenu} aria-label="Open navigation" className="rounded-lg p-2 hover:bg-canvas lg:hidden"><Menu size={20} /></button>
      <div className="min-w-0 flex-1">
        {isDetail && (
          <p className="flex items-center gap-1 text-xs text-ink-soft"><span>{title}</span><ChevronRight size={12} aria-hidden="true" /><span>Details</span></p>
        )}
        <h1 className="truncate text-lg font-semibold">{title}</h1>
      </div>
      <Link to="/app/workspace" className={buttonClasses('primary', 'sm', 'hidden sm:inline-flex')}><Sparkles size={15} aria-hidden="true" /> New task</Link>
      <div className="relative" ref={menuRef}>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} aria-label="Account menu" className="flex size-10 items-center justify-center rounded-full bg-violet-soft text-violet-ink transition-ui hover:bg-violet/20"><UserRound size={18} /></button>
        {open && (
          <div role="menu" className="absolute right-0 mt-2 w-60 rounded-2xl border border-line bg-surface p-2 shadow-lift">
            <p className="truncate px-3 py-2 text-sm text-ink-soft">{session?.user.email}</p>
            <Link role="menuitem" to="/app/settings" onClick={() => setOpen(false)} className="flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm hover:bg-canvas"><Settings size={16} /> Settings</Link>
            <button role="menuitem" type="button" onClick={logout} className="flex min-h-10 w-full items-center gap-2 rounded-xl px-3 text-sm text-coral-ink hover:bg-coral-soft"><LogOut size={16} /> Log out</button>
          </div>
        )}
      </div>
    </header>
  )
}
