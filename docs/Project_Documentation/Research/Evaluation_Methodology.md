# Evaluation Methodology

## 1. Introduction
Because CareerPilot is being submitted as a Final-Year Engineering Project, rigorous academic evaluation methodology must be documented. The evaluation focuses on proving the system's efficacy, latency, and usability, rather than just its functional correctness.

## 2. Technical Evaluation (System Latency)
- **Objective:** Prove the live audio loop meets the <3.0s latency requirement.
- **Methodology:** 
  1. Record timestamps at the client side: `T1` (Mic off), `T2` (STT complete), `T3` (LLM complete), `T4` (TTS audio start).
  2. Conduct $N=100$ simulated interview turns.
  3. Calculate the mean latency and standard deviation.

## 3. Heuristic Evaluation (AI Scoring Accuracy)
- **Objective:** Prove the DeepSeek scoring mechanism is objectively aligned with human expectations.
- **Methodology:**
  1. Compile a dataset of 20 anonymized technical interview transcripts (10 good, 10 poor).
  2. Have 3 independent senior engineers score the transcripts manually on a 1-10 scale based on the rubric.
  3. Run the same 20 transcripts through the DeepSeek scoring prompt.
  4. Calculate the statistical variance between the Human Mean Score and the AI Score. An acceptable variance is $\pm1.0$.

## 4. User Experience Evaluation (Usability)
- **Objective:** Measure student anxiety reduction and interface clarity.
- **Methodology:**
  1. Conduct a System Usability Scale (SUS) survey post-interview with the beta cohort ($N=50$).
  2. Conduct a qualitative survey utilizing Likert scales (1-5) focusing on: "Did the AI voice feel natural?", "Was the feedback brutal but fair?", and "Did this practice reduce your anxiety for real interviews?".
