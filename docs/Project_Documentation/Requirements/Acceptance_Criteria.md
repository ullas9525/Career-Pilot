# Acceptance Criteria

This document defines the conditions that must be met for the CareerPilot MVP to be considered complete and ready for the pilot launch.

## 1. Resume Processing
- **AC1.1:** Given a user uploads a PDF resume, the system extracts the text and DeepSeek generates a 0-10 Resume Score based on the rubric, completing within 15 seconds.
- **AC1.2:** Given a user views their profile, they can see specific text strings identified by the AI as "missing action verbs" or "weak impact metrics."

## 2. Interview Context Generation
- **AC2.1:** Given a user enters "Stripe" and a "Backend Engineer" JD, the system must utilize the Tavily Search API to find 3-5 real or highly similar recent interview questions from Stripe.
- **AC2.2:** The final system prompt sent to Nematron must successfully combine the JD, the web search results, and at least two projects from the student's uploaded resume.

## 3. Live Interview Loop
- **AC3.1:** Given the student stops speaking, the frontend must capture the audio blob and send it to the backend.
- **AC3.2:** Groq Whisper must transcribe the audio with >90% accuracy for standard conversational English.
- **AC3.3:** Nematron 3 Nano Omni must generate a response that directly references the student's previous answer (verifying context retention).
- **AC3.4:** The total round-trip time from audio upload to TTS audio playback must average < 3.0 seconds on a standard broadband connection.

## 4. Scoring and Feedback
- **AC4.1:** Given the student clicks "End Interview", DeepSeek v4 flash must parse the entire transcript and generate scores for all dimensions (e.g., Code Quality, System Design, Communication) defined in the target role's rubric.
- **AC4.2:** The Career Readiness Score must be mathematically accurate based on the formula: `(Interview 60% + Resume 30% + Consistency 10%)`.
- **AC4.3:** The frontend must render a "Side-by-Side Transcript" showing what the student said versus the AI's "Ideal Answer."

## 5. Privacy and Data
- **AC5.1:** Upon generating the final text transcript, all raw audio blobs (both student input and TTS output) must be expunged from the server's memory. No `.wav` or `.mp3` files can remain on the server's disk.
