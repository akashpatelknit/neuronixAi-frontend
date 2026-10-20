import type { Integration } from '../types/integration.types'

/**
 * No backend endpoint reports integration status, so every integration is
 * "Coming soon". Switch an entry to 'connected' only from backend-confirmed data.
 */
export const integrationCatalog: Integration[] = [
  { id: 'web-search', name: 'Web search', description: 'Let the Research Agent look up current information.', status: 'coming-soon' },
  { id: 'github', name: 'GitHub', description: 'Give the Coding Agent access to repositories and issues.', status: 'coming-soon' },
  { id: 'email', name: 'Email', description: 'Draft and send email on your behalf.', status: 'coming-soon' },
  { id: 'calendar', name: 'Calendar', description: 'Plan around your schedule.', status: 'coming-soon' },
  { id: 'browser', name: 'Browser', description: 'Read and interact with web pages.', status: 'coming-soon' },
  { id: 'database', name: 'Database', description: 'Query your data sources for analysis.', status: 'coming-soon' },
]
