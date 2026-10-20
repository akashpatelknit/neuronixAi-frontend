import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { FlaskConical } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { appConfig } from '@/config/appConfig'
import { ListSkeleton } from '@/components/feedback/ListSkeleton'
import { AppHeader } from './AppHeader'
import { AppSidebar } from './AppSidebar'
import { MobileNavigation } from './MobileNavigation'

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [drawer, setDrawer] = useState(false)
  return (
    <div className="flex min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2">Skip to content</a>
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <MobileNavigation open={drawer} onClose={() => setDrawer(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        {appConfig.useMockData && (
          <Alert className="rounded-none border-0 border-b bg-amber-soft px-4 py-1.5 text-amber-ink">
            <FlaskConical aria-hidden="true" />
            <AlertDescription className="text-amber-ink">Demo mode — all data and executions are simulated and not connected to the NeuronixAI backend.</AlertDescription>
          </Alert>
        )}
        <AppHeader onOpenMenu={() => setDrawer(true)} />
        <main id="main" className="flex-1 p-4 sm:p-6">
          <Suspense fallback={<ListSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
