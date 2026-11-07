# CareerPilot: Technical Solutions Architecture
## Honest, Production-Ready Design (Zero-Cost Version)

---

## 1. OBJECTIVE SCORING WITH HALLUCINATION PREVENTION

### The Core Problem
AI hallucinations occur when the LLM invents facts about the student's answer that weren't actually stated. Examples:
- Student says: "I built a web app"
- AI notes: "Technologies used: React, Node.js, PostgreSQL" (student never mentioned these)
- Score inflated based on hallucinated details

### Solution: Structured Output + Validation Pipeline

**Step 1: Constrained Prompting**

When you send the transcript to Claude for scoring, use a strict system prompt that enforces:
- Score ONLY facts explicitly stated in the transcript
- Do NOT infer or assume technologies, tools, or methodologies the candidate didn't mention
- Do NOT add context from their resume unless directly referenced
- If the candidate's answer is vague, score it as vague (don't fill gaps)
- Return structured format (not free-form text)

The system prompt should make clear that you want:
- Relevance score (0-10)
- Clarity score (0-10)
- Depth score (0-10)
- Hallucination flag (yes/no)
- If hallucinations detected, list what was assumed

**Step 2: Transcript Validation**

Before you trust the AI score, validate it yourself using this manual process:
- Read the student's transcript
- Look at the AI's scoring reasoning
- Ask: Did the AI mention ANY technology, methodology, or skill that the student didn't explicitly say?
- If YES → that's a hallucination, mark it, don't use that score

You can spot-check manually or create a simple checklist.

**Step 3: Confidence Scoring**

Every evaluation should include a confidence level that you assess yourself:
- HIGH confidence (0.75+) = Clear transcript, explicit examples, no ambiguity
- MEDIUM confidence (0.50-0.75) = Some vague parts, but understandable intent
- LOW confidence (<0.50) = Very unclear, rambling, hard to assess

Mark low-confidence scores for your manual review later.

**Step 4: Human Validation Loop**

As the expert:
- You manually review 10% of all interviews (pick randomly)
- Score them independently using your rubric
- Compare your score vs AI score
- If difference > 1.5 points: investigate why, adjust prompt if needed
- Monthly: Track how often AI and you disagree

---

## 2. GROUND TRUTH ESTABLISHMENT (Critical!)

### The Real Question
"Does a student who scores 8+ actually perform better in real interviews?"

**This cannot be answered without data.** Start with this pilot phase:

### Phase 1: Expert Validation (You as the Expert)

**Your Role:**
Since you are the expert, you will manually review and score interviews to validate the AI scoring.

**Process:**
1. Student completes mock interview on CareerPilot (AI provides immediate score)
2. Extract the transcript
3. You score it independently using the same rubric (without looking at AI score first)
4. Compare your score vs AI score
5. Track the delta over time

Create a simple spreadsheet to log:
- Interview ID
- Your score
- AI score
- Difference (delta)
- Notes on why there was a difference (if any)

After reviewing 50 interviews:
- Calculate how often you and AI agree
- Target: Agreement within ±0.5 points at least 80% of the time
- If AI frequently scores 1.5+ points higher than you, it's hallucinating
- If AI frequently scores lower, adjust the prompt

### Phase 2: Outcome Tracking (Months 3+)

**Follow-up Survey (6 months post-interview):**

