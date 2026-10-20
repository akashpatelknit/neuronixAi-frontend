export type DocumentStatus = 'uploaded' | 'processing' | 'indexed' | 'failed'

export interface KnowledgeDocument {
  id: string
  name: string
  sizeBytes?: number
  uploadedAt?: string
  status: DocumentStatus
  chunkCount?: number
  error?: string
  simulated: boolean
}

export interface KnowledgeSource {
  documentName: string
  snippet: string
}

export interface KnowledgeAnswer {
  answer: string
  sources: KnowledgeSource[]
  simulated: boolean
}
