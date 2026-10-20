import { Component, type ErrorInfo, type ReactNode } from 'react'
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
          <button className="mt-4 rounded-xl bg-violet px-4 py-2 font-semibold text-white" onClick={() => location.reload()}>
            Reload
          </button>
        </div>
      </div>
    )
  }
}
