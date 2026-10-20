import type { AgentAccent } from '@/features/agents/types/agent.types'

export const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Agents', href: '#agents' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Capabilities', href: '#capabilities' },
]

export interface WorkflowExample {
  request: string
  agents: { id: string; label: string; accent: AgentAccent }[]
  outcome: string
}

/** Illustrative only: these are examples of possible workflows, not live backend output. */
export const workflowExamples: WorkflowExample[] = [
  { request: 'Plan my next product launch.', agents: [{ id: 'planning', label: 'Planning', accent: 'amber' }], outcome: 'Final plan' },
  {
    request: 'Help me debug this Java API.',
    agents: [{ id: 'coding', label: 'Coding', accent: 'blue' }, { id: 'analysis', label: 'Analysis', accent: 'violet' }],
    outcome: 'Suggested fix',
  },
  {
    request: 'Create a research report on this topic.',
    agents: [{ id: 'research', label: 'Research', accent: 'cyan' }, { id: 'analysis', label: 'Analysis', accent: 'violet' }, { id: 'writing', label: 'Writing', accent: 'coral' }],
    outcome: 'Written report',
  },
  { request: 'Explain the content of my technical documents.', agents: [{ id: 'knowledge', label: 'Knowledge', accent: 'mint' }], outcome: 'Grounded explanation' },
]

export const howItWorksSteps = [
  { title: 'Describe your goal', body: 'Write what you want to accomplish in plain language. No need to pick an agent or tool.' },
  { title: 'NeuronixAI coordinates the work', body: 'The platform identifies the capabilities your task needs and coordinates the supported workflow.' },
  { title: 'Review results and details', body: 'Get your deliverable and inspect the supported execution details behind it.' },
]

export const pipelineStages = [
  { name: 'Understand', body: 'Interpret the request and intended outcome.' },
  { name: 'Orchestrate', body: 'Select and coordinate the relevant agents.' },
  { name: 'Execute', body: 'Run the supported workflow with visible progress.' },
  { name: 'Deliver', body: 'Present the answer, code, plan, analysis or document.' },
]

export const platformCapabilities = [
  { title: 'Intelligent task routing', body: 'Describe a goal; the backend decides which capabilities to involve.' },
  { title: 'Specialized agent workflows', body: 'Distinct agents for different kinds of work, coordinated together.' },
  { title: 'Coding and debugging assistance', body: 'Generate, explain and troubleshoot code.' },
  { title: 'Planning and decomposition', body: 'Turn large goals into structured, actionable steps.' },
  { title: 'Writing and content generation', body: 'Draft and refine proposals, articles and documents.' },
  { title: 'Research and analysis', body: 'Gather information, compare options and surface insights.' },
  { title: 'Document-grounded knowledge', body: 'Ask questions answered from your own uploaded documents (RAG).' },
  { title: 'Execution visibility', body: 'Inspect which agents ran and what they produced.' },
  { title: 'Conversation and task management', body: 'Keep tasks and conversations organized in one place.' },
]
