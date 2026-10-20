import { Card, CardHeader } from '@/components/ui/Card'

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader title="Notifications" />
      <p className="p-5 text-sm text-ink-soft">Notification preferences are not available yet because no notification service is connected. Nothing here is saved.</p>
    </Card>
  )
}
