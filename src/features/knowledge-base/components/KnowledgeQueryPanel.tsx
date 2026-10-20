import { useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader } from '@/components/ui/Card'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { getErrorMessage } from '@/utils/errorUtils'
import { knowledgeBaseApi } from '../services/knowledgeBaseApi'

export function KnowledgeQueryPanel() {
  const [question, setQuestion] = useState('')
  const ask = useMutation({ mutationFn: knowledgeBaseApi.query })
  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (question.trim()) ask.mutate(question.trim())
  }
  return (
    <Card>
      <CardHeader title="Ask your documents" subtitle="Answers are grounded in documents you uploaded." />
      <form onSubmit={submit} className="space-y-3 p-5">
        <label htmlFor="kb-question" className="sr-only">Question about your documents</label>
        <input id="kb-question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. How does authentication work in our architecture?" className="min-h-11 w-full rounded-xl border border-line px-3.5 text-sm focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20" />
        <Button type="submit" loading={ask.isPending} disabled={!question.trim()}>Ask</Button>
      </form>
      <div className="px-5 pb-5" aria-live="polite">
        {ask.error && <p role="alert" className="text-sm text-coral-ink">{getErrorMessage(ask.error)}</p>}
        {ask.data && (
          <div className="space-y-3">
            {ask.data.simulated && <SimulatedNotice />}
            <p className="whitespace-pre-wrap rounded-xl bg-mint-soft/50 p-4 text-sm">{ask.data.answer || 'No answer was returned.'}</p>
            {ask.data.sources.length > 0 && (
              <ul className="space-y-2 text-xs text-ink-soft">
                {ask.data.sources.map((s, i) => (
                  <li key={i}><strong className="text-ink">{s.documentName}</strong>: {s.snippet}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
