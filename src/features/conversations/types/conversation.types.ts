export interface ConversationSummary {
  id: string
  title: string
  updatedAt?: string
  preview?: string
  simulated: boolean
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  at?: string
  executionId?: string
}

export interface ConversationDetail extends ConversationSummary {
  messages: ConversationMessage[]
}
