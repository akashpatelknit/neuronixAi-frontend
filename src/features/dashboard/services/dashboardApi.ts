import { taskApi } from '@/features/tasks/services/taskApi'
import { conversationApi } from '@/features/conversations/services/conversationApi'
import { activityApi } from '@/features/activity/services/activityApi'
import { appConfig } from '@/config/appConfig'
import type { ConversationSummary } from '@/features/conversations/types/conversation.types'
import type { ActivityEvent } from '@/features/activity/types/activity.types'
import type { TaskSummary } from '@/features/tasks/types/task.types'
import type { ExecutionStatus } from '@/types/common.types'

export interface DashboardData {
  recentTasks: TaskSummary[]
  statusCounts: Record<ExecutionStatus, number>
  recentConversations: ConversationSummary[]
  recentActivity: ActivityEvent[]
  simulated: boolean
}

/** Composes existing feature services. No separate "metrics" endpoint is assumed. */
export const dashboardApi = {
  async load(): Promise<DashboardData> {
    const [tasksPage, conversations, activity] = await Promise.all([
      taskApi.list({ search: '', status: 'all', sort: 'updatedAt', page: 1, pageSize: 100 }),
      conversationApi.list(),
      activityApi.list(),
    ])
    const statusCounts: Record<ExecutionStatus, number> = { pending: 0, running: 0, waiting: 0, completed: 0, failed: 0 }
    tasksPage.items.forEach((t) => (statusCounts[t.status] += 1))
    return {
      recentTasks: tasksPage.items.slice(0, 5),
      statusCounts,
      recentConversations: conversations.slice(0, 4),
      recentActivity: activity.slice(0, 5),
      simulated: appConfig.useMockData,
    }
  },
}
