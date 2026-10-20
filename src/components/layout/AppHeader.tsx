import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, LogOut, Menu, Settings, Sparkles, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { titleForPath } from './navItems'

export function AppHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { pathname } = useLocation()
  const { session, logout } = useAuth()
  const title = titleForPath(pathname)
  const isDetail = pathname.split('/').length > 3

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-card/90 px-4 backdrop-blur sm:px-6">
      <Button variant="ghost" size="icon" onClick={onOpenMenu} aria-label="Open navigation" className="lg:hidden"><Menu /></Button>
      <div className="min-w-0 flex-1">
        {isDetail && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground"><span>{title}</span><ChevronRight size={12} aria-hidden="true" /><span>Details</span></p>
        )}
        <h1 className="truncate text-lg font-semibold">{title}</h1>
      </div>
      <Button asChild size="sm" className="hidden bg-brand-gradient sm:inline-flex"><Link to="/app/workspace"><Sparkles /> New task</Link></Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon-lg" className="rounded-full" aria-label="Account menu"><UserRound /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel className="truncate font-normal text-muted-foreground">{session?.user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><Link to="/app/settings"><Settings /> Settings</Link></DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={logout}><LogOut /> Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
