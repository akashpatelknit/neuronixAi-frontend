import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppErrorBoundary } from '@/components/feedback/AppErrorBoundary'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { AppProviders } from './AppProviders'
import { router } from './router'

export default function App() {
  return (
    <AppErrorBoundary>
      <AppProviders>
        <Suspense fallback={<div className="grid min-h-screen place-items-center text-violet"><LoadingSpinner size={28} /></div>}>
          <RouterProvider router={router} />
        </Suspense>
      </AppProviders>
    </AppErrorBoundary>
  )
}
