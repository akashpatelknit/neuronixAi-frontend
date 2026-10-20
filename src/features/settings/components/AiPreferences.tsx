import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export function AiPreferences() {
  return (
    <Card>
      <CardHeader><CardTitle>AI preferences</CardTitle></CardHeader>
      <p className="p-5 text-sm text-ink-soft">NeuronixAI routes each task automatically. Manual agent or model selection is not offered because the backend does not expose it.</p>
    </Card>
  )
}
