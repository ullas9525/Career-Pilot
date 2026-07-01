# Component Architecture

The backend of CareerPilot is structured into modular components to allow seamless swapping of external API providers (e.g., if Groq changes its free tier, the STT component can be swapped to Deepgram without affecting the rest of the system).

## Core Backend Components

### 1. API Gateway / Router
- **Function:** Handles incoming HTTP requests and WebSocket connections from the Vite React + JavaScript frontend.
- **Responsibilities:** Request validation, routing to appropriate controllers, and payload formatting.

### 2. Auth Service
- **Function:** Manages JWT-based authentication.
- **Responsibilities:** Password hashing (bcrypt), token generation, route protection (RBAC middleware for Student vs. Coordinator routes).

### 3. Orchestration Engine (The Core)
- **Function:** Manages the sequential logic of the interview.
- **Responsibilities:** 
  - Directing the Resume Service to parse uploads.
  - Triggering the Context Generator before the interview.
  - Managing the STT -> LLM -> TTS pipeline during the live session.
  - Triggering the Scoring Engine post-interview.

### 4. AI Provider Adapters
- **Function:** Abstracted interfaces for external API calls.
- **Components:**
  - `TavilySearchClient`: Interfaces with Tavily Search API.
  - `GroqSTTClient`: Interfaces with Whisper on Groq.
  - `DeepSeekClient`: Interfaces with DeepSeek v4 flash (Context + Scoring).
  - `NematronClient`: Interfaces with Nematron 3 Nano Omni (Live Conversation).
  - `EdgeTTSClient`: Interfaces with the Edge TTS service.

### 5. Scoring & Rubric Engine
- **Function:** Applies domain-specific logic to transcripts.
- **Responsibilities:** Loads the correct Markdown rubric based on the student's role selection, formats the prompt for DeepSeek, and parses the JSON response to calculate the final Career Readiness Score.

### 6. Database Access Layer (DAL)
- **Function:** Interfaces with the Neon serverless PostgreSQL instance.
- **Responsibilities:** Executes queries via an ORM (e.g., Prisma or SQLAlchemy) to read/write user data, transcripts, and scores.
