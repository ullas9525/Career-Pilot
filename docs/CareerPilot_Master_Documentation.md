# CareerPilot: Complete Project Documentation
## AI-Based Mock Interview Preparation Platform

---

## 1. PROBLEM STATEMENT

College students go through a placement process that typically has four stages: aptitude tests, coding rounds, technical rounds, and interviews. Most students can clear the first three stages because they involve concrete, study-able knowledge, and AI tools already help them prepare for aptitude and coding.

The interview round is different. Students often have the knowledge to answer well, but fail because of:

- **Lack of confidence and high anxiety** during real interviews, which prevents them from showcasing what they actually know
- **Ineffective practice methods** - practicing in a mirror gives no feedback, and practicing with friends gives biased, overly positive feedback
- **No personalization** - generic interview guides don't account for a student's specific resume, projects, or the job description they're targeting
- **No access to realistic practice** - human mock interviews are rare, hard to schedule, time-consuming for both parties, and don't happen "on demand"

The result: students who are technically capable fail interviews not because they lack skills, but because they've never had realistic, repeated, honest practice with feedback that tells them exactly what's wrong and how to fix it.

---

## 2. THE SOLUTION

CareerPilot is an AI-based mock interview system that lets students practice realistic, role-specific interviews anytime, get scored against an industry-aligned rubric, and receive specific, actionable feedback - all without needing to schedule a human interviewer.

**Core capabilities:**

- The interview itself is a live spoken conversation: the AI interviewer speaks first (e.g., asks the student to introduce themselves), the student answers by speaking, that answer is converted to text and sent to the AI, and the AI's next question/response is converted back to speech - this audio-to-audio loop continues for the full interview
- Once the interview ends, the complete transcript is scored against an explicit, role-specific rubric and turned into a detailed feedback report
- The feedback report (score breakdown, explanations, rubric comparisons) is shown as text/visual content only - it is not converted to speech
- Students see a score breakdown by dimension (not just one number), track progress over multiple sessions, and get an explanation of exactly why they scored what they did
- Placement coordinators get a dashboard showing which students are practicing, how they're progressing, who's at risk of being unprepared, and (optionally) real placement outcomes

---

## 3. WHO THIS IS FOR

**Primary users: Students**
Final-year college students preparing for placements. They use the platform to practice interviews for their target role (Backend Engineer, Frontend Engineer, Product Manager, Data Scientist, etc.) and improve over multiple sessions.

**Primary customers: Placement Coordinators / Colleges**
Placement departments care most about one number: placement rate. They need tools to see which students are preparing, identify students who are falling behind, and (ideally) prove that preparation correlates with better outcomes.

**Why colleges, not individual students, are the real customer:**
Selling directly to students is a hard, low-conversion, high-churn business. Selling to a college means one deal gives access to 500-1,000+ students at once, the college has institutional motivation (placement rate affects their reputation and rankings), and the college can mandate or strongly encourage usage in a way an individual app never could.

---

## 5. USER WORKFLOWS

### Student Journey

1. **Signup** - email + password, select target role (Backend, Frontend, PM, Data Science, Data Engineer, etc.)
2. **Start a mock interview** - the student enters the company name they want to interview with and provides the Job Description (JD). The backend automatically retrieves the student's saved resume details (projects, tech stack, resume score) and sends them to DeepSeek v4 flash. DeepSeek (utilizing the **Tavily Search API**) searches the web for relevant company interview questions based on the JD, analyzes the student's resume data, and sends this combined context to Nematron 3 Nano Omni. The AI interviewer (Nematron) then greets the student by voice and asks them to introduce themselves before moving into role-specific questions tailored to the JD and the student's projects.
3. **Live interview conversation** - the student answers by speaking; each answer is transcribed (Groq Whisper) and sent to the AI (Nematron 3 Nano Omni), which generates its next question or follow-up and speaks it back to the student (Edge TTS by default, with Deepgram as a premium/fallback option) - this loop continues for the full interview.
4. **Scoring** - once the interview ends, the complete transcript is sent to DeepSeek v4 flash, which brutally scores the interview against the role-specific rubric and generates a feedback report.
5. **Results & Career Readiness** - student sees their mock interview score (breakdown by rubric dimension, explanations, side-by-side comparison), concrete next steps, and a mathematically calculated **Career Readiness Score** (e.g., Resume 30% + Interview 60% + Practice Consistency 10%) shown as text/visual content.
6. **Progress tracking** - student sees their score trend across sessions (e.g., 5.2 → 6.1 → 7.1) and which dimension is their biggest opportunity
7. **Optional outcome reporting** - if the student has a real interview later, they can (optionally, one click) report whether they got an offer, were rejected, or are still waiting

### Placement Coordinator Journey

