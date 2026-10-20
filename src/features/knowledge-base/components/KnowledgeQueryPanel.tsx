import { useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
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
      <CardHeader><CardTitle>Ask your documents</CardTitle><CardDescription>Answers are grounded in documents you uploaded.</CardDescription></CardHeader>
      <form onSubmit={submit} className="space-y-3 p-5">
        <label htmlFor="kb-question" className="sr-only">Question about your documents</label>
        <Input id="kb-question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. How does authentication work in our architecture?" className="h-11" />
        <Button type="submit" disabled={ask.isPending || !question.trim()}>{ask.isPending && <Loader2 className="animate-spin" />}Ask</Button>
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
