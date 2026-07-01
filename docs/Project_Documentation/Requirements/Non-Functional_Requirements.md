# Non-Functional Requirements

## 1. Performance
- **NFR1.1 (Latency):** The end-to-end latency from the moment the user stops speaking to the moment the AI begins its audio response must not exceed 3.0 seconds under normal load.
- **NFR1.2 (Concurrency):** The system must support at least 100 concurrent live interview sessions during the MVP pilot phase without performance degradation.

## 2. Security and Privacy
- **NFR2.1 (Data Retention):** All audio and video (if simulated) blobs must be stored only in ephemeral memory during processing and must be permanently deleted immediately upon the termination of the interview session.
- **NFR2.2 (Authentication):** Passwords must be hashed using bcrypt or Argon2. Session tokens must be implemented using secure HTTP-only JWTs.
- **NFR2.3 (Anonymity):** Any global leaderboards must default to anonymous aliases unless the student explicitly opts-in to share their real name.

## 3. Reliability and Availability
- **NFR3.1 (Uptime):** The backend services must maintain a 99.5% uptime during standard business and evening hours (preventing the free Render tier from sleeping via UptimeRobot pinging).
- **NFR3.2 (Graceful Failure):** If an external API (e.g., Groq or DeepSeek) fails, the UI must present a friendly error message and allow the student to resume the interview without losing prior transcript data.

## 4. Maintainability and Scalability
- **NFR4.1 (Modularity):** The backend architecture must decouple the LLM routing logic from the core business logic, allowing API providers (e.g., swapping DeepSeek for OpenAI) to be changed via environment variables without rewriting core code.
- **NFR4.2 (Cost-Efficiency):** The architecture must be deployment-ready for pilot usage operating strictly within free-tier limits.

## 5. Usability
- **NFR5.1 (Responsiveness):** The Web UI must load fully within 2 seconds on a standard broadband connection.
- **NFR5.2 (Accessibility):** Contrast ratios and text sizes should adhere to WCAG 2.1 AA standards where possible.
