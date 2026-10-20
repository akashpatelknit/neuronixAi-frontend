import { Link } from 'react-router-dom'
import { MessagesSquare } from 'lucide-react'
import { formatRelative } from '@/utils/dateUtils'
import type { ConversationSummary } from '../types/conversation.types'

export function ConversationItem({ conversation }: { conversation: ConversationSummary }) {
  return (
    <li>
      <Link to={`/app/conversations/${conversation.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-card transition-ui hover:border-violet/40">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-soft text-violet-ink"><MessagesSquare size={18} aria-hidden="true" /></span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-medium">{conversation.title}</span>
          {conversation.preview && <span className="block truncate text-sm text-ink-soft">{conversation.preview}</span>}
        </span>
        <span className="shrink-0 text-xs text-ink-soft">{formatRelative(conversation.updatedAt)}</span>
      </Link>
    </li>
  )
}
