# Assumptions

The following foundational assumptions guide the design, architecture, and business strategy of the CareerPilot platform. If any of these are proven false, significant architectural or strategic pivots will be required.

## 1. Technical Assumptions
- **API Availability:** The generous free tiers provided by DeepSeek, Groq, and Nematron will remain available and sufficient for the entire duration of the MVP and initial B2B pilot phase (1-3 months).
- **Latency Tolerability:** Users will accept an audio response latency of ~2 to 3 seconds in a mock interview context, viewing it as processing or "thinking" time comparable to a human interviewer taking notes.
- **Microphone Quality:** The target demographic (college students) possesses standard laptop microphones that produce sufficient audio clarity for Groq Whisper to achieve >95% transcription accuracy without extensive noise-cancellation preprocessing.

## 2. Business and Market Assumptions
- **B2B Willingness to Pay:** Colleges are actively seeking scalable placement-prep tools and have available budget (approx. $10k - $20k per year) to license the software once empirical evidence demonstrates its efficacy.
- **Predictive Validity Hypothesis:** We hypothesize that students who consistently score > 7.0 (out of 10) on the Career Readiness Score will experience a statistically significant higher placement rate than those scoring below 5.0. (This will be tested via optional outcome tracking).

## 3. User Behavior Assumptions
- **Student Engagement:** Students will overcome initial resistance/anxiety toward AI interviewing if the platform provides immediate, actionable, and private feedback that they cannot get elsewhere.
- **Honesty in JDs:** Students will input realistic and relevant Job Descriptions rather than attempting to prompt-inject or break the AI context generator.
