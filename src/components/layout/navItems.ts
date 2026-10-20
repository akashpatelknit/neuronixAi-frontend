import { Activity, Bot, FileStack, LayoutDashboard, ListTodo, MessagesSquare, Plug, Settings, Sparkles, type LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  title: string
}

export const navItems: NavItem[] = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, title: 'Dashboard' },
  { to: '/app/workspace', label: 'AI Workspace', icon: Sparkles, title: 'AI Workspace' },
  { to: '/app/agents', label: 'Agents', icon: Bot, title: 'Agents' },
  { to: '/app/tasks', label: 'Tasks', icon: ListTodo, title: 'Tasks' },
  { to: '/app/conversations', label: 'Conversations', icon: MessagesSquare, title: 'Conversations' },
  { to: '/app/activity', label: 'Activity', icon: Activity, title: 'Activity' },
  { to: '/app/knowledge-base', label: 'Knowledge Base', icon: FileStack, title: 'Knowledge Base' },
  { to: '/app/tools', label: 'Tools', icon: Plug, title: 'Tools' },
  { to: '/app/settings', label: 'Settings', icon: Settings, title: 'Settings' },
]

export function titleForPath(pathname: string): string {
  const match = [...navItems].reverse().find((i) => (i.to === '/app' ? pathname === '/app' : pathname.startsWith(i.to)))
  return match?.title ?? 'NeuronixAI'
}
