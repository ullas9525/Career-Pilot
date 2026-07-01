# CareerPilot: Resume Scoring Rubric
## Role-Targeted, Weighted, Reproducible

---

## CORE PRINCIPLE

A resume score only means something relative to a target role. The same resume can correctly score 82 against an ML/Data role and 62 against a Fullstack role. The score must NOT be holistic/eyeballed - it must be the sum of explicit, weighted sub-scores, so the qualitative feedback and the number always agree.

**Total Score = Quantified Impact (30) + Keyword/Skill Coverage (25) + Project Description Quality (20) + Formatting & Structure (15) + Summary/Positioning (10) = 100**

Every score must be reproducible: same resume + same target role + same rubric = same score (or within 1-2 points) every time it's run. If repeated runs swing more than that, the prompt isn't constrained enough.

---

## DIMENSION 1: QUANTIFIED IMPACT (30 points)

**What it measures:** Does the resume contain real, specific, measurable outcomes - not just responsibilities?

A bullet only counts as "quantified" if it has a number, percentage, scale, time saved/reduced, or explicit before/after comparison. "Improved performance" is not quantified. "Reduced query time by 40%" is.

| Points | Criteria |
|--------|----------|
| 0-5 | No quantified outcomes anywhere. All bullets describe actions only ("built," "designed," "implemented") with no result attached. |
| 6-12 | 1 quantified outcome across the whole resume, or quantification attempted but vague ("improved accuracy" with no number). |
| 13-20 | 2-3 quantified outcomes, but inconsistent - some projects have them, others don't. |
| 21-26 | Most projects/experiences have at least one real metric. Pattern of measuring impact is visible. |
| 27-30 | Every major bullet has a specific, credible metric. Demonstrates a habit of measuring and communicating impact, not just listing tasks. |

**Scoring notes for the AI:**
- Do not award points for vague intensifiers ("significantly," "greatly," "highly") without a number attached
- A single strong quantified bullet repeated in spirit across 2-3 projects is better than one outlier metric buried in an otherwise unquantified resume
- Estimates are acceptable if framed honestly (e.g., "approximately 30% faster") - don't penalize for "approximately"

---

## DIMENSION 2: KEYWORD & SKILL COVERAGE AGAINST TARGET ROLE (25 points)

**What it measures:** Does the resume contain the specific tools, frameworks, and concepts a recruiter or ATS would search for, for THIS target role?

This dimension is entirely role-dependent. The keyword set must be pulled from the role-specific list below (Section: Role-Specific Keyword Sets), not generated freely each time - this keeps scoring consistent across runs and across students applying for the same role.

| Points | Criteria |
|--------|----------|
| 0-5 | Almost no keywords from the target role's core list present. Resume reads as unrelated to the role. |
| 6-12 | A few surface-level keywords present (e.g., one language, one tool) but core frameworks/concepts for the role are missing. |
| 13-18 | Roughly half of the core keyword set present. Some depth, but clear gaps in commonly-expected tools. |
| 19-23 | Most core keywords present, with some secondary/supporting keywords too. Minor gaps only. |
| 24-25 | Strong, role-appropriate coverage across core and secondary keywords, used naturally (not keyword-stuffed). |

**Scoring notes for the AI:**
- Pull keywords ONLY from the role's defined list (below). Do not invent or free-associate additional keywords each run - this is what causes inconsistent scoring across repeated attempts
- A keyword only counts if it appears in skills, project descriptions, or summary - not as an isolated buzzword with no supporting context
- Keyword stuffing (long lists with no project evidence) should be flagged in feedback, not rewarded with high points

---

## DIMENSION 3: PROJECT/EXPERIENCE DESCRIPTION QUALITY (20 points)

**What it measures:** Do descriptions follow Problem → Action → Result, or do they just list what was done?

| Points | Criteria |
|--------|----------|
| 0-5 | Descriptions are single vague phrases or just a tech list with no context. |
| 6-10 | Descriptions explain what was built/done (the action) but no problem framing and no result. |
| 11-15 | Most descriptions have action + some result framing, but it's inconsistent or the result is implied rather than stated. |
| 16-18 | Clear problem → action → result structure in most entries. |
| 19-20 | Every entry follows problem → action → measurable result, reads like it was written for a recruiter skimming in 6 seconds. |

**Scoring notes for the AI:**
- "Designed and developed X" is action-only (mid-band at best)
- "Built X to solve Y problem, resulting in Z" is full structure (top band)
- Penalize redundant phrasing repeated across multiple bullets (e.g., starting every line with "Implemented...")

---

## DIMENSION 4: FORMATTING & STRUCTURE (15 points)

**What it measures:** Is this resume actually readable and ATS-parseable?

| Points | Criteria |
|--------|----------|
| 0-4 | Inconsistent dates, unclear section breaks, hard to scan, likely to break ATS parsing (tables, columns, graphics). |
| 5-9 | Mostly readable but inconsistent formatting (mixed date formats, uneven bullet style, unclear hierarchy). |
| 10-13 | Clean, consistent, standard single-column layout. Minor polish issues only. |
| 14-15 | Fully consistent, scannable, appropriately concise for experience level, no formatting issues. |

**Scoring notes for the AI:**
- This dimension should NOT penalize a resume for being short if the student is early-career - length should be judged relative to experience level
- Penalize graphics/tables/columns specifically because they break ATS parsing, not because they look bad

---

## DIMENSION 5: SUMMARY/POSITIONING STATEMENT (10 points)

**What it measures:** Does the opening summary actually position the candidate for THIS role, or is it generic filler?

