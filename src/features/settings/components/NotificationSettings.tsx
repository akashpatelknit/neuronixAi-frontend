import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
      <p className="p-5 text-sm text-ink-soft">Notification preferences are not available yet because no notification service is connected. Nothing here is saved.</p>
    </Card>
  )
}
