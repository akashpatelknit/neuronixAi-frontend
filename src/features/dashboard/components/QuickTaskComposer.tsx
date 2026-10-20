import { useNavigate } from 'react-router-dom'
import { TaskComposer } from '@/features/workspace/components/TaskComposer'

/** Hands the prompt to the AI Workspace, which owns submission and execution display. */
export function QuickTaskComposer() {
  const navigate = useNavigate()
  return <TaskComposer rows={2} onSubmit={(prompt) => navigate(`/app/workspace?prompt=${encodeURIComponent(prompt)}`)} />
}
