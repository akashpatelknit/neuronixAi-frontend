import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, MessagesSquare, Search } from 'lucide-react'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { SkeletonList } from '@/components/ui/Skeleton'
import { buttonClasses } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatDateTime } from '@/utils/dateUtils'
import { ConversationList } from '../components/ConversationList'
import { conversationApi } from '../services/conversationApi'
import clsx from 'clsx'

function ConversationView({ id }: { id: string }) {
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ['conversation', id], queryFn: () => conversationApi.get(id) })
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Link to="/app/conversations" className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-ink hover:underline">
        <ArrowLeft size={16} aria-hidden="true" /> All conversations
      </Link>
      {isLoading && <SkeletonList rows={3} />}
      {error && <ErrorState error={error} onRetry={refetch} title="Could not load this conversation" />}
      {data && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold">{data.title}</h2>
            {data.simulated && <SimulatedNotice />}
          </div>
          <Card className="space-y-3 p-5">
            {data.messages.map((m) => (
              <div key={m.id} className={clsx('max-w-[85%] rounded-2xl px-4 py-2.5 text-sm', m.role === 'user' ? 'ml-auto bg-violet text-white' : 'bg-canvas')}>
                <p className="whitespace-pre-wrap">{m.content}</p>
                <p className={clsx('mt-1 text-xs', m.role === 'user' ? 'text-white/80' : 'text-ink-soft')}>{formatDateTime(m.at)}</p>
              </div>
            ))}
            {data.messages.length === 0 && <p className="text-sm text-ink-soft">This conversation has no messages.</p>}
          </Card>
          <Link to="/app/workspace" className={buttonClasses('secondary')}>Start a new task in the Workspace</Link>
          <p className="text-xs text-ink-soft">Continuing an existing conversation is not available until the backend confirms support.</p>
        </>
      )}
    </div>
  )
}

export default function ConversationsPage() {
  const { conversationId } = useParams()
  const [search, setSearch] = useState('')
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ['conversations'], queryFn: conversationApi.list })
  if (conversationId) return <ConversationView id={conversationId} />

  const needle = search.trim().toLowerCase()
  const items = (data ?? []).filter((c) => !needle || c.title.toLowerCase().includes(needle) || c.preview?.toLowerCase().includes(needle))
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {data?.some((c) => c.simulated) && <SimulatedNotice />}
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
        <input type="search" aria-label="Search conversations" placeholder="Search conversations" value={search} onChange={(e) => setSearch(e.target.value)} className="min-h-11 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-sm focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20" />
      </div>
      {isLoading && <SkeletonList />}
      {error && <ErrorState error={error} onRetry={refetch} title="Could not load conversations" />}
      {data && items.length === 0 && (
        <EmptyState icon={MessagesSquare} title={search ? 'No conversations match' : 'No conversations yet'} description={search ? 'Try a different search.' : 'Start a task to create your first conversation.'} actionLabel={search ? undefined : 'Open AI Workspace'} actionTo="/app/workspace" />
      )}
      {items.length > 0 && <ConversationList conversations={items} />}
    </div>
  )
}
