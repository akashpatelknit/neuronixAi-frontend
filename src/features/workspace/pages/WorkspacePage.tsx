import { Card } from '@/components/ui/card'
import { useEffect, useRef } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { appConfig } from '@/config/appConfig'
import { useSearchParams } from 'react-router-dom'
import { ConversationPanel } from '../components/ConversationPanel'
import { TaskComposer } from '../components/TaskComposer'
import { useTaskExecution } from '../hooks/useTaskExecution'

const SUGGESTIONS = [
  'Create a project roadmap for building a customer support application.',
  'Help me debug this Java exception.',
  'Write a professional proposal for our new product.',
  'Research a topic and prepare a comparison report.',
]

export default function WorkspacePage() {
  const { turns, submit, retry, reset } = useTaskExecution()
  const [params, setParams] = useSearchParams()
  const handedOff = useRef(false)

  // A prompt can be handed over from the dashboard composer (?prompt=...).
  useEffect(() => {
    const prompt = params.get('prompt')
    if (prompt && !handedOff.current) {
      handedOff.current = true
      setParams({}, { replace: true })
      void submit(prompt)
    }
  }, [params, setParams, submit])

  const busy = turns.some((t) => t.submitting)

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-ink-soft">Describe the outcome. NeuronixAI coordinates the work.</p>
        {turns.length > 0 && (
          <Button variant="outline" size="sm" onClick={reset}>
            <Plus size={14} aria-hidden="true" /> New conversation
          </Button>
        )}
      </div>
      {appConfig.useMockData && <SimulatedNotice>Demo mode: workflows below are simulated and do not run on the backend.</SimulatedNotice>}

      {turns.length === 0 ? (
        <Card className="p-6 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-gradient text-white">
            <Sparkles size={22} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-semibold">Give NeuronixAI something to accomplish</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-ink-soft">No need to choose an agent. Describe your goal and the backend decides which capabilities to use.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => void submit(s)} className="rounded-full border border-line px-3 py-1.5 text-left text-xs transition-ui hover:border-violet/40 hover:bg-violet-soft">
                {s}
              </button>
            ))}
          </div>
        </Card>
      ) : (
        <ConversationPanel turns={turns} onRetry={(id) => retry(id)} />
      )}

      <div className="sticky bottom-3">
        <TaskComposer onSubmit={submit} disabled={busy} />
      </div>
    </div>
  )
}
