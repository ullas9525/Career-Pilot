# Feature Specification

## 1. Resume Scoring & Analysis
**Description:** The system analyzes a student's uploaded resume against a standardized rubric to evaluate structural quality and content depth.
**Core Components:**
- Input: Text extraction from PDF/Docx.
- Logic: LLM (DeepSeek) scores the resume out of 10 based on Action Words, Metrics, Project Depth, and Formatting.
- Output: A numerical score (0-10) and specific improvement suggestions.

## 2. Dynamic Context Generation
**Description:** Preparation of the AI's "brain" before the interview starts.
**Core Components:**
- Input: Target Company Name, Job Description text, and the parsed Resume data.
- Logic: DeepSeek v4 flash uses the Tavily Search API to search the web for recent interview questions associated with the company and role. It then merges this with the JD and Resume to create a master system prompt.
- Output: The master context payload passed to the live interview agent.

## 3. Live Conversational Interview Loop
**Description:** The core mock interview experience where the student speaks with the AI.
**Core Components:**
- **Capture:** Frontend MediaRecorder captures student audio.
- **STT:** Audio blob is sent to Groq (Whisper) for rapid Speech-to-Text transcription.
- **LLM Engine:** Nematron 3 Nano Omni acts as the interviewer, evaluating the transcript in real-time, deciding on follow-up questions or moving to the next topic, based on the master context.
- **TTS:** The AI's response text is converted to speech using Edge TTS (or Deepgram).
- **Playback:** The audio is streamed back to the student.

## 4. Post-Interview Brutal Scoring
**Description:** The final evaluation phase occurring immediately after the student ends the session.
**Core Components:**
- Input: The entire interview transcript (both student and AI lines).
- Logic: DeepSeek v4 flash analyzes the transcript against the specific Role Rubric (e.g., Software Engineering rubric).
- Output: Score breakdown by dimensions (e.g., Code Quality, Problem Solving, Communication) with explicit justifications ("Why you got this score") and an "Ideal Answer" comparison.

## 5. Career Readiness Score Calculation
**Description:** A composite metric indicating overall employability.
**Core Components:**
- Formula: `(Interview Score * 0.60) + (Resume Score * 0.30) + (Practice Consistency * 0.10)`.
- Output: A final score displayed on the student dashboard and aggregated on the Coordinator dashboard.

## 6. Placement Coordinator Dashboard
**Description:** The B2B administrative view.
**Core Components:**
- Data Aggregation: Pulls all student scores from the Neon PostgreSQL database.
- Features: Sortable roster, average cohort score, and "At-Risk" flags (scores < 4.0).
