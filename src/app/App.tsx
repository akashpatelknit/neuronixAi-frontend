import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppErrorBoundary } from '@/components/feedback/AppErrorBoundary'
import { Loader2 } from 'lucide-react'
import { AppProviders } from './AppProviders'
import { router } from './router'

export default function App() {
  return (
    <AppErrorBoundary>
      <AppProviders>
        <Suspense fallback={<div className="grid min-h-screen place-items-center text-violet"><Loader2 className="size-7 animate-spin" aria-label="Loading" /></div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AppProviders>
    </AppErrorBoundary>
  )
}
