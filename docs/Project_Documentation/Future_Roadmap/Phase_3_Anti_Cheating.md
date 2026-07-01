# Phase 3: Adaptive Anti-Cheating

As CareerPilot usage scales, students may attempt to "game" the system to artificially inflate their Career Readiness Scores. Phase 3 focuses entirely on preserving the integrity of the assessment.

## 1. Dynamic Follow-up Probing
- **Mechanism:** The Nematron AI interviewer will be trained to detect shallow, memorized definitions.
- **Example Flow:**
  - *Student:* "I used FastAPI because it is asynchronous."
  - *AI:* "Can you explain how the asynchronous event loop in FastAPI actually works under the hood?"
- **Goal:** Differentiate between students who memorized a definition and those who possess deep architectural understanding.

## 2. Resume Contradiction Detection
- **Mechanism:** DeepSeek will maintain the student's parsed resume in its active context window during the live interview.
- **Example Flow:**
  - *Student:* "I handled the entire database migration."
  - *AI:* "That's interesting. Your resume states you were a Frontend Intern on that project. How did you end up managing the database migration?"
- **Goal:** Ensure students are not exaggerating their project contributions.

## 3. Context-Aware Edge Cases
- **Mechanism:** Instead of asking standard LeetCode questions, the AI will introduce deliberate constraints based on the user's previous answers.
- **Example Flow:**
  - *Student:* "I would use a NoSQL database for this."
  - *AI:* "Assume the client now requires strict ACID compliance for financial transactions. How does that change your database choice?"
- **Goal:** Test adaptability and problem-solving under changing requirements, which cannot be easily googled mid-interview.
