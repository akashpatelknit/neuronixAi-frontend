import type { AgentDefinition } from '../types/agent.types'

/**
 * Data-driven catalog of agent kinds. Add an entry here and every page
 * (landing, agents, workspace timeline) picks it up. Entries describe the
 * intended product capability only; whether an agent can run is decided by
 * the backend (see agentApi).
 */
export const agentCatalog: AgentDefinition[] = [
  {
    id: 'planning',
    name: 'Planning Agent',
    shortName: 'Planning',
    description: 'Breaks complex requests into actionable steps and structured plans.',
    responsibilities: ['Task decomposition', 'Dependency identification', 'Roadmaps and milestones'],
    capabilities: ['Roadmaps', 'Task breakdown', 'Dependencies'],
    accent: 'amber',
    icon: 'planning',
  },
  {
    id: 'coding',
    name: 'Coding Agent',
    shortName: 'Coding',
    description: 'Helps with programming, code generation, debugging and explaining code.',
    responsibilities: ['Code generation', 'Debugging and exceptions', 'Code explanation'],
    capabilities: ['Debugging', 'Code generation', 'Code review'],
    accent: 'blue',
    icon: 'coding',
  },
  {
    id: 'writing',
    name: 'Writing Agent',
    shortName: 'Writing',
    description: 'Creates, edits and improves documents, articles, proposals and other content.',
    responsibilities: ['Drafting', 'Editing and rewriting', 'Tone and structure'],
    capabilities: ['Proposals', 'Articles', 'Rewriting'],
    accent: 'coral',
    icon: 'writing',
  },
  {
    id: 'research',
    name: 'Research Agent',
    shortName: 'Research',
    description: 'Gathers available information, compares alternatives and prepares findings.',
    responsibilities: ['Information gathering', 'Comparing alternatives', 'Summarising findings'],
    capabilities: ['Comparisons', 'Summaries', 'Findings'],
    accent: 'cyan',
    icon: 'research',
  },
  {
    id: 'analysis',
    name: 'Analysis Agent',
    shortName: 'Analysis',
    description: 'Evaluates information, identifies patterns and produces structured insights.',
    responsibilities: ['Evaluating options', 'Pattern identification', 'Decision support'],
    capabilities: ['Insights', 'Trade-offs', 'Decision support'],
    accent: 'violet',
    icon: 'analysis',
  },
  {
    id: 'knowledge',
    name: 'Knowledge / RAG Agent',
    shortName: 'Knowledge',
    description: 'Answers questions using your uploaded documents and supported knowledge sources.',
    responsibilities: ['Retrieving relevant document chunks', 'Context-grounded answers'],
    capabilities: ['Document Q&A', 'Retrieval', 'Grounded answers'],
    accent: 'mint',
    icon: 'knowledge',
  },
]

export function findAgentDefinition(id: string): AgentDefinition | undefined {
  return agentCatalog.find((agent) => agent.id === id)
}

/** Fallback look for agents the backend reports but the catalog does not know yet. */
export function genericAgentDefinition(id: string, name?: string): AgentDefinition {
  return {
    id,
    name: name ?? id,
    shortName: name ?? id,
    description: 'A specialized agent reported by the NeuronixAI backend.',
    responsibilities: [],
    capabilities: [],
    accent: 'violet',
    icon: 'generic',
  }
}
