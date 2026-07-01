# Local Environment Setup

This document outlines the steps required for a new developer to spin up the CareerPilot project locally.

## 1. Prerequisites
- Python (3.11+) for backend. Node.js (v18+) for frontend.
- Git.
- A Neon PostgreSQL account.
- Free API Keys for: Groq, DeepSeek, Tavily. (Nematron key if applicable).

## 2. Backend Setup
1. Clone the repository: `git clone https://github.com/.../careerpilot-backend.git`
2. Install dependencies: `pip install -r requirements.txt`
3. Create a `.env` file based on `.env.example`:
   ```
   DATABASE_URL="postgres://user:pass@neon.tech/db"
   JWT_SECRET="local_secret"
   GROQ_API_KEY="..."
   DEEPSEEK_API_KEY="..."
   TAVILY_API_KEY="..."
   ```
4. Run database migrations: `alembic upgrade head` (or equivalent).
5. Start development server: `uvicorn main:app --reload`.

## 3. Frontend Setup
1. Clone the frontend repository: `git clone https://github.com/.../careerpilot-frontend.git`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```
   VITE_API_BASE_URL="http://localhost:8000/api"
   ```
4. Start development server: `npm run dev`.
