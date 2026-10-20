import { Card, CardHeader } from '@/components/ui/Card'

export function AppearanceSettings() {
  return (
    <Card>
      <CardHeader title="Appearance" />
      <p className="p-5 text-sm text-ink-soft">NeuronixAI currently uses its light theme only. Theme options will appear here when additional themes are available.</p>
    </Card>
  )
}
