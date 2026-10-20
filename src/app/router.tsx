import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from './ProtectedRoute'

const LandingPage = lazy(() => import('@/features/landing/pages/LandingPage'))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'))
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const WorkspacePage = lazy(() => import('@/features/workspace/pages/WorkspacePage'))
const AgentsPage = lazy(() => import('@/features/agents/pages/AgentsPage'))
const AgentDetailsPage = lazy(() => import('@/features/agents/pages/AgentDetailsPage'))
const TasksPage = lazy(() => import('@/features/tasks/pages/TasksPage'))
const TaskDetailsPage = lazy(() => import('@/features/tasks/pages/TaskDetailsPage'))
const ConversationsPage = lazy(() => import('@/features/conversations/pages/ConversationsPage'))
const ActivityPage = lazy(() => import('@/features/activity/pages/ActivityPage'))
const KnowledgeBasePage = lazy(() => import('@/features/knowledge-base/pages/KnowledgeBasePage'))
const ToolsPage = lazy(() => import('@/features/tools/pages/ToolsPage'))
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'))

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'workspace', element: <WorkspacePage /> },
          { path: 'agents', element: <AgentsPage /> },
          { path: 'agents/:agentId', element: <AgentDetailsPage /> },
          { path: 'tasks', element: <TasksPage /> },
          { path: 'tasks/:taskId', element: <TaskDetailsPage /> },
          { path: 'conversations', element: <ConversationsPage /> },
          { path: 'conversations/:conversationId', element: <ConversationsPage /> },
          { path: 'activity', element: <ActivityPage /> },
          { path: 'knowledge-base', element: <KnowledgeBasePage /> },
          { path: 'tools', element: <ToolsPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
