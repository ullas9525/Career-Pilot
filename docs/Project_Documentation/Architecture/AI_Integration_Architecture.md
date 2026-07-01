# AI Integration Architecture

The CareerPilot platform relies on an orchestrated symphony of multiple AI models, each chosen specifically for its strengths in either speed, context window, or domain intelligence.

## 1. Context Generation Pipeline
**Goal:** Prepare the "brain" of the interviewer before the student starts speaking.
- **Provider:** DeepSeek v4 flash + Tavily Search API.
- **Workflow:**
  1. The backend receives the Target Company and Job Description (JD).
  2. The backend queries Tavily for recent interview experiences at the Target Company.
  3. The backend fetches the student's Resume parsed data.
  4. DeepSeek v4 flash synthesizes the JD, web search results, and resume into a dense, system-prompt payload.
- **Why DeepSeek v4 flash?** It possesses a massive context window and strong reasoning capabilities necessary to merge disparate text sources (resume + JD + web search) into a cohesive prompt.

## 2. Live Conversational Loop
**Goal:** Provide a seamless, low-latency voice interface.
- **Speech-to-Text (STT):** Groq (Whisper). Chosen because Groq's LPU architecture provides industry-leading inference speeds, minimizing input latency.
- **Language Model (LLM):** Nematron 3 Nano Omni. 
  - **Why Nematron?** It is an ultra-fast, lightweight conversational model. During the live loop, we prioritize response speed over deep architectural reasoning. Nematron's sole job is to ingest the transcript history, adhere to the DeepSeek-generated system prompt, and output the next conversational turn in < 1 second.
- **Text-to-Speech (TTS):** Edge TTS (Default) or Deepgram. Chosen for near-zero latency streaming audio synthesis.

## 3. Post-Interview Scoring Pipeline
**Goal:** Provide objective, brutal, rubric-based feedback.
- **Provider:** DeepSeek v4 flash.
- **Workflow:**
  1. The complete transcript (Student + AI) is compiled.
  2. The specific role rubric (e.g., Software Engineering) is loaded from the backend file system.
  3. A massive payload (Transcript + Rubric + "Be brutal and objective" prompt) is sent to DeepSeek.
  4. DeepSeek returns a structured JSON object containing the dimension scores, justifications, and the final Career Readiness Score math.
- **Why DeepSeek v4 flash?** Scoring requires deep reasoning, pattern matching against complex rubrics, and the ability to process long transcripts accurately. Speed is less critical here (as the student is waiting on a loading screen), making DeepSeek the ideal candidate.
