import { Link } from 'react-router-dom'
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRelative } from '@/utils/dateUtils'
import type { ActivityEvent } from '@/features/activity/types/activity.types'
import type { ConversationSummary } from '@/features/conversations/types/conversation.types'

export function RecentAgentActivity({ events, conversations }: { events: ActivityEvent[]; conversations: ConversationSummary[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Agent activity</CardTitle><CardAction><Link to="/app/activity" className="text-sm font-medium text-violet-ink hover:underline">View all</Link></CardAction></CardHeader>
        {events.length === 0 ? <p className="p-5 text-sm text-ink-soft">No agent activity yet.</p> : (
          <ul className="divide-y divide-line">
            {events.map((e) => (
              <li key={e.id} className="px-5 py-3 text-sm"><p>{e.summary}</p><p className="text-xs text-ink-soft">{formatRelative(e.at)}</p></li>
            ))}
          </ul>
        )}
      </Card>
      <Card>
        <CardHeader><CardTitle>Recent conversations</CardTitle><CardAction><Link to="/app/conversations" className="text-sm font-medium text-violet-ink hover:underline">View all</Link></CardAction></CardHeader>
        {conversations.length === 0 ? <p className="p-5 text-sm text-ink-soft">No conversations yet. Start a task to create your first conversation.</p> : (
          <ul className="divide-y divide-line">
            {conversations.map((c) => (
              <li key={c.id}><Link to={`/app/conversations/${c.id}`} className="block px-5 py-3 text-sm transition-ui hover:bg-violet-soft/40"><p className="truncate font-medium">{c.title}</p><p className="text-xs text-ink-soft">{formatRelative(c.updatedAt)}</p></Link></li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
