import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import clsx from 'clsx'
import { Logo } from './Logo'
import { SidebarNav } from './SidebarNav'

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={clsx('sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-surface p-3 transition-[width] duration-200 lg:flex', collapsed ? 'w-[4.5rem]' : 'w-64')}>
      <div className={clsx('flex h-14 items-center', collapsed ? 'justify-center' : 'px-2')}>
        <Logo to="/app" showText={!collapsed} />
      </div>
      <div className="mt-2 flex-1 overflow-y-auto"><SidebarNav collapsed={collapsed} /></div>
      <button type="button" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="flex min-h-11 items-center justify-center gap-2 rounded-xl text-sm text-ink-soft transition-ui hover:bg-canvas">
        {collapsed ? <PanelLeftOpen size={18} /> : <><PanelLeftClose size={18} /> Collapse</>}
      </button>
    </aside>
  )
}
