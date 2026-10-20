import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { navItems } from './navItems'

export function SidebarNav({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <nav aria-label="Main" className="space-y-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/app'}
          title={collapsed ? label : undefined}
          onClick={onNavigate}
          className={({ isActive }) =>
            clsx(
              'flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-ui',
              collapsed && 'justify-center px-0',
              isActive ? 'bg-violet-soft text-violet-ink' : 'text-ink-soft hover:bg-canvas hover:text-ink',
            )
          }
        >
          <Icon size={19} aria-hidden="true" />
          <span className={clsx(collapsed && 'sr-only')}>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
