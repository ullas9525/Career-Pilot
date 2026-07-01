# Service Architecture

Given the constraint of utilizing the Render free tier, a microservices architecture is out of scope due to the overhead of running multiple instances. Therefore, CareerPilot employs a **Modular Monolith** service architecture.

## 1. Core Monolith
The single backend service exposes multiple domain-driven routes:
- `/api/auth/*` - Handles identity.
- `/api/users/*` - Handles profile and resume updates.
- `/api/interviews/*` - Handles context generation, the live audio session loop, and the final scoring trigger.
- `/api/dashboard/*` - Handles data aggregation for Placement Coordinators.

## 2. External Service Integrations
While the core logic is monolithic, the heavy computational lifting (AI and Search) is delegated to specialized external microservices via API:

1. **Search Service (Tavily):** REST API call. Ephemeral.
2. **Context & Scoring Service (DeepSeek):** REST API call. Handles heavy prompt processing and JSON extraction.
3. **Conversational Service (Nematron):** REST API call. Optimized for rapid, low-latency conversational responses.
4. **Transcription Service (Groq Whisper):** REST API call (Multipart form data for audio upload).
5. **Speech Synthesis Service (Edge TTS):** WebSocket or REST call (depending on library implementation) to stream audio bytes back to the server.

## 3. Data Service
- **Neon PostgreSQL:** A serverless relational database accessed via connection pooling from the modular monolith. It scales compute down to zero when inactive, aligning perfectly with the free-tier constraints.
