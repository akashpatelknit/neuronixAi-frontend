import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { SidebarNav } from './SidebarNav'

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={cn('sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-surface p-3 transition-[width] duration-200 lg:flex', collapsed ? 'w-[4.5rem]' : 'w-64')}>
      <div className={cn('flex h-14 items-center', collapsed ? 'justify-center' : 'px-2')}>
        <Logo to="/app" showText={!collapsed} />
      </div>
      <div className="mt-2 flex-1 overflow-y-auto"><SidebarNav collapsed={collapsed} /></div>
      <Button variant="ghost" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} className="h-11 text-muted-foreground">
        {collapsed ? <PanelLeftOpen /> : <><PanelLeftClose /> Collapse</>}
      </Button>
    </aside>
  )
}
