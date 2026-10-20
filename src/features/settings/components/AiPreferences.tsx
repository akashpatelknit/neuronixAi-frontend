import { Card, CardHeader } from '@/components/ui/Card'

export function AiPreferences() {
  return (
    <Card>
      <CardHeader title="AI preferences" />
      <p className="p-5 text-sm text-ink-soft">NeuronixAI routes each task automatically. Manual agent or model selection is not offered because the backend does not expose it.</p>
    </Card>
  )
}
