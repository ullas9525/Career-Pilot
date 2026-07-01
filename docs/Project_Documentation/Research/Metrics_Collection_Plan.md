# Metrics Collection Plan

This document outlines exactly what data points CareerPilot will collect during the MVP phase to support both product iteration and the academic research report.

## 1. System Telemetry (Automated)
Captured via backend middleware and database triggers:
- **Audio Loop Latency:** Mean, Median, and 95th percentile latency (measured in milliseconds) of the STT -> LLM -> TTS pipeline.
- **API Error Rates:** Percentage of failed calls to Groq, DeepSeek, Nematron, and Tavily.
- **Session Abandonment Rate:** Percentage of users who start an interview but drop off before reaching the scoring screen (indicates UI friction or technical failure).

## 2. Platform Usage Metrics (Automated)
Captured directly from the `users` and `interviews` tables in Neon:
- **Activation Rate:** Number of registered students who complete at least one interview.
- **Practice Frequency:** Average number of interviews completed per active student per week.
- **Score Progression:** The delta between a student's first Career Readiness Score and their most recent score.

## 3. Qualitative User Feedback (Manual/Survey)
Collected via optional Typeform/Google Forms links sent post-interview:
- **NPS (Net Promoter Score):** "On a scale of 0-10, how likely are you to recommend CareerPilot to a classmate?"
- **Anxiety Reduction:** "Did practicing on CareerPilot make you feel less anxious about your upcoming real interviews?" (Yes/No/Unsure).
- **Rubric Clarity:** "Did you understand exactly why the AI gave you the score it did?" (1-5 Likert Scale).