1. **Create a batch/cohort** - e.g., "Final Year CS - Amazon Prep 2024," add students, assign role
2. **Monitor the dashboard** - see total students, how many are actively practicing, average scores, anxiety/engagement trends, and at-risk students (haven't practiced in several days)
3. **Track outcomes (optional)** - log real placement results for students they know about ("Alex got an offer at Google," "Sarah was rejected at Amazon")
4. **Use outcome data** - over time, the dashboard aims to evaluate any potential correlation between mock interview scores and real offer rates
5. **Take action** - nudge inactive students, celebrate successes, identify which students need more support before their interviews

---

## 6. TECHNICAL ARCHITECTURE (ZERO-COST)

### Pipeline

The core interview loop works as follows:

The interview runs in three phases:

**Phase 1 - Preparation (DeepSeek Context Generation):**
1. Student provides the target company name and Job Description (JD). The system automatically retrieves their saved resume details (projects, tech stack, and resume score).
2. **DeepSeek v4 flash API** (integrated with the **Tavily Search API**) performs a web search for the company's specific interview questions and analyzes the JD alongside the student's resume data to create personalized interview context.
3. This combined context is handed over fully to **Nematron 3 Nano Omni API** for the live interview loop.

**Phase 2 - Live conversation (audio-to-audio loop):**
4. The AI interviewer's opening line (e.g., "Please introduce yourself") is generated by **Nematron 3 Nano Omni**, converted to speech via **Edge TTS** (default, completely free), and played to the student
5. Student responds by recording audio in the browser (WebRTC)
6. Audio sent to backend, converted to text via **Groq Whisper API** (speech-to-text, free tier)
7. Transcript sent to **Nematron 3 Nano Omni API**, which generates the next question or follow-up based on the initial DeepSeek context
8. That response is converted to speech via **Edge TTS** (or Deepgram as an optional premium fallback) and played back to the student
9. Steps 5-8 repeat for each question until the interview ends

**Phase 3 - Scoring & feedback (text only, after the interview ends):**
10. The full interview transcript is sent to **DeepSeek v4 flash API** for brutal scoring against the role-specific rubric and feedback generation
11. The feedback report (score breakdown, explanations, rubric comparisons) is displayed to the student as text/visual content - it is not converted to speech
12. Transcript, score, and feedback are stored permanently; audio and video are deleted immediately after the interview ends

### Infrastructure (all free-tier)

- **Backend hosting:** Render free tier (Node.js/Express or FastAPI)
- **Database:** Neon serverless PostgreSQL (512MB storage, sufficient for transcripts/scores - no media stored long-term)
- **Uptime / scheduling:** UptimeRobot pinging the backend every ~10 minutes, which keeps the free Render instance awake
- **No media storage:** Audio and video are processed during the session and deleted immediately after the interview ends; no temporary storage is maintained

### Per-Interview Cost

With the free tiers of the chosen services, the marginal cost is:

- Groq (STT): Near-zero cost during MVP stage assuming usage remains within free-tier limits.
- Tavily Search API: Near-zero cost during MVP stage assuming usage remains within free-tier limits.
- DeepSeek / Nematron: Near-zero cost during MVP stage assuming usage remains within free-tier limits.
- Edge TTS: Near-zero cost during MVP stage assuming usage remains within free-tier limits.
- Deepgram (optional premium fallback): Near-zero cost during MVP stage (until the $200 free credit is consumed).

**Total:** Near-zero cost during MVP stage assuming usage remains within free-tier limits.

---

## 7. DATA MODEL (HIGH LEVEL)

Core tables:

- **Students** - id, email, password hash, role selection, signup date, consent flags
- **Interviews** - id, student id, role, date, completion status, final score (mock interview score), resume score, career readiness score
- **Interview Answers** - id, interview id, question text, transcript (text only), per-question score
- **Feedback** - id, interview/answer id, feedback text, strengths, areas for improvement
- **Outcomes** - id, student id, company, role, status (offer/rejected/pending), reported by (student or coordinator), date
- **Audit Log** - records of data access, exports, and deletions (for compliance)

**Important:** there are no fields for storing video or audio. Media is processed and deleted immediately after the interview ends.

---

## 8. PRIVACY & DATA RETENTION

- **Deleted immediately:** video recordings, audio recordings, any raw media are discarded as soon as the interview concludes
- **Kept permanently:** transcripts (text), scores, feedback text, timestamps
- **Immediate cleanup:** The system immediately deletes all associated media from memory/disk once the interview session ends, requiring no scheduled cleanup jobs
- **GDPR-style rights:** students can export their data (download button) or request account deletion. On deletion, personal identifiers are anonymized rather than fully erased, so aggregate analytics (which depend on transcripts/scores) remain intact, but the data can no longer be tied back to the individual

---

## 9. SCORING SYSTEM

### Why a Generic Rubric Doesn't Work

A backend engineer and a product manager are evaluated on fundamentally different things. Scoring both with the same rubric means engineers get penalized for not discussing strategy, and PMs get penalized for not discussing algorithms. So every role has its own rubric with its own dimensions and weights.

### Role-Specific Rubrics (Dimensions & Weights)

**Backend / Full-Stack Engineer**
- Technical Depth: 40% (algorithms, system design thinking, code correctness, edge cases)
- Problem-Solving Approach: 30% (breaking down problems, asking clarifying questions, validating solutions)
- Communication: 20% (explaining decisions clearly, walking through logic)
- Culture Fit: 10% (collaboration attitude, openness to feedback)

**Frontend Engineer**
- Technical Depth: 35% (JavaScript/CSS, browser APIs, component architecture)
- Problem-Solving: 25% (debugging, performance optimization, state management)
- User-Centric Thinking: 20% (accessibility, UX awareness, mobile considerations)
- Communication: 15%
- Culture Fit: 5%

**Product Manager**
- Communication & Strategy: 50% (articulating vision, user needs, stakeholder communication)
- Analytical Thinking: 20% (data-driven reasoning, metrics focus)
- Leadership: 15% (influence without authority, decision-making)
- Product Sense: 15% (user behavior understanding, prioritization, competitive awareness)

**Data Science / Data Engineer** roles follow the same pattern, with technical/statistical depth weighted highest, followed by problem-solving, communication, and culture fit, with weights adjusted to reflect what each role actually requires day-to-day.

### Career Readiness Score (Holistic Metric)

While individual interviews are scored from 0-10, the platform calculates a final **Career Readiness Score** mathematically combining the user's performance across dimensions:
- **Interview Score:** 60%
- **Resume Score:** 30%
- **Practice Consistency:** 10%
*(Example: Resume=72%, Interview=71%, Practice=100% -> Final Readiness = 76%)*

### What the Score Bands Mean (0-10 scale, applies across roles)

- **0-2:** Cannot perform at this level - no attempt, gives up, fundamental knowledge gaps
- **3-4:** Well below expectation - vague understanding, can't work through implications, no systematic thinking
- **5:** Below expectation but trainable - basic correctness, misses nuances, recognizes one tradeoff but not others
- **6:** Meets expectation (lower end) - solid understanding, clear explanation, recognizes most tradeoffs
- **7:** Meets expectation (upper end) - deep understanding, explains the "why" not just the "what," asks good clarifying questions
- **8:** Strong candidate - production-ready thinking, considers monitoring/failure modes/edge cases, quantifies tradeoffs
- **9:** Exceptional - thinks about compliance/business/security implications, knows when NOT to over-engineer, learns visibly from past mistakes
- **10:** Hire immediately - rare mastery, teaches the interviewer something, creative solutions to genuinely hard problems

### Score Explanation to Students

Rather than just showing "7.2/10," the results screen shows:

- A breakdown by dimension with visual bars and weights (e.g., Technical Depth 52/100, Communication 48/100)
- An explicit explanation: "Why 52 and not 60" - naming exactly what was missing (e.g., "you guessed 'React.memo' without explaining what it does or when to use it, and didn't discuss the memory-vs-render-cost tradeoff")
- A side-by-side comparison table showing what a 60, 70, and 80 answer would have included (concept named, tradeoffs discussed, real example given, answer length/structure)
- A specific, minimal "gap to next band" statement (e.g., "add one concrete technique name + one tradeoff sentence")

This is the difference between vague feedback ("improve your communication") and actionable feedback (showing exactly what separates their answer from a better one).


---

## 12. OUTCOME TRACKING (OPTIONAL, NOT MANDATORY)

Real-world interview outcomes are messy: companies frequently don't respond at all ("ghosting"), students don't want to be forced to report results, and feedback from real interviewers is rare. Rather than fight this, the system is designed around it:

- **Coordinators** can optionally log outcomes they become aware of through normal placement-cell activity ("Alex got an offer at Google") - this is low-effort because they already track this information
- **Students** can optionally self-report with a single click ("Got an offer" / "Rejected" / "Still waiting") - no mandatory surveys, no nagging
- **Expectation:** only a fraction of outcomes will ever be reported (perhaps 10-30%), and that's fine - even partial data reveals patterns (e.g., "students scoring 8+ report offers at 70-80%, students scoring 4-5 report offers at under 10%")
- **Presentation:** all outcome statistics are shown transparently as "based on reported outcomes (X% of students)" rather than implying complete data

This turns an impossible "track every real interview" requirement into a realistic "collect signal where it naturally exists" approach.

---

## 14. MVP SCOPE

### In Scope for Launch

- Student signup with role selection (Backend, Frontend, PM, Data Science, etc.)
- Audio-based mock interviews with role-specific questions (rotated)
- Full audio pipeline: preparation (DeepSeek v4 flash + Tavily Search API for web search on company and JD context), live conversational interview (Groq Whisper STT for student answers, Edge TTS for the AI interviewer's speech, with Nematron 3 Nano Omni driving the live conversation), and post-interview scoring (DeepSeek v4 flash brutally scoring the full transcript); final feedback report shown as text, not spoken
- Score breakdown by rubric dimension, with explanation of "why this score"
- Student progress tracking across sessions
- Placement coordinator dashboard: overview metrics, student list, at-risk alerts
- Optional outcome tracking (both coordinator-side and student-side, one-click)
- Privacy-first leaderboard (anonymous, cohort-only)
- GDPR-style data export/deletion
- Immediate media deletion post-interview with permanent transcript/score retention
- Resume scoring and analysis (included because the rubric is already mature)

### Phase 2 (Future Enhancements)
- LinkedIn / GitHub profile audits
- Video facial-expression / confidence analysis (avoided for both technical and ethical reasons)
- Full anxiety-management module (breathing exercises, real-time anxiety tracking) - may be revisited later once core product has usage data
- Company-specific question licensing/partnerships
- Faculty dashboards / curriculum feedback loops
- Multi-language support
- Peer-to-peer mock interviews

### Phase 3 – Adaptive Interview Intelligence & Anti-Cheating

*(Note: This feature is explicitly NOT included in MVP or Phase 2. It is a future enhancement to be implemented only after the core platform is stable.)*

The goal of this phase is to reduce score inflation caused by students reading AI-generated answers or using prepared scripts during interviews. 

Potential capabilities include:
- Dynamic follow-up questioning
- Project-specific deep dives
- Resume consistency checks
- Context-aware challenge questions
- Clarification questions when answers sound memorized
- Contradiction detection across interview responses
- Adaptive questioning based on previous answers
- Technical depth verification through multiple follow-ups

**Example of Technical Depth Verification:**
> **Student:** "I used FastAPI."
> **AI:** "Why FastAPI instead of Express?"
> **Student:** "Because it is faster."
> **AI:** "What specifically makes it faster?"
> **Student:** "Because of async."
> **AI:** "Explain the event loop and how asynchronous execution improves performance."

The purpose is not to "catch" students, but to ensure interview scores reflect genuine understanding rather than prepared scripts.

---

## 16. SUCCESS METRICS

**Student-level:**
- Average score improvement across sessions (target: meaningful upward trend, e.g., +1.5 points after 3-4 sessions)
- Retention: % of students doing a second practice session
- % of students reporting outcomes (even partial data is useful)

**Institution-level:**
- % of students actively practicing (target: majority of cohort doing 3+ sessions)
- Placement rate among platform users vs. baseline (to evaluate our core hypothesis)
- Coordinator engagement with the dashboard (are they using at-risk alerts?)

**Business-level:**
- Number of pilot-to-paid conversions
- Revenue per college
- Cost per interview (Near-zero cost during MVP stage assuming usage remains within free-tier limits)

---

## 17. OUTCOMES HYPOTHESIS & PREDICTIVE CLAIMS

CareerPilot **does not currently claim** that mock interview scores or career readiness scores directly predict real-world placement success. 

- The relationship between mock interview scores and real-world placement outcomes is currently a hypothesis.
- One objective of the platform is to collect optional outcome data over time.
- This data may later be used to study correlations between readiness scores, interview scores, and actual placement outcomes.
- Until sufficient data exists, all placement-success relationships should be presented as assumptions or hypotheses, not proven facts.

**Hypothesis:** Students who consistently achieve higher interview and readiness scores may have a higher probability of receiving job offers. CareerPilot aims to evaluate this hypothesis through optional outcome tracking over time.

---

## 18. KEY PRINCIPLES BEHIND THE DESIGN

- **Colleges are the customer, not students** - this shapes the entire dashboard and pricing strategy
- **Industry-aligned rubrics** - The rubrics are designed using industry interview practices and explicit scoring examples to improve consistency and transparency. Formal validation with hiring managers may be conducted in future iterations.
- **Transparent scoring** - students see exactly why they got a score and what a better answer looks like, not just a number
- **Privacy by default** - Immediate media deletion post-interview, anonymous leaderboards, GDPR rights built in from the start
- **Pragmatic data collection** - outcome tracking is optional and presented honestly as partial data, rather than forcing unrealistic reporting requirements
- **Near-zero cost infrastructure** - the entire stack runs on free tiers: Groq (STT), DeepSeek, Nematron, Tavily Search API, and Edge TTS (default) mean the marginal cost is near-zero during the MVP stage, keeping the platform sustainable even before revenue
- **Scope discipline** - features like anxiety management UI and facial expression analysis were deliberately evaluated and deferred, not forgotten, to keep the MVP buildable in under 9 weeks

---

END OF DOCUMENT