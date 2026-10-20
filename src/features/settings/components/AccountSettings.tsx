import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function AccountSettings() {
  const { session } = useAuth()
  return (
    <Card>
      <CardHeader><CardTitle>Account</CardTitle></CardHeader>
      <dl className="space-y-3 p-5 text-sm">
        <div><dt className="text-ink-soft">Email</dt><dd className="font-medium">{session?.user.email}</dd></div>
        {session?.user.name && <div><dt className="text-ink-soft">Name</dt><dd className="font-medium">{session.user.name}</dd></div>}
      </dl>
      <p className="border-t border-line px-5 py-3 text-xs text-ink-soft">Editing account details is not available until the backend exposes it.</p>
    </Card>
  )
}
