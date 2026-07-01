# API Specification

## 1. Introduction
The CareerPilot backend exposes a RESTful API built on Python/FastAPI. The API is designed to support the Vite React + JavaScript frontend client, handling everything from authentication and resume processing to orchestrating the complex asynchronous AI mock interview loop.

## 2. API Design Principles
- **RESTful Resource Naming:** Endpoints are structured around nouns (e.g., `/api/users`, `/api/interviews`).
- **Statelessness:** All API calls (except the live WebSocket/HTTP audio stream) are stateless. Authentication relies entirely on client-provided JWTs in the Authorization header.
- **JSON Standard:** All request bodies (for text endpoints) and response bodies must be formatted as `application/json`.
- **CORS Configuration:** Cross-Origin Resource Sharing is strictly configured to only accept requests from the deployed Vite React + JavaScript frontend domain (and `localhost` during development).

## 3. Base URL & Versioning
- **Base URL (Deployment):** `https://careerpilot-api.onrender.com/v1`
- **Base URL (Local):** `http://localhost:8000/v1`
- **Versioning:** API versioning is managed via the URL path (`/v1/`). Breaking changes in future phases will require a `/v2/` increment to prevent client crashes during transition.

## 4. Request Handling & API Limits
As an academic project utilizing free-tier AI services (Groq, DeepSeek), the API includes basic request throttling to prevent accidental quota exhaustion during testing and evaluation. 
- The backend utilizes simple middleware to throttle rapid, repeated requests to heavy endpoints (like starting an interview) to ensure stable API connections with the external LLM providers.