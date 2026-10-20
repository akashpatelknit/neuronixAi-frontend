import type { ConversationSummary } from '../types/conversation.types'
import { ConversationItem } from './ConversationItem'

export function ConversationList({ conversations }: { conversations: ConversationSummary[] }) {
  return (
    <ul className="space-y-3">
      {conversations.map((c) => (
        <ConversationItem key={c.id} conversation={c} />
      ))}
    </ul>
  )
}
