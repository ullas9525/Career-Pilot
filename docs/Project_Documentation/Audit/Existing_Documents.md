# Existing Documents Audit

This document inventories the currently existing documentation for the CareerPilot project prior to the massive generation phase.

## Current Documentation Root (`/docs`)

1. **`CareerPilot_Master_Documentation.md`**
   - **Type:** High-Level Product Overview
   - **Content:** Outlines the core problem, solution, target audience (colleges/B2B2C), product capabilities, MVP vs. Future Scope, workflows, and high-level principles.
   - **Status:** Good foundation, but blends product, business, and architectural concerns into a single file.

2. **`CareerPilot_Role_and_Score_Rubrics.md`**
   - **Type:** Domain Logic / AI Scoring
   - **Content:** Detailed breakdowns of role-specific evaluation dimensions (e.g., Software Engineering, Product Management) and explicit 0-10 score band examples.
   - **Status:** Highly detailed for implemented roles; includes a roadmap for future role expansion.

3. **`Resume_Rubrics.md`**
   - **Type:** Domain Logic
   - **Content:** Scoring methodology and analysis logic for evaluating student resumes during the interview prep phase.
   - **Status:** Complete for MVP scope.

4. **`Teck Stacks.md`**
   - **Type:** Technical Architecture & Infrastructure
   - **Content:** Outlines the core tech stack (FastAPI, React, Neon, Render, DeepSeek, Nematron, Whisper), cost estimations, high-level DB schema, and recent scalability roadmap.
   - **Status:** Solid technical foundation, but lacks deep dive component diagrams, formal API specifications, and detailed non-functional requirements.

5. **`User Flow.md`**
   - **Type:** UX / User Journey
   - **Content:** Step-by-step documentation of the user's journey through the application screens.
   - **Status:** Good starting point for UX documentation, but needs formal screen inventories and interaction designs.

6. **`Screens/`** (Directory)
   - **Type:** UI Assets
   - **Content:** Visual assets related to the application interface.

## Assessment

While the existing documentation is practical and well-suited for a lean startup, it lacks the formal structure and segregation required for a Final-Year Engineering Project, formal team handover, and enterprise scalability. The upcoming documentation generation will parse this existing knowledge into formal structural templates.
