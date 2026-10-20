import { appConfig } from '@/config/appConfig'
import { apiRequest } from '@/services/apiClient'
import { endpoints } from '@/services/endpoints'
import { mockDocuments } from '@/mocks/mockData'
import { asString, unwrapList } from '@/utils/responseUtils'
import type { DocumentStatus, KnowledgeAnswer, KnowledgeDocument } from '../types/knowledgeBase.types'

function toStatus(raw: unknown): DocumentStatus {
  const v = String(raw ?? '').toLowerCase()
  if (['indexed', 'ready', 'completed', 'embedded'].includes(v)) return 'indexed'
  if (['processing', 'indexing', 'embedding', 'in_progress'].includes(v)) return 'processing'
  if (['failed', 'error'].includes(v)) return 'failed'
  return 'uploaded'
}

function toDocument(raw: Record<string, unknown>): KnowledgeDocument {
  return {
    id: String(raw.id),
    name: asString(raw.name ?? raw.fileName ?? raw.filename) ?? 'Untitled document',
    sizeBytes: typeof raw.size === 'number' ? raw.size : typeof raw.sizeBytes === 'number' ? raw.sizeBytes : undefined,
    uploadedAt: asString(raw.uploadedAt ?? raw.createdAt),
    status: toStatus(raw.status),
    chunkCount: typeof raw.chunkCount === 'number' ? raw.chunkCount : undefined,
    error: asString(raw.error ?? raw.errorMessage),
    simulated: false,
  }
}

export const knowledgeBaseApi = {
  async listDocuments(): Promise<KnowledgeDocument[]> {
    if (appConfig.useMockData) return mockDocuments
    const raw = await apiRequest<unknown>(endpoints.documents.list)
    return unwrapList<Record<string, unknown>>(raw).items.map(toDocument)
  },

  /** Duplicate uploads surface as a 409 ApiError from the client; the UI shows its message. */
  async uploadDocument(file: File): Promise<void> {
    if (appConfig.useMockData) {
      await new Promise((r) => setTimeout(r, 600))
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    await apiRequest(endpoints.documents.upload, { method: 'POST', formData })
  },

  async query(question: string): Promise<KnowledgeAnswer> {
    if (appConfig.useMockData) {
      await new Promise((r) => setTimeout(r, 700))
      return {
        answer: 'Simulated answer grounded in sample documents. Connect the backend to query your real documents.',
        sources: [{ documentName: 'auth-architecture.pdf', snippet: 'Sample snippet (simulated).' }],
        simulated: true,
      }
    }
    const raw = await apiRequest<Record<string, unknown>>(endpoints.documents.query, { method: 'POST', body: { question } })
    const sources = Array.isArray(raw.sources) ? (raw.sources as Record<string, unknown>[]) : []
    return {
      answer: asString(raw.answer ?? raw.response) ?? '',
      sources: sources.map((s) => ({ documentName: asString(s.documentName ?? s.source ?? s.name) ?? 'Document', snippet: asString(s.snippet ?? s.text ?? s.content) ?? '' })),
      simulated: false,
    }
  },
}
