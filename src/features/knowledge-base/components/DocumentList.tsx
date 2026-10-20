import { FileText } from 'lucide-react'
import { formatDateTime } from '@/utils/dateUtils'
import type { KnowledgeDocument } from '../types/knowledgeBase.types'
import { DocumentStatus } from './DocumentStatus'

const formatSize = (bytes?: number) => (bytes === undefined ? '—' : bytes < 1_000_000 ? `${(bytes / 1000).toFixed(0)} KB` : `${(bytes / 1_000_000).toFixed(1)} MB`)

export function DocumentList({ documents }: { documents: KnowledgeDocument[] }) {
  return (
    <ul className="divide-y divide-line rounded-2xl border border-line bg-surface shadow-card">
      {documents.map((d) => (
        <li key={d.id} className="flex flex-wrap items-center gap-3 p-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint-soft text-mint-ink"><FileText size={18} aria-hidden="true" /></span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{d.name}</p>
            <p className="text-xs text-ink-soft">
              {formatSize(d.sizeBytes)} · Uploaded {formatDateTime(d.uploadedAt)}
              {d.chunkCount !== undefined && <> · {d.chunkCount} chunks</>}
            </p>
            {d.error && <p role="alert" className="mt-1 text-sm text-coral-ink">{d.error}</p>}
          </div>
          <DocumentStatus status={d.status} />
        </li>
      ))}
    </ul>
  )
}
