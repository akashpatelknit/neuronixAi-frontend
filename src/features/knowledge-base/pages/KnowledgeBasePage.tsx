import { useQuery } from '@tanstack/react-query'
import { FileStack } from 'lucide-react'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { SimulatedNotice } from '@/components/feedback/SimulatedNotice'
import { SkeletonList } from '@/components/ui/Skeleton'
import { DocumentList } from '../components/DocumentList'
import { DocumentUpload } from '../components/DocumentUpload'
import { KnowledgeQueryPanel } from '../components/KnowledgeQueryPanel'
import { knowledgeBaseApi } from '../services/knowledgeBaseApi'

export default function KnowledgeBasePage() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['documents'],
    queryFn: knowledgeBaseApi.listDocuments,
    // Keep checking only while something is still being indexed.
    refetchInterval: (q) => (q.state.data?.some((d) => d.status === 'processing') ? 5000 : false),
  })
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <p className="text-ink-soft">The Knowledge / RAG Agent answers from your documents. Upload files here; NeuronixAI can also draw on them when you describe a task in the Workspace.</p>
      {data?.some((d) => d.simulated) && <SimulatedNotice />}
      <DocumentUpload />
      {isLoading && <SkeletonList rows={3} />}
      {error && <ErrorState error={error} onRetry={refetch} title="Could not load documents" />}
      {data && data.length === 0 && <EmptyState icon={FileStack} title="No documents yet" description="Upload a document to let NeuronixAI answer questions from your own knowledge." />}
      {data && data.length > 0 && <DocumentList documents={data} />}
      <KnowledgeQueryPanel />
    </div>
  )
}
