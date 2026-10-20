import type { AgentRuntimeInfo } from '@/features/agents/types/agent.types'
import type { TaskSummary } from '@/features/tasks/types/task.types'
import type { ConversationDetail } from '@/features/conversations/types/conversation.types'
import type { ActivityEvent } from '@/features/activity/types/activity.types'
import type { KnowledgeDocument } from '@/features/knowledge-base/types/knowledgeBase.types'

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString()

export const mockAgentRuntime: AgentRuntimeInfo[] = [
  { id: 'planning', availability: 'available', recentActivity: [{ at: ago(35), summary: 'Created a launch roadmap' }] },
  { id: 'coding', availability: 'available', recentActivity: [{ at: ago(120), summary: 'Diagnosed a NullPointerException' }] },
  { id: 'writing', availability: 'available', recentActivity: [] },
  { id: 'research', availability: 'coming-soon' },
  { id: 'analysis', availability: 'available', recentActivity: [] },
  { id: 'knowledge', availability: 'available', recentActivity: [{ at: ago(300), summary: 'Answered from 2 documents' }] },
]

export const mockTasks: TaskSummary[] = [
  { id: 'demo-t1', title: 'Plan the Q4 product launch', status: 'completed', createdAt: ago(240), updatedAt: ago(235), agentIds: ['planning'], simulated: true },
  { id: 'demo-t2', title: 'Debug the order-service NullPointerException', status: 'completed', createdAt: ago(130), updatedAt: ago(120), agentIds: ['coding', 'analysis'], simulated: true },
  { id: 'demo-t3', title: 'Research report: vector database options', status: 'running', createdAt: ago(8), updatedAt: ago(2), agentIds: ['research', 'analysis', 'writing'], simulated: true },
  { id: 'demo-t4', title: 'Explain the auth architecture from our docs', status: 'failed', createdAt: ago(600), updatedAt: ago(598), agentIds: ['knowledge'], simulated: true },
  { id: 'demo-t5', title: 'Draft a proposal for the new analytics product', status: 'pending', createdAt: ago(1), updatedAt: ago(1), agentIds: ['writing'], simulated: true },
]

export const mockConversations: ConversationDetail[] = [
  {
    id: 'demo-c1',
    title: 'Q4 launch planning',
    updatedAt: ago(235),
    preview: 'Plan the Q4 product launch',
    simulated: true,
    messages: [
      { id: 'm1', role: 'user', content: 'Plan the Q4 product launch', at: ago(240) },
      { id: 'm2', role: 'assistant', content: 'Simulated plan: 1) Scope 2) Messaging 3) Build 4) Beta 5) Launch.', at: ago(235) },
    ],
  },
  {
    id: 'demo-c2',
    title: 'order-service exception',
    updatedAt: ago(120),
    preview: 'Debug the order-service NullPointerException',
    simulated: true,
    messages: [
      { id: 'm3', role: 'user', content: 'Debug the order-service NullPointerException', at: ago(130) },
      { id: 'm4', role: 'assistant', content: 'Simulated answer: guard the null case and add a regression test.', at: ago(120) },
    ],
  },
]

export const mockActivity: ActivityEvent[] = [
  { id: 'a1', type: 'task-created', summary: 'Task created: Research report on vector databases', at: ago(8), taskId: 'demo-t3', simulated: true },
  { id: 'a2', type: 'agent-started', summary: 'Research Agent started', at: ago(8), agentId: 'research', taskId: 'demo-t3', simulated: true },
  { id: 'a3', type: 'tool-executed', summary: 'Web search executed (simulated)', at: ago(6), agentId: 'research', taskId: 'demo-t3', simulated: true },
  { id: 'a4', type: 'agent-completed', summary: 'Coding Agent completed', at: ago(122), agentId: 'coding', taskId: 'demo-t2', simulated: true },
  { id: 'a5', type: 'task-completed', summary: 'Task completed: Debug the order-service exception', at: ago(120), taskId: 'demo-t2', simulated: true },
  { id: 'a6', type: 'execution-failed', summary: 'Execution failed: Explain the auth architecture', at: ago(598), agentId: 'knowledge', taskId: 'demo-t4', simulated: true },
]

export const mockDocuments: KnowledgeDocument[] = [
  { id: 'd1', name: 'auth-architecture.pdf', sizeBytes: 482_000, uploadedAt: ago(1500), status: 'indexed', chunkCount: 42, simulated: true },
  { id: 'd2', name: 'api-guidelines.md', sizeBytes: 18_400, uploadedAt: ago(900), status: 'processing', simulated: true },
  { id: 'd3', name: 'scanned-notes.pdf', sizeBytes: 2_100_000, uploadedAt: ago(300), status: 'failed', error: 'No extractable text found in this file.', simulated: true },
]
