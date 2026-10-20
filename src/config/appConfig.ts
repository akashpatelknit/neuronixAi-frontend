import { environment } from './environment'

export const appConfig = {
  appName: 'NeuronixAI',
  tagline: 'One AI Workspace. A Team of Specialized Agents.',
  apiBaseUrl: environment.apiBaseUrl,
  /** Explicit demo mode. When true, services use src/mocks and the UI says so. */
  useMockData: environment.useMockData,
  requestTimeoutMs: 20_000,
  executionPollIntervalMs: 2_000,
  authTokenStorageKey: 'neuronixai.session',
} as const
