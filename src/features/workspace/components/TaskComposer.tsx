import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { SendHorizonal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const MAX_LENGTH = 4000

interface TaskComposerProps {
  onSubmit: (prompt: string) => Promise<void> | void
  disabled?: boolean
  placeholder?: string
  rows?: number
}

export function TaskComposer({ onSubmit, disabled, placeholder = 'Describe your goal in plain language…', rows = 3 }: TaskComposerProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string>()
  const ref = useRef<HTMLTextAreaElement>(null)

  const submit = async (e?: FormEvent) => {
    e?.preventDefault()
    const prompt = value.trim()
    if (!prompt) return setError('Describe what you would like NeuronixAI to accomplish.')
    if (prompt.length > MAX_LENGTH) return setError(`Please keep your request under ${MAX_LENGTH} characters.`)
    setError(undefined)
    setValue('')
    await onSubmit(prompt)
    ref.current?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void submit()
  }

  return (
    <form onSubmit={submit}><Card className="p-3 focus-within:border-violet focus-within:ring-2 focus-within:ring-violet/15">
      <Label htmlFor="task-input" className="px-1 text-sm font-semibold">
        What would you like NeuronixAI to accomplish?
      </Label>
      <Textarea
        id="task-input"
        ref={ref}
        value={value}
        rows={rows}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'task-input-error' : 'task-input-hint'}
        className="mt-2 resize-none border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent"
      />
      <div className="flex items-center justify-between gap-3">
        {error ? (
          <p id="task-input-error" role="alert" className="text-sm text-coral-ink">
            {error}
          </p>
        ) : (
          <p id="task-input-hint" className="text-xs text-ink-soft">
            <kbd className="rounded bg-neutral-soft px-1">Ctrl</kbd>/<kbd className="rounded bg-neutral-soft px-1">⌘</kbd> + <kbd className="rounded bg-neutral-soft px-1">Enter</kbd> to send
          </p>
        )}
        <Button type="submit" disabled={disabled || !value.trim()} className="shrink-0 bg-brand-gradient">
          Send <SendHorizonal size={16} aria-hidden="true" />
        </Button>
      </div>
    </Card></form>
  )
}
