import { Link, useLocation } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { navItems } from './navItems'

export function SidebarNav({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  const { pathname } = useLocation()
  const isActive = (to: string) => (to === '/app' ? pathname === '/app' : pathname.startsWith(to))
  return (
    <nav aria-label="Main" className="space-y-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <Tooltip key={to} open={collapsed ? undefined : false}>
          <TooltipTrigger asChild>
            <Link
              to={to}
              onClick={onNavigate}
              aria-current={isActive(to) ? 'page' : undefined}
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-ui',
                collapsed && 'justify-center px-0',
                isActive(to) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-background hover:text-foreground',
              )}
            >
              <Icon size={19} aria-hidden="true" />
              <span className={cn(collapsed && 'sr-only')}>{label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      ))}
    </nav>
  )
}
