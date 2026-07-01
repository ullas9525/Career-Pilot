# Product Roadmap

## Q1: MVP Development & Internal Alpha
- **Goal:** Prove the technical feasibility of the near-zero cost, audio-to-audio interview loop.
- **Key Deliverables:**
  - Database schema setup (Neon PostgreSQL).
  - Basic Authentication.
  - Resume Parsing & Scoring logic.
  - Integration of DeepSeek v4 flash (with Tavily Search) for context generation.
  - Integration of Groq (Whisper) -> Nematron -> Edge TTS for the live interview loop.
  - Final post-interview transcript scoring module.
- **Milestone:** Internal team testing of the end-to-end pipeline without UI crashes.

## Q2: UI Polish & Beta Pilot Launch
- **Goal:** Make the platform usable for non-technical students and placement coordinators.
- **Key Deliverables:**
  - Vite React + JavaScript Frontend implementation based on UX flows.
  - Placement Coordinator Dashboard (Aggregations, At-Risk flagging).
  - Calculation and UI rendering of the Career Readiness Score.
  - Privacy implementations (Immediate media deletion protocols).
- **Milestone:** Launch beta pilot at one engineering college (50-100 students).

## Q3: Phase 2 - Engagement & B2B Expansion (Future Scope)
- **Goal:** Increase student retention and expand the product to multiple colleges.
- **Key Deliverables:**
  - LinkedIn / GitHub Profile Audits.
  - Peer-to-Peer Mock Interviews matchmaking.
  - Faculty-level Dashboards for curriculum insights.
  - Optional outcome tracking for students (logging real job offers).
- **Milestone:** Convert the first pilot college to a paid B2B contract; onboard 3 additional colleges.

## Q4: Phase 3 - Adaptive Intelligence (Future Scope)
- **Goal:** Defend against score inflation and cheating.
- **Key Deliverables:**
  - Dynamic follow-up questioning to probe shallow, memorized answers.
  - Real-time cross-referencing of interview answers against resume claims.
  - Multi-language support (Regional STT/TTS).
- **Milestone:** Publish the first validation report correlating Career Readiness Scores with actual placement success.
