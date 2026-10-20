export type IntegrationStatus = 'connected' | 'coming-soon'

export interface Integration {
  id: string
  name: string
  description: string
  status: IntegrationStatus
}
