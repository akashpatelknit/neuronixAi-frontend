import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { logDiagnostics } from '@/utils/errorUtils'

export class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    logDiagnostics('Unhandled render error', { error, info })
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div role="alert" className="grid min-h-screen place-items-center p-6 text-center">
        <div>
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="mt-2 text-ink-soft">An unexpected error occurred. Please reload the page.</p>
          <Button className="mt-4" onClick={() => location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    )
  }
}
