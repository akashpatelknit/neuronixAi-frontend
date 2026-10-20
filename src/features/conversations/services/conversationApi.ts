import { appConfig } from '@/config/appConfig'
import { apiRequest } from '@/services/apiClient'
import { endpoints } from '@/services/endpoints'
import { mockConversations } from '@/mocks/mockData'
import { asString, unwrapList } from '@/utils/responseUtils'
import type { ConversationDetail, ConversationMessage, ConversationSummary } from '../types/conversation.types'

function toSummary(raw: Record<string, unknown>): ConversationSummary {
  return {
    id: String(raw.id),
    title: asString(raw.title) ?? 'Untitled conversation',
    updatedAt: asString(raw.updatedAt ?? raw.createdAt),
    preview: asString(raw.preview ?? raw.lastMessage),
    simulated: false,
  }
}

function toMessage(raw: Record<string, unknown>, i: number): ConversationMessage {
  return {
    id: String(raw.id ?? i),
    role: String(raw.role).toLowerCase() === 'user' ? 'user' : 'assistant',
    content: asString(raw.content ?? raw.text) ?? '',
    at: asString(raw.createdAt ?? raw.at),
    executionId: raw.executionId !== undefined ? String(raw.executionId) : undefined,
  }
}

export const conversationApi = {
  async list(): Promise<ConversationSummary[]> {
    if (appConfig.useMockData) return mockConversations
    const raw = await apiRequest<unknown>(endpoints.conversations.list)
    return unwrapList<Record<string, unknown>>(raw).items.map(toSummary)
  },

  async get(id: string): Promise<ConversationDetail> {
    if (appConfig.useMockData) {
      const found = mockConversations.find((c) => c.id === id)
      if (!found) throw new Error('not found')
      return found
    }
    const raw = await apiRequest<Record<string, unknown>>(endpoints.conversations.detail(id))
    const messages = Array.isArray(raw.messages) ? (raw.messages as Record<string, unknown>[]).map(toMessage) : []
    return { ...toSummary(raw), messages }
  },
}
