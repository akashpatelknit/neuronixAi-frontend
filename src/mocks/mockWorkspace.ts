import type { Execution, ExecutionStep, SubmitTaskRequest } from '@/features/workspace/types/workspace.types'

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))
const STEP_MS = 2500

interface Template {
  agents: { agentId: string; responsibility: string; action: string; output: string; tool?: string }[]
  result: string
}

/** Different demo workflows. Which one is used is chosen by a hash of the prompt, NOT by keyword routing. */
const templates: Template[] = [
  {
    agents: [{ agentId: 'planning', responsibility: 'Break the goal into steps', action: 'Structuring milestones', output: 'Drafted 5 milestones with dependencies.' }],
    result: 'Simulated plan: 1) Define scope 2) Design 3) Build 4) Test 5) Launch.',
  },
  {
    agents: [
      { agentId: 'coding', responsibility: 'Inspect the problem', action: 'Reading the snippet', output: 'Identified a likely cause.' },
      { agentId: 'analysis', responsibility: 'Evaluate fixes', action: 'Comparing options', output: 'Ranked two candidate fixes.' },
    ],
    result: 'Simulated suggested fix: guard the null case before dereferencing, then add a regression test.',
  },
  {
    agents: [
      { agentId: 'research', responsibility: 'Gather information', action: 'Collecting findings', output: 'Collected 6 findings.', tool: 'Web search (simulated)' },
      { agentId: 'analysis', responsibility: 'Compare alternatives', action: 'Comparing', output: 'Built a comparison matrix.' },
      { agentId: 'writing', responsibility: 'Compose the report', action: 'Drafting report', output: 'Drafted the report.' },
    ],
    result: 'Simulated research report: summary, comparison table and recommendations.',
  },
  {
    agents: [
      { agentId: 'knowledge', responsibility: 'Retrieve relevant document chunks', action: 'Searching your documents', output: 'Retrieved 4 chunks.' },
      { agentId: 'analysis', responsibility: 'Explain the content', action: 'Synthesising', output: 'Prepared explanation.' },
    ],
    result: 'Simulated explanation grounded in sample document chunks.',
  },
  {
    agents: [{ agentId: 'writing', responsibility: 'Draft the content', action: 'Writing', output: 'Drafted the content.' }],
    result: 'Simulated draft: a professional, well-structured document.',
  },
]

const store = new Map<string, { request: SubmitTaskRequest; createdAt: number; template: Template }>()

function hash(text: string): number {
  let h = 0
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
}

export async function mockSubmitTask(request: SubmitTaskRequest): Promise<Execution> {
  await delay()
  const id = `demo-${Date.now().toString(36)}`
  store.set(id, { request, createdAt: Date.now(), template: templates[hash(request.prompt) % templates.length] })
  return mockGetExecution(id)
}

export async function mockGetExecution(id: string): Promise<Execution> {
  const entry = store.get(id)
  if (!entry) throw new Error('Unknown demo execution')
  const elapsed = Date.now() - entry.createdAt
  const { template, request } = entry

  const steps: ExecutionStep[] = template.agents.map((a, i) => {
    const start = i * STEP_MS
    const done = start + STEP_MS
    const status = elapsed >= done ? 'completed' : elapsed >= start ? 'running' : 'pending'
    return {
      id: `${id}-${i}`,
      agentId: a.agentId,
      responsibility: a.responsibility,
      status,
      currentAction: status === 'running' ? a.action : undefined,
      startedAt: status !== 'pending' ? new Date(entry.createdAt + start).toISOString() : undefined,
      completedAt: status === 'completed' ? new Date(entry.createdAt + done).toISOString() : undefined,
      output: status === 'completed' ? a.output : undefined,
      tools: status === 'completed' && a.tool ? [{ name: a.tool }] : undefined,
    }
  })
  const finished = steps.every((s) => s.status === 'completed')
  return {
    id,
    taskDescription: request.prompt,
    status: finished ? 'completed' : 'running',
    steps,
    result: finished ? template.result : undefined,
    conversationId: request.conversationId ?? 'demo-conversation-new',
    createdAt: new Date(entry.createdAt).toISOString(),
    completedAt: finished ? new Date(entry.createdAt + template.agents.length * STEP_MS).toISOString() : undefined,
    simulated: true,
  }
}
