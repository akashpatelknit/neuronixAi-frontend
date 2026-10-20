import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/feedback/ConfirmDialog'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function SecuritySettings() {
  const { logout } = useAuth()
  const [confirm, setConfirm] = useState(false)
  return (
    <Card>
      <CardHeader><CardTitle>Security</CardTitle></CardHeader>
      <div className="space-y-3 p-5 text-sm">
        <p className="text-ink-soft">Your session is stored for this browser tab only and cleared when you sign out. Password changes are not available until the backend supports them.</p>
        <Button variant="destructive" onClick={() => setConfirm(true)}>Sign out</Button>
      </div>
      <ConfirmDialog open={confirm} title="Sign out?" message="You will need to sign in again to continue." confirmLabel="Sign out" onConfirm={logout} onCancel={() => setConfirm(false)} />
    </Card>
  )
}