| Points | Criteria |
|--------|----------|
| 0-2 | No summary, or pure filler ("Hardworking individual seeking opportunities"). |
| 3-5 | Summary exists and names a general interest area, but isn't tailored to the target role. |
| 6-8 | Summary is tailored to the target role and mentions relevant skills/direction. |
| 9-10 | Summary is sharp, role-specific, and gives a clear, differentiated reason to keep reading - reads like a pitch, not a label. |

---

## EXPERIENCE-LEVEL BANDING (Important)

Raw scores should be interpreted differently depending on the student's year/experience level, since a 2nd-year student and a final-year student are not competing on the same baseline.

- **1st-2nd year students:** 55-70 is a strong, competitive score for this stage
- **3rd year / pre-final year:** 60-75 is competitive
- **Final year / graduating:** 70-85 is competitive; below 60 signals real gaps
- **Score above 85:** Reserved for resumes with consistent quantification, strong role-keyword density, and tight problem→action→result structure throughout - rare, not the default "good" outcome

The displayed score should always show both the raw number AND a one-line context note, e.g., "62/100 - solid for a 2nd-year student targeting Fullstack; here's how to close the gap."

---

## ROLE-SPECIFIC KEYWORD SETS

These are the fixed lists the AI must pull from for Dimension 2. Keep these centrally defined (not regenerated per request) so two students targeting the same role get consistent scoring.

### Fullstack Engineer
**Core (must-have signals):** React or Angular or Vue.js, Node.js, Express, REST APIs, SQL or MongoDB/NoSQL, Git/GitHub, HTML/CSS, JavaScript/TypeScript
**Secondary:** Docker, CI/CD, AWS/Azure/GCP basics, Authentication (JWT/OAuth), Testing (Jest, Mocha), GraphQL

### Backend Engineer
**Core:** A backend language (Python/Java/Go/Node.js), REST API design, SQL databases, System design basics, Git/GitHub, Data structures & algorithms
**Secondary:** Docker/Kubernetes, Caching (Redis), Message queues (Kafka/RabbitMQ), Cloud platform (AWS/GCP/Azure), Microservices

### Frontend Engineer
**Core:** JavaScript/TypeScript, React or Vue or Angular, HTML/CSS, Responsive design, Git/GitHub, State management (Redux/Context API)
**Secondary:** Accessibility (a11y), Performance optimization, Testing (Jest, React Testing Library), Build tools (Webpack/Vite), Figma/design collaboration

### Data Scientist / ML Engineer
**Core:** Python, Data preprocessing, ML frameworks (scikit-learn, TensorFlow, or PyTorch), Statistics fundamentals, Pandas/NumPy, Model evaluation metrics
**Secondary:** SQL, Data visualization (Matplotlib/Seaborn/Tableau), Cloud ML tools, NLP or Computer Vision specialization, MLOps basics, Jupyter

### Data Engineer
**Core:** SQL, Python, ETL/data pipelines, A data warehouse (Snowflake/BigQuery/Redshift), Git/GitHub
**Secondary:** Apache Airflow/Spark, Cloud platform (AWS/GCP/Azure), Data modeling, Kafka/streaming basics, Docker

### Product Manager
**Core:** Product roadmapping, User research, Data-driven decision making, Stakeholder communication, A/B testing or experimentation
**Secondary:** SQL (basic), Wireframing tools (Figma), Agile/Scrum, Analytics tools (Mixpanel/Amplitude/GA), Market/competitive analysis

---

## EXAMPLE: SAME RESUME, TWO ROLES (Reference Case)

Using a resume with ML/IoT projects, JavaScript listed, Git/GitHub experience, no React/Node/MongoDB, one quantified outcome:

**Scored against Data Scientist/ML Engineer:**
- Quantified Impact: 14/30 (one real metric, ML-relevant)
- Keyword Coverage: 19/25 (Python, ML frameworks implied by project work, data preprocessing present)
- Project Quality: 14/20 (clear action, partial result framing)
- Formatting: 13/15
- Summary: 6/10 (mentions ML interest but not sharply positioned)
- **Total: ~66/100**

**Scored against Fullstack Engineer:**
- Quantified Impact: 10/30 (same one metric, but less relevant to fullstack work)
- Keyword Coverage: 15/25 (JavaScript present, but React/Node/Express/MongoDB absent)
- Project Quality: 14/20 (same descriptions, lower role-relevance)
- Formatting: 13/15
- Summary: 6/10
- **Total: ~58-62/100**

**This is correct behavior, not inconsistency.** The same resume legitimately scores differently because the dimensions are measuring fit-to-role, not absolute resume quality. The UI must make the selected target role visible and easy to change so students understand why their score shifts when they switch roles.

---

## WHAT THE AI MUST OUTPUT (Structure)

To keep this auditable and prevent the "82 despite missing keywords" problem from before, every resume scoring call should return:

1. **Per-dimension score** (not just the total) - e.g., "Quantified Impact: 10/30"
2. **One-line justification per dimension** - directly tied to specific resume content, not generic
3. **Total score** - must equal the sum of the five dimension scores, never a separately-generated number
4. **Role context note** - "Scored against: Fullstack Engineer"
5. **Top 2-3 action items** - specific to this resume's actual content (reference their actual project names, not generic advice)

If the total displayed doesn't match the sum of the dimensions, that's a bug to catch in testing, not a rounding quirk to ignore.

---

## CONSISTENCY CHECK (Before Trusting This in Production)

Run the same resume through the same target role 3-5 times. The total score should not vary by more than 2-3 points, and the keyword list flagged as "missing" should be identical or near-identical each time. If it swings more than that, the prompt needs tighter constraints (e.g., explicitly pasting the fixed keyword list into the prompt rather than asking the model to recall or generate it).