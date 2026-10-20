import { AccountSettings } from '../components/AccountSettings'
import { AiPreferences } from '../components/AiPreferences'
import { AppearanceSettings } from '../components/AppearanceSettings'
import { NotificationSettings } from '../components/NotificationSettings'
import { SecuritySettings } from '../components/SecuritySettings'

export default function SettingsPage() {
  return (
    <div className="mx-auto grid max-w-3xl gap-5">
      <AccountSettings />
      <SecuritySettings />
      <AppearanceSettings />
      <NotificationSettings />
      <AiPreferences />
    </div>
  )
}
