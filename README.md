# NeuronixAI Frontend

Light-first React + TypeScript + Vite + Tailwind v4 client for the NeuronixAI multi-agent workspace. The Spring Boot REST API is the only backend.

## Run
```
cp .env.example .env
npm install
npm run dev        # also: npm run typecheck | lint | test | build
```
- `VITE_API_BASE_URL` – Spring Boot base URL.
- `VITE_USE_MOCK_DATA=true` – explicit demo mode (simulated data, labelled in the UI). When `false`, failed requests show errors and never fall back to mocks.

## Architecture
`UI components → feature *Api.ts → services/apiClient.ts → Spring Boot`. Feature code lives in `src/features/<name>/{pages,components,services,types}`; demo data in `src/mocks`.

## Backend contract — needs verification
The Spring Boot code was not available when this was built. All paths are in `src/services/endpoints.ts` and are **assumptions** (`/api/auth/login`, `/api/tasks`, `/api/agents`, `/api/documents`, …). Response shapes are mapped tolerantly in each `*Api.ts` adapter; adjust those two places if the real contract differs.

Not implemented because backend support is unknown: forgot-password, agent configuration, task/conversation delete, conversation continuation, integrations (shown as "Coming soon"), SSE/WebSocket (REST polling sits behind `services/executionEventSource.ts`).
