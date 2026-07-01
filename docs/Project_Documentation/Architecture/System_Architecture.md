# System Architecture

## 1. Overview
The CareerPilot system follows a modern, decoupled client-server architecture designed for high throughput, low latency (critical for the voice loop), and strict adherence to zero-margin cost constraints via free-tier API orchestration.

## 2. High-Level Architecture Tiers

### 2.1 Presentation Tier (Client)
- **Framework:** Vite React + JavaScript (Single Page Application).
- **Hosting:** GitHub Pages or Render Static Site.
- **Responsibilities:** 
  - UI rendering (Dashboards, Interview Lobby).
  - Media capture (Microphone access via Web Audio API/MediaRecorder).
  - Audio playback (Streaming AI TTS output).

### 2.2 Application Tier (Backend Server)
- **Framework:** Python (FastAPI).
- **Hosting:** Render (Free Tier Web Service).
- **Responsibilities:**
  - JWT Authentication and RBAC.
  - LLM Prompt Orchestration (Context generation, scoring).
  - Audio relay (Receiving student audio, proxying to Groq/TTS).
  - Database CRUD operations.

### 2.3 Data Tier (Persistence)
- **Database:** Neon serverless PostgreSQL.
- **Responsibilities:**
  - Storing user profiles, transcripts, and calculated Career Readiness Scores.
  - Relational mapping between Coordinators and their respective Student Cohorts.

### 2.4 External AI Services Tier (The Brain)
- **Groq (Whisper):** Handles ultra-fast Speech-to-Text transcription.
- **Tavily Search API:** Fetches real-time company interview questions from the web.
- **DeepSeek v4 flash:** Generates the master interview context and performs post-interview brutal scoring.
- **Nematron 3 Nano Omni:** Acts as the live conversational engine during the interview loop.
- **Edge TTS:** Converts Nematron's text output back to audio for the student.

## 3. Deployment Topology
The system is deployment-ready for pilot usage. The Vite React + JavaScript frontend communicates with the FastAPI backend via RESTful JSON APIs and WebSocket (or HTTP polling) for the live audio loop. The backend acts as a secure proxy to the external AI APIs, preventing client-side exposure of API keys. UptimeRobot is utilized to ping the `/health` endpoint every 10 minutes to prevent the Render instance from spinning down.
