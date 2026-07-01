# Software Requirements Specification (SRS)

## 1. Introduction
This Software Requirements Specification (SRS) outlines the comprehensive functional and non-functional requirements for the CareerPilot platform. This document serves as the absolute source of truth for the engineering team during the MVP development phase and beyond.

## 2. Product Scope
CareerPilot is a web-based, AI-driven technical mock interview platform. The system operates on a B2B2C model, allowing universities to onboard students who can then conduct unlimited, hyper-realistic, audio-to-audio technical interviews tailored to specific Job Descriptions and their uploaded resumes.

## 3. System Environment
- **Client Architecture:** Web Application (Vite React + JavaScript) accessible via modern desktop browsers (Chrome, Firefox, Edge, Safari). Mobile responsiveness is supported but not optimized for the live audio interview loop in MVP.
- **Server Architecture:** Modular Backend (Python/FastAPI) deployed on Render (free tier).
- **Database:** Neon serverless PostgreSQL.
- **External Dependencies:**
  - Groq (Whisper) for Speech-to-Text.
  - Edge TTS (or Deepgram) for Text-to-Speech.
  - DeepSeek v4 flash for context generation and brutal scoring.
  - Tavily Search API for dynamic web searches of company interview contexts.
  - Nematron 3 Nano Omni for the live conversational engine.

## 4. Overall Description
The system is partitioned into two primary modules:
1. **Student Module:** Handles authentication, resume parsing, interview setup, the live audio loop, and post-interview feedback viewing.
2. **Coordinator Module:** Handles the aggregation of student scores, cohort tracking, and automated flagging of "at-risk" students.

*Note: Specific Functional and Non-Functional requirements are detailed in their respective dedicated documentation files within this directory.*
