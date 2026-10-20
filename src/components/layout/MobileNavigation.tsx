import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Logo } from './Logo'
import { SidebarNav } from './SidebarNav'

/** Slide-in drawer for small screens, built on <dialog> for focus handling and Escape. */
export function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog ref={ref} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-label="Navigation" className="m-0 h-full max-h-none w-72 max-w-[85vw] bg-surface p-3 backdrop:bg-ink/40">
      <div className="flex h-14 items-center justify-between px-2">
        <Logo to="/app" />
        <button type="button" onClick={onClose} aria-label="Close navigation" className="rounded-lg p-2 hover:bg-canvas"><X size={18} /></button>
      </div>
      <SidebarNav onNavigate={onClose} />
    </dialog>
  )
}
