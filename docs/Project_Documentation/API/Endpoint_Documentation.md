# Endpoint Documentation

This document outlines the core RESTful routes exposed by the CareerPilot backend.

## 1. Authentication Endpoints
- `POST /api/auth/register`
  - Creates a new User record. Accepts `email`, `password`, `role`, and `university_id`.
- `POST /api/auth/login`
  - Authenticates a user and returns a JWT token.

## 2. User & Profile Endpoints
- `GET /api/users/me`
  - Returns the authenticated user's profile and basic metadata.
- `POST /api/users/resume`
  - Uploads a resume (FormData). Triggers DeepSeek extraction. Returns parsed JSON and `resume_score`.
- `GET /api/users/resume`
  - Fetches the currently active parsed resume data for the authenticated student.

## 3. Interview Core Endpoints
- `POST /api/interviews/start`
  - Accepts `target_company` and `job_description`.
  - Triggers Tavily Search and DeepSeek context generation.
  - Returns a unique `interview_id` and initial AI greeting text.
- `POST /api/interviews/:id/turn`
  - The live conversational loop. Accepts an audio blob (FormData) from the student.
  - Executes Groq STT -> Nematron LLM -> Edge TTS.
  - Returns an audio blob containing the AI's spoken response.
- `POST /api/interviews/:id/end`
  - Signals the end of the session. Triggers the heavy DeepSeek post-interview scoring pipeline.
- `GET /api/interviews/:id/results`
  - Fetches the final calculated Career Readiness Score, JSON transcript, and dimension breakdown.

## 4. Coordinator Dashboard Endpoints
*(Accessible only by users with the 'COORDINATOR' role)*
- `GET /api/dashboard/cohort`
  - Returns an aggregated list of all students belonging to the coordinator's university, sorted by Career Readiness Score.
- `GET /api/dashboard/at-risk`
  - Returns a filtered list of students whose Career Readiness Score falls below the 4.0 threshold.