Create a simple form students can fill out asking:
- Did you have an actual job interview for the role you prepared for?
- What was the outcome? (Got job, final round rejection, early rejection, pending, other)
- How helpful was the CareerPilot feedback? (Very helpful, somewhat helpful, not helpful, didn't use it)

You can use Google Forms (free) for this.

**Analysis:**

Track the data in a spreadsheet and look for patterns:
- Students who scored 8-10: What % got offers?
- Students who scored 6-8: What % got offers?
- Students who scored 4-6: What % got offers?
- Students who scored <4: What % got offers?

If the placement rate increases predictably with score (higher score = higher placement), your rubric is working. If there's no pattern, your scoring is misaligned.

**Example Target Pattern:**
- Score 8-10: 40%+ placement rate
- Score 6-8: 20-30% placement rate
- Score 4-6: 8-15% placement rate
- Score <4: <5% placement rate

### ATS Score (Not Comparative)

You're right: ATS scoring doesn't need comparison. But you DO need:
- **Explicit criteria:** Document exactly what makes a 7.5 resume vs 6.2
- **Transparency:** Show the student exactly why they got 7.5
- **Validation:** You manually review 20 resumes, ensure AI scores match your assessment

**Resume Scoring Rubric Structure:**

Create categories with point values:

Formatting (10 points max): Single page, clear sections, no typos, consistent dates, professional presentation

Experience Clarity (30 points max): Uses action verbs, includes specific metrics/outcomes, shows clear project results

Technical Keywords (30 points max): Matches job description keywords, includes relevant tools and frameworks

Project Showcase (20 points max): Projects described with clear impact, links to portfolio/GitHub if applicable

Education and Certifications (10 points max): Relevant degree and certifications listed

Total score out of 100 points, then convert to 0-10 scale. Document specific examples of what each point level looks like so it's consistent.

---

## 3. PRIVACY & DATA ARCHITECTURE

### What You Delete
✅ Video files  
✅ Audio files  
✅ Raw speech data  

### What You Keep
✅ Transcript (text)  
✅ Scores (numeric)  
✅ Feedback (text)  
✅ Timestamp  

### Database Structure (Use Render Free PostgreSQL)

Create these tables in your Render PostgreSQL database:

**Students Table:**
- Student ID (unique identifier)
- Email (unique)
- Password (hashed)
- Registration date
- Data retention consent (yes/no)

**Interviews Table:**
- Interview ID (unique)
- Student ID (foreign key)
- Job title
- Company name
- Interview date
- Final score
- Completion status
- Created date/timestamp

**Important:** Do NOT create fields for video_url, audio_url, or raw_data. These should never be stored permanently.

**Interview Answers Table:**
- Answer ID (unique)
- Interview ID (foreign key)
- Question text
- Transcript (text only - output from speech-to-text)
- Answer score
- Created timestamp

**Feedback Table:**
- Feedback ID (unique)
- Interview ID (foreign key)
- Answer ID (foreign key)
- Feedback text
- Areas for improvement
- Strengths identified
- Created timestamp

**Audit Log Table (for compliance):**
- Log ID (unique)
- Student ID
- Action (DELETE, ACCESS, EXPORT)
- Timestamp
- IP address (if needed)
- Reason for action

### Media File Cleanup (Automated via Uptime Bot)

Use an uptime monitoring service (like UptimeRobot, which is free) to trigger a cleanup job every 24 hours:

The job should:
1. Find all interviews completed more than 24 hours ago where video/audio hasn't been deleted yet
2. Delete the video and audio files from storage (use AWS S3 free tier, Firebase Storage, or similar)
3. Update the database to mark those files as deleted
4. Log the deletion action in the audit table

Set up a cron endpoint in your backend that runs this cleanup. Call it via the uptime bot every 24 hours. The uptime bot will also keep your Render instance from sleeping (by hitting it every 10 minutes), which solves the free tier wake-up issue.

### GDPR Compliance

When a student requests complete data deletion, the process should be:

1. Do NOT physically delete everything (you may need it for legal reasons)
2. Instead, ANONYMIZE their personal data
3. Delete personal scores and feedback
4. Keep anonymized interview transcripts for analytics only

This allows you to honor deletion requests while still having data for improvement.

---

## 4. FACE EXPRESSION DETECTION (Honest Assessment)

### What's Actually Possible
✅ Detect multiple faces (cheating signal)  
✅ Detect extreme angles (student not looking at camera)  
✅ Detect sudden scene changes (tab switching)  

### What's NOT Possible (and Claims to Avoid)
❌ "Detecting confidence from facial expressions"  
❌ "Identifying emotional state" → Pseudoscience  
❌ "Predicting interview success from face" → Discriminatory  

### Actual Implementation

Use a simple WebRTC video analysis approach with TensorFlow.js (free, open-source):

**What to Monitor During Interview:**

1. **Face Detection:** Check if a face is visible in the frame at all times. If no face detected for more than 10 seconds, flag as "Student not in frame"

2. **Multiple Faces:** If more than one face is detected, flag as "Multiple people detected" (potential cheating)

3. **Head Pose Analysis:** Check if the student's head is tilted more than 30 degrees (they might be reading answers). Flag as "Looking away from camera"

4. **Scene Changes:** Detect if the background suddenly changes significantly (tab switching)

**What NOT to Do:**

Do NOT try to measure:
- Confidence level from facial expressions
- Stress or anxiety from facial features
- Honesty from eye movements
- Intelligence from facial structure

These are pseudoscience and can be discriminatory.

**Report to Student:**

When showing results, be explicit about what you measured and what it is NOT:

"Interview Environment Check:
- Single person detected during interview ✓
- Face visible in frame 94% of time ✓
- Camera angle optimal throughout ✓

Note: This is an environment quality check, not an evaluation of your interview performance or confidence level."

---

## 5. COMPANY-SPECIFIC QUESTIONS

### The Legal Problem
Web scraping company interviews can violate:
- Terms of Service (Glassdoor, LeetCode, etc.)
- Copyright (verbatim questions)
- Competitive concerns

### Legal Alternative: Three-Tier Approach

**Tier 1: Public Question Databases (Licensed)**
- Use Glassdoor Interview Questions if available
- Use Blind community data (if licensing available)
- Use InterviewBit/LeetCode public content (with permission)

**Tier 2: Create Your Own + Partner with Companies**

Email tech company HR directors:

"Hi [HR Manager],

We're building CareerPilot, an AI interview prep platform. We'd like to feature 5-10 real interview questions your company uses to help students prepare. In exchange:

- You get free access to the platform
- You can see performance data on candidates using your questions  
- We properly credit your company

Are you interested?"

Benefits of this approach:
- Legal permission to use questions
- Real, authentic questions
- Company buy-in for validation data
- Free marketing for your platform

**Tier 3: Crowd-Sourced (Student Submissions)**

After a student completes an interview at a real company, ask:

"Would you share the interview questions you received? (Make sure you have permission from the company first)"

This is legal because students own their own experience and interview feedback. You can verify and add high-quality submissions to your question bank.

### Storage Strategy

Create a simple database structure to organize questions:

**Company Questions Table:**
- Question ID
- Company name
- Job role/title
- Question text
- Difficulty level (easy/medium/hard)
- Source (Glassdoor, Blind, submitted by student, licensed)
- Date added
- Number of students who practiced with this question

**Company Profiles Table:**
- Company name
- Company logo (optional)
- Description
- HR contact email
- Approved by company (yes/no)
- Total questions available
- Average difficulty

This allows you to:
- Track which questions are most useful
- Know which companies you have permission from
- Identify companies interested in seeing candidate performance data
- Build relationships for future features

---

## 6. VALIDATION STRATEGY FOR SCORING RUBRIC (Your Q6)

### Problem: How to Ensure Your Rubric is Actually Good?

This is critical. A bad rubric tanks everything.

### Solution: Triple-Validation Approach

**Phase 1: Expert Consensus (You as the Expert - Weeks 1-2)**

Since you are the expert:

1. Pick 3 sample interview transcripts (one weak, one average, one strong)
2. Score each one yourself using your rubric
3. Document your reasoning for each score
4. These become your "gold standard" examples

Keep these transcripts and your scoring decisions. Use them as reference points to ensure consistency as you score future interviews.

**Phase 2: Rubric Refinement (Week 3)**

As you score the first 20 interviews, track:
- Are the scores spreading evenly across the range or clustering?
- Are you scoring similar answers consistently?
- Are there dimensions where you feel uncertain?

Create detailed rubric examples for each score level. For example:

**Communication (0-10 scale):**

10 = Clear step-by-step explanation, explains jargon, easy to follow
8 = Mostly clear, one or two unclear points but overall understandable
6 = Explanation present but somewhat rambling, takes a while to get the point
4 = Mostly unclear, hard to follow the logic
0 = No explanation, incoherent or refuses to answer

Add actual transcript examples for score 8 and score 4 so you have concrete reference points.

**Phase 3: Historical Validation (Month 1+)**

Once you have reviewed 50+ student interviews over a month:

1. Sort students by their AI score
2. Track which ones reach back out to you saying they got interviews/offers
3. Identify patterns

Look for correlation:
- Students scoring 8-10: What percentage report getting interviews or offers?
- Students scoring 6-8: What percentage report getting interviews or offers?
- Students scoring <6: What percentage report getting interviews or offers?

If students with higher scores consistently report better outcomes, your rubric is working. If there's no pattern, you need to adjust.

**Phase 4: Continuous Improvement**

Every month:
- Review the 5 interviews that you scored most differently from the AI
- Understand why the difference happened
- Update your rubric examples if needed
- Note patterns in what causes hallucinations

Keep a simple log of rubric refinements you make and why.

---

## 7. AUDIO-TO-SPEECH + VIDEO PIPELINE

### Architecture Overview

**Step 1: Student Records Answer**
- WebRTC captures audio and video on the student's browser
- Maximum 3-minute recording
- Stored temporarily in browser memory

**Step 2: Send to Backend**
- Audio and video sent to your backend (HTTPS encrypted)
- Both files stored temporarily in a free storage service (AWS S3 free tier, Firebase Storage, or similar)

**Step 3: Audio to Text (Groq API)**
- Send audio file to Groq's speech-to-text API
- Groq returns the transcript as text
- Groq is very cheap ($0.01 per interview)

**Step 4: AI Scoring (Claude API)**
- Send transcript to Claude API for scoring
- Claude scores based on your rubric
- Claude returns structured score data

**Step 5: Generate Feedback (Claude API)**
- Use Claude to generate natural language feedback based on the score
- Keep feedback concise and actionable

**Step 6: Text to Speech (Deepgram API)**
- Send feedback text to Deepgram's text-to-speech API
- Deepgram generates audio of the feedback in a natural voice
- Stream audio back to student

**Step 7: Store Permanently**
- Save to database: transcript, scores, feedback text
- Do NOT save: original audio file, video file

**Step 8: Delete Media Files**
- Schedule deletion of video and audio files after 24 hours
- Use your uptime bot to trigger this daily
- Log the deletion in audit table

### Implementation Notes

Use Render's free PostgreSQL for storage. Set up a scheduled endpoint in your backend that runs once daily via UptimeRobot. This endpoint should:

1. Query database for all interviews completed more than 24 hours ago
2. Delete video files from cloud storage
3. Delete audio files from cloud storage
4. Update database records to mark files as deleted
5. Log all deletions for compliance

The uptime bot (UptimeRobot hitting your endpoint every 10 minutes) also solves the Render free tier issue where apps sleep. Since you'll be hitting your app every 10 minutes, it stays awake.

---

## 8. GITHUB OPTIONAL SCORING (Phase 2)

If a student has GitHub:
- Analyze their public repositories count
- Check programming languages used
- Assess activity level (commits in last 90 days)
- Score code presence positively but not mandatorily

Create a simple scoring rubric:
- 10-12+ repositories: Good sign of consistent coding
- 5-9 repositories: Moderate portfolio
- <5 repositories: Limited portfolio (not bad, just new)
- Active in last 90 days: Shows current engagement
- No activity: Dormant profile

Display this as optional feedback, not a major scoring factor.

**Important:** This is OPTIONAL. If student has no GitHub, don't penalize them.

---

## 9. ZERO-COST ARCHITECTURE

### What You Need (Free Tier)

**Render PostgreSQL Database:**
- Free tier PostgreSQL (up to 512MB storage)
- More than enough for MVP (500+ interviews with transcripts)

**Uptime Bot (UptimeRobot):**
- Free tier allows monitoring and hitting endpoints every 5 minutes
- Keeps your Render app awake (solves the sleep issue)
- Can trigger cleanup jobs daily

**APIs (All Have Free Tiers):**
- Groq Speech-to-Text: ~$0.01/interview
- Claude API: ~$0.02/interview for scoring
- Deepgram Text-to-Speech: ~$0.02/interview
- Total API cost: ~$0.05 per interview

**Cloud Storage (24-hour temporary):**
- AWS S3 free tier: 5GB/month (plenty for 24-hour temp storage)
- Firebase Storage free tier: 1GB/month (also works)

**Backend Hosting:**
- Render free tier Node.js/Python app
- Free SSL
- Kept awake by UptimeRobot pings

### Total Monthly Cost (After MVP)
- If 500 students per month: 500 × $0.05 = $25 in API costs
- Everything else: FREE

### What You DON'T Pay For
- No database costs (Render free)
- No hosting costs (Render free)
- No uptime monitoring (UptimeRobot free)
- No video storage (deleted after 24h)

---

## 10. IMPLEMENTATION TIMELINE (Solo Expert)

**Week 1:**
- Define scoring rubric in detail (written document)
- Create 3 sample interview transcripts (weak, average, strong)
- Score them yourself multiple times to ensure consistency
- Document examples for each score level

**Week 2:**
- Build database schema (just 5 tables, very simple)
- Deploy Render PostgreSQL
- Build basic backend for score storage

**Week 3:**
- Integrate Claude API for scoring
- Test scoring on 5 interviews
- Compare your scores vs AI scores
- Document any hallucinations

**Week 4:**
- Integrate Groq (speech-to-text)
- Integrate Deepgram (text-to-speech)
- Test full audio pipeline end-to-end

**Week 5:**
- Set up media deletion job
- Configure UptimeRobot to trigger cleanup daily
- Test deletion works correctly

**Week 6:**
- Build simple frontend for recording
- Test with 10 real students (beta)
- Collect feedback

**Week 7-8:**
- Refine based on feedback
- Launch MVP publicly
- Start tracking outcomes

---

## 11. CRITICAL SUCCESS FACTORS

**Before Launch:**
1. ✓ Scoring rubric is explicit and detailed
2. ✓ You've tested AI scoring vs your scoring (consistency check)
3. ✓ Hallucination detection is working
4. ✓ Media deletion is automated and logged
5. ✓ You have a plan to track if students improve

**After Launch (Month 1+):**
1. Track which students report getting interviews/offers
2. Identify patterns in scores
3. Refine rubric based on feedback
4. Celebrate wins and learn from failures

---

## 12. WHAT SUCCESS LOOKS LIKE

**Month 1 (MVP):**
- 50-100 students use platform
- Your manual reviews match AI scores 80%+ of the time
- No data leaks or privacy issues

**Month 3:**
- 200+ students total
- Outcome data starts showing patterns
- Placement rate correlates with scores (higher score = higher success rate)

**Month 6:**
- 500+ students
- Confidence that your scoring is predictive
- Ready to add Phase 2 features (company questions, resume scoring, etc.)

---

## KEY REMINDER

This is NOT about being "perfect" or having every feature. This is about:

✓ Solving one problem really well (teaching interview skills)
✓ Proving your approach works with data (not assumptions)
✓ Staying profitable (free/cheap infrastructure)
✓ Building trust (transparent scoring, real feedback)
