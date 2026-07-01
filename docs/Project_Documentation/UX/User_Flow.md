# User Flow

This document details the step-by-step cognitive and physical journey of a Student user through the CareerPilot platform.

## 1. Onboarding Flow
1. **Landing Page:** User arrives at `careerpilot.example.com`. Sees value proposition ("Practice real interviews. Get brutal feedback. No human judgment.").
2. **Signup/Login:** User clicks "Start Practicing". Re-directed to Auth0/JWT login page.
3. **Role Selection:** Post-login, user is prompted: "What is your target career path?" (Select from dropdown: Backend, Frontend, PM, Data Science, etc.).
4. **Resume Upload:** User is prompted to upload their latest PDF resume. DeepSeek parses it in the background while the user proceeds.

## 2. Pre-Interview Flow
1. **Student Dashboard:** Displays their current Career Readiness Score, past interview history, and a prominent "Start New Mock Interview" button.
2. **Context Setup Screen:** 
   - User inputs Target Company (e.g., "Google").
   - User pastes the exact Job Description (JD).
   - Clicks "Generate Interview Context".
3. **Loading Screen (10-15s):** System fetches Tavily search data and primes DeepSeek. UI shows helpful interview tips while waiting.

## 3. Live Interview Flow (The Core Loop)
1. **Lobby:** Browser requests Microphone access. UI displays an audio visualizer to confirm mic works. User clicks "I'm Ready".
2. **AI Greeting:** The AI interviewer (Nematron + Edge TTS) introduces itself based on the company and JD.
3. **Conversational Turn:**
   - User clicks and holds (or toggles) a "Speak" button.
   - User speaks answer.
   - User releases button. Audio is sent to backend.
   - UI shows "Thinking..." state (Target < 3s).
   - AI speaks next question/follow-up.
4. **Conclusion:** After 4-5 technical questions, the AI concludes the interview. User clicks "End & Get Feedback".

## 4. Post-Interview Flow
1. **Scoring Loading Screen (20-30s):** UI displays "Analyzing transcript against rubrics... Be prepared for brutal feedback."
2. **Results Screen:**
   - Top Section: Final Score (e.g., 7.4/10).
   - Middle Section: Dimension breakdown (Code Quality, System Design, Communication) with expandable justifications.
   - Bottom Section: Side-by-Side Transcript viewer comparing the user's answer to the AI-generated "Ideal Answer".
