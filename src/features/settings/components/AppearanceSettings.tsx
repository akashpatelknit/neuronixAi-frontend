import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export function AppearanceSettings() {
  return (
    <Card>
      <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
      <p className="p-5 text-sm text-ink-soft">NeuronixAI currently uses its light theme only. Theme options will appear here when additional themes are available.</p>
    </Card>
  )
}
