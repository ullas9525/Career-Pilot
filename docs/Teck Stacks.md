# **Career Pilot – Technical Architecture Document**

## **1\. Overview**

Career Pilot is an AI‑powered mock interview platform designed for students and placement coordinators. It simulates high‑stakes interviews, provides rubric‑based scoring, tracks improvement over time, and offers institutional analytics.

**Core Features:**

* Student dashboard with progress tracking  
* AI‑driven mock interviews (Tech, HR, Human Mentor)  
* Real‑time scoring with role‑specific rubrics  
* Transcript feedback and improvement plans  
* Cohort leaderboards and peer comparison  
* Placement coordinator dashboard with analytics and alerts  
* Post‑interview outcome tracking (optional)

**Technology choices prioritise:** low cost, fast development, and easy scaling.

---

## **2\. Technical Stack Summary**

| Layer | Technology | Purpose |
| ----- | ----- | ----- |
| **Frontend** | Vite \+ React (JavaScript) | Fast build, component‑based UI |
| **Backend** | FastAPI (Python) | High‑performance API with automatic OpenAPI docs |
| **Database** | Neon (PostgreSQL) | Serverless PostgreSQL with generous free tier |
| **Hosting (Frontend)** | GitHub Pages (or Vercel/Netlify) | Static site hosting |
| **Hosting (Backend)** | Render (free tier \+ UptimeRobot) | Node.js/Python app hosting with auto‑scaling |
| **Speech‑to‑Text** | Groq API (whisper‑large‑v3) | Fast, free, no credit card required |
| **Text‑to‑Speech** | Edge TTS (default) \+ Deepgram (fallback) | Free, high‑quality TTS; Deepgram as premium option |
| **Uptime Monitoring** | UptimeRobot (free) | Keeps Render app alive (pings every 10 min) |

---

## **3\. Architecture Diagram (Text‑Based)**

┌─────────────────────────────────────────────────────────────────────┐  
│                    			       USER (Browser)                				│  
└─────────────────────────────────────────────────────────────────────┘  
                                  │  
                                 ▼  
┌─────────────────────────────────────────────────────────────────────┐  
│			                    Frontend (Vite \+ React)                                                                         │  
│	  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐ 	│  
│ 	  │         Landing          │  │       Login               │  │       Dashboard       │  │            Mock          │  	│  
│ 	  │           Page            │  │        Page               │  │           Page            │  │         Interview       │  	│  
│  	  └────────────┘  └────────────┘  └────────────┘  └────────────┘  	│  
│                                                                  							│  
│  Hosted on: GitHub Pages / Vercel / Netlify                    						│  
└─────────────────────────────────────────────────────────────────────┘  
                                  │  
                                  │ HTTPS (REST API)  
                                 ▼  
┌─────────────────────────────────────────────────────────────────────┐  
│               			      Backend (FastAPI)                       				│  
│ 	 ┌────────────────────────────────────────────────────────────┐   │  
│ 	 │		                  API Endpoints (REST)                     			           │   │  
│ 	 │ 		 /auth, /users, /interviews, /answers, /scores, /cohort  		           │   │  
│  	└────────────────────────────────────────────────────────────┘    │  
│                                                                							│  
│  ┌────────────────────────────────────────────────────────────┐ 	│  
│  │              			           Integrations                                  		              │  	│	  
│  │  ├── Groq API (STT)                                       					              │   	│  
│  │  ├── DeepSeek v4 flash API (Search & Scoring) + Nematron 3 Nano Omni (Live Interview) 			              │   	│  
│  │  ├── Edge TTS / Deepgram (TTS)                            				              │   	│  
│  │  └── JWT Authentication                                   				              │   	│  
│  └────────────────────────────────────────────────────────────┘   	│  
│                                                                   							│  
│  Hosted on: Render (free tier \+ UptimeRobot)                     						│  
└─────────────────────────────────────────────────────────────────────┘  
                                  │  
                                 ▼  
┌─────────────────────────────────────────────────────────────────────┐  
│                     			 Database (Neon PostgreSQL)                   			│  
│  ┌────────────────────────────────────────────────────────────┐        	│  
│  │  		Tables: users, interviews, answers, scores, feedback,    		              │   	│  
│  │      			        outcomes, groups, cohorts, rubrics               		              │   	│  
│  └────────────────────────────────────────────────────────────┘   	│  
└─────────────────────────────────────────────────────────────────────┘  
                                  │  
                                 ▼  
┌─────────────────────────────────────────────────────────────────────┐  
│                 			       External APIs                                   				│  
│  		┌──────────────┐  ┌──────────────┐  ┌──────────────┐            	│  
│  		│         Groq (STT)         │  │ DeepSeek+Nematron │  │       Edge/Deepgram   │            	│  
│  		│     (Speech‑\>Text)	      │  │ (Search,Chat,Score) │  │  	    (TTS)              │            	│  
│  		└──────────────┘  └──────────────┘  └──────────────┘            	│  
└─────────────────────────────────────────────────────────────────────┘  
---

## **4\. Detailed Component Breakdown**

### **4.1. Frontend (Vite \+ React)**

**Directory Structure:**

text  
frontend/  
├── public/  
│   └── favicon.ico  
├── src/  
│   ├── api/              \# Axios client \+ API endpoints  
│   │   ├── client.js  
│   │   └── endpoints.js  
│   ├── assets/           \# Images, fonts, etc.  
│   ├── components/       \# Reusable components  
│   │   ├── GlassCard.jsx  
│   │   ├── Navbar.jsx  
│   │   ├── Sidebar.jsx   \# Student & Coordinator versions  
│   │   └── ...  
│   ├── contexts/         \# React Context providers  
│   │   ├── AuthContext.jsx  
│   │   ├── SettingsContext.jsx  
│   │   └── ...  
│   ├── hooks/            \# Custom hooks  
│   │   ├── useAuth.js  
│   │   ├── useInterview.js  
│   │   └── ...  
│   ├── pages/            \# Page components  
│   │   ├── LandingPage.jsx  
│   │   ├── LoginPage.jsx  
│   │   ├── StudentDashboard.jsx  
│   │   ├── HistoryPage.jsx  
│   │   ├── InterviewProcessPage.jsx  
│   │   ├── MockInterviewPage.jsx  
│   │   ├── CohortPage.jsx  
│   │   ├── LeaderboardPage.jsx  
│   │   ├── SettingsPage.jsx  
│   │   ├── PostInterviewOutcome.jsx  
│   │   ├── InterviewSession.jsx  (recording \+ timer)  
│   │   ├── ResultPage.jsx  
│   │   ├── ProfileCompletion.jsx  
│   │   ├── CoordinatorLogin.jsx  
│   │   ├── CoordinatorDashboard.jsx  
│   │   ├── CoordinatorGroups.jsx  
│   │   ├── CoordinatorOutcomes.jsx  
│   │   └── CoordinatorStudentProgress.jsx  
│   ├── utils/            \# Helpers  
│   │   ├── audioRecorder.js  
│   │   ├── timer.js  
│   │   └── validators.js  
│   ├── App.jsx  
│   ├── main.jsx  
│   └── index.css  
├── index.html  
├── package.json  
├── vite.config.js  
└── .env.example

**Key Dependencies:**

json  
{  
  "react": "^18.2.0",  
  "react-dom": "^18.2.0",  
  "react-router-dom": "^6.14.0",  
  "@tanstack/react-query": "^5.0.0",  
  "axios": "^1.6.0",  
  "tailwindcss": "^3.3.0",  
  "framer-motion": "^10.12.0",  
  "react-chartjs-2": "^5.2.0"  
}

**Environment Variables:**

env  
VITE\_API\_BASE\_URL=https://your-backend.onrender.com  
VITE\_GROQ\_API\_KEY=your\_groq\_key	  
VITE\_DEEPGRAM\_API\_KEY=your\_deepgram\_key  
---

### **4.2. Backend (FastAPI)**

**Directory Structure:**

text  
backend/  
├── app/  
│   ├── \_\_init\_\_.py  
│   ├── main.py                \# FastAPI app entry  
│   ├── config.py              \# Settings & environment variables  
│   ├── models/                \# SQLAlchemy models  
│   │   ├── \_\_init\_\_.py  
│   │   ├── user.py  
│   │   ├── interview.py  
│   │   ├── answer.py  
│   │   ├── score.py  
│   │   ├── feedback.py  
│   │   ├── outcome.py  
│   │   ├── cohort.py  
│   │   └── rubric.py  
│   ├── schemas/               \# Pydantic schemas  
│   │   ├── \_\_init\_\_.py  
│   │   ├── auth.py  
│   │   ├── interview.py  
│   │   └── ...  
│   ├── crud/                  \# Database operations  
│   │   ├── \_\_init\_\_.py  
│   │   ├── user\_crud.py  
│   │   ├── interview\_crud.py  
│   │   └── ...  
│   ├── api/                   \# Route handlers  
│   │   ├── \_\_init\_\_.py  
│   │   ├── auth.py  
│   │   ├── users.py  
│   │   ├── interviews.py  
│   │   ├── scores.py  
│   │   ├── cohorts.py  
│   │   ├── analytics.py  
│   │   └── tts.py  
│   ├── services/              \# Business logic  
│   │   ├── \_\_init\_\_.py  
│   │   ├── stt\_service.py     \# Groq integration  
│   │   ├── tts\_service.py     \# Edge TTS \+ Deepgram  
│   │   ├── scoring\_service.py \# DeepSeek v4 flash API integration  
│   │   └── rubric\_service.py  \# Role‑specific rubrics  
│   ├── core/                  \# Utilities  
│   │   ├── auth.py            \# JWT handling  
│   │   ├── database.py        \# DB connection  
│   │   └── exceptions.py      \# Custom error handlers  
│   └── utils/                 \# Helpers  
│       ├── audio\_utils.py  
│       └── rate\_limiter.py  
├── migrations/                \# Alembic migrations  
├── tests/                     \# Unit tests  
├── requirements.txt  
├── .env.example  
└── Dockerfile

**Key Dependencies:**

txt  
fastapi==0.104.0  
uvicorn\[standard\]==0.24.0  
sqlalchemy==2.0.23  
asyncpg==0.29.0  
pydantic==2.5.0  
python-jose\[cryptography\]==3.3.0  
passlib\[bcrypt\]==1.7.4  
python-multipart==0.0.6  
httpx==0.25.0  
groq==0.4.0  
edge-tts==6.1.9  
deepgram-sdk==3.0.0  
python-dotenv==1.0.0  
alembic==1.12.1

**Environment Variables:**

env  
DATABASE\_URL=postgresql://user:pass@neon-host/dbname  
JWT\_SECRET\_KEY=your\_secure\_key  
JWT\_ALGORITHM=HS256  
ACCESS\_TOKEN\_EXPIRE\_MINUTES=60  
GROQ\_API\_KEY=your\_groq\_key  
DEEPGRAM\_API\_KEY=your\_deepgram\_key  
EDGE\_TTS\_DEFAULT\_VOICE=en-US-JennyNeural  
CORS\_ORIGINS=http://localhost:5173,https://your-frontend.com  
---

### **4.3. Database Schema (Neon PostgreSQL)**

sql  
\-- Users table  
CREATE TABLE users (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    email VARCHAR(255) UNIQUE NOT NULL,  
    password\_hash VARCHAR(255) NOT NULL,  
    full\_name VARCHAR(255) NOT NULL,  
    college VARCHAR(255) NOT NULL,  
    graduation\_year INTEGER,  
    target\_role VARCHAR(100) NOT NULL,  
    role\_weightings JSONB DEFAULT '{"technical": 40, "communication": 20, "problem\_solving": 30, "culture\_fit": 10}'::jsonb,  
    is\_coordinator BOOLEAN DEFAULT FALSE,  
    college\_code VARCHAR(50),  
    cohort\_id UUID REFERENCES cohorts(id) ON DELETE SET NULL,  
    tts\_preference VARCHAR(20) DEFAULT 'edge',  
    created\_at TIMESTAMP DEFAULT NOW(),  
    updated\_at TIMESTAMP DEFAULT NOW()  
);

\-- Cohorts / Groups  
CREATE TABLE cohorts (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    name VARCHAR(255) NOT NULL,  
    code VARCHAR(50) UNIQUE NOT NULL,  
    description TEXT,  
    created\_by UUID REFERENCES users(id) ON DELETE SET NULL,  
    member\_count INTEGER DEFAULT 0,  
    avg\_score FLOAT,  
    created\_at TIMESTAMP DEFAULT NOW()  
);

\-- Interviews  
CREATE TABLE interviews (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    user\_id UUID REFERENCES users(id) ON DELETE CASCADE,  
    type VARCHAR(50) NOT NULL,  \-- 'tech', 'hr', 'human'  
    job\_title VARCHAR(255),  
    job\_description TEXT,  
    difficulty VARCHAR(20) DEFAULT 'medium',  
    duration\_minutes INTEGER DEFAULT 45,  
    overall\_score FLOAT,  
    resume\_score FLOAT,
    career\_readiness\_score FLOAT,
    status VARCHAR(20) DEFAULT 'completed',  
    transcript TEXT,  
    completed\_at TIMESTAMP,  
    created\_at TIMESTAMP DEFAULT NOW()  
);

\-- Interview Answers (per question)  
CREATE TABLE answers (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    interview\_id UUID REFERENCES interviews(id) ON DELETE CASCADE,  
    question\_text TEXT NOT NULL,  
    answer\_transcript TEXT NOT NULL,  
    \-- No audio\_url is stored; media is deleted immediately after the interview  
    audio\_duration\_seconds FLOAT,  
    score\_technical FLOAT,  
    score\_communication FLOAT,  
    score\_problem\_solving FLOAT,  
    score\_culture\_fit FLOAT,  
    confidence\_score FLOAT,  \-- AI confidence  
    feedback\_text TEXT,  
    created\_at TIMESTAMP DEFAULT NOW()  
);

\-- Rubric definitions  
CREATE TABLE rubrics (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    role VARCHAR(100) NOT NULL,  
    dimension\_name VARCHAR(50) NOT NULL,  
    weight FLOAT NOT NULL,  
    description TEXT,  
    created\_at TIMESTAMP DEFAULT NOW()  
);

\-- Post‑interview outcomes (student-reported)  
CREATE TABLE outcomes (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    user\_id UUID REFERENCES users(id) ON DELETE CASCADE,  
    interview\_id UUID REFERENCES interviews(id) ON DELETE SET NULL,  
    status VARCHAR(20) NOT NULL,  \-- 'offer', 'process', 'rejected', 'waiting'  
    company VARCHAR(255),  
    role VARCHAR(255),  
    interview\_date DATE,  
    notes TEXT,  
    created\_at TIMESTAMP DEFAULT NOW()  
);

\-- Placement coordinator: outcome tracking (bulk/coordinator)  
CREATE TABLE placement\_outcomes (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    student\_id UUID REFERENCES users(id) ON DELETE CASCADE,  
    company VARCHAR(255) NOT NULL,  
    role VARCHAR(255),  
    status VARCHAR(20) NOT NULL,  
    recorded\_by UUID REFERENCES users(id) ON DELETE SET NULL,  
    recorded\_at TIMESTAMP DEFAULT NOW()  
);

\-- Analytics / aggregated stats (cached for performance)  
CREATE TABLE cohort\_analytics (  
    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),  
    cohort\_id UUID REFERENCES cohorts(id) ON DELETE CASCADE,  
    total\_students INTEGER,  
    avg\_score FLOAT,  
    completion\_rate FLOAT,  
    placement\_rate FLOAT,  
    engagement\_score FLOAT,  
    as\_of TIMESTAMP DEFAULT NOW()  
);

**Indexes:**

sql  
CREATE INDEX idx\_interviews\_user\_id ON interviews(user\_id);  
CREATE INDEX idx\_interviews\_completed\_at ON interviews(completed\_at);  
CREATE INDEX idx\_answers\_interview\_id ON answers(interview\_id);  
CREATE INDEX idx\_users\_cohort\_id ON users(cohort\_id);  
CREATE INDEX idx\_outcomes\_user\_id ON outcomes(user\_id);  
---

### **4.4. External API Integrations**

#### **Groq API (Speech‑to‑Text)**

**Configuration:**

python  
from groq import Groq

client \= Groq(api\_key=settings.GROQ\_API\_KEY)

async def transcribe\_audio(audio\_bytes: bytes) \-\> str:  
    \# Split into 30‑second chunks if needed (Groq optimised for 30s segments)  
    \# Convert to base64 or send as file  
    audio\_file \= io.BytesIO(audio\_bytes)  
    audio\_file.name \= "audio.mp3"  
      
    response \= client.audio.transcriptions.create(  
        model="whisper-large-v3",  
        file=audio\_file,  
        response\_format="text"  
    )  
    return response

**Rate Limits:** 20 RPM, 2,000 RPD, 7,200 ASH/hour (free). Implement a **queue** if exceeding.

#### **DeepSeek v4 flash API (Scoring)**

from groq import Groq  
import json  
from app.config import settings

client \= Groq(api\_key=settings.GROQ\_API\_KEY)  \# Free API key

def score\_answer(transcript: str, role: str, question: str) \-\> dict:  
    """  
    Score an interview using DeepSeek v4 flash (brutally scoring based on rubric).  
    """  
    prompt \= f"""  
    You are an expert interviewer. Score this answer on:  
    \- Technical Depth (40% weight)  
    \- Communication (20% weight)  
    \- Problem Solving (30% weight)  
    \- Culture Fit (10% weight)

    Role: {role}  
    Question: {question}  
    Answer: {transcript}

    Return JSON only (no markdown, no explanation):  
    {{  
        "technical": \<score 0-10\>,  
        "communication": \<score 0-10\>,  
        "problem\_solving": \<score 0-10\>,  
        "culture\_fit": \<score 0-10\>,  
        "feedback": "\<brief constructive feedback\>"  
    }}  
    """

    response \= client.chat.completions.create(  
        model="deepseek-v4-flash",  
        messages=\[{"role": "user", "content": prompt}\],  
        temperature=0.1,  
        max\_tokens=300,  
        response\_format={"type": "json\_object"}  \# Forces valid JSON  
    )

    content \= response.choices\[0\].message.content  
    return json.loads(content)

#### **Edge TTS (Default TTS)**

python  
import edge_tts

async def generate_edge_tts(text: str, voice: str = "en-US-JennyNeural") -> bytes:  
    communicate = edge_tts.Communicate(text, voice)  
    audio_data = b""  
    async for chunk in communicate.stream():  
        if chunk["type"] == "audio":  
            audio_data += chunk["data"]  
    return audio_data

#### **Deepgram (Fallback / Premium TTS)**

python  
from deepgram import Deepgram

async def generate_deepgram_tts(text: str, api_key: str) -> bytes:  
    dg_client = Deepgram(api_key)  
    options = {"model": "aura-2", "voice": "en-US-Neural2-F"}  
    response = await dg_client.speak.request(  
        {"text": text}, options  
    )  
    return response["audio"]

#### **Unified TTS Service (with fallback)**

python  
class TTSService:  
    def __init__(self):  
        self.deepgram_key = settings.DEEPGRAM_API_KEY  
        self.default_voice = settings.EDGE_TTS_DEFAULT_VOICE  
        self.engine = "edge"  # or "deepgram" per user preference

    async def generate(self, text: str, preferred: str = "edge") -> bytes:  
        if preferred == "deepgram" and self.deepgram_key:  
            try:  
                return await generate_deepgram_tts(text, self.deepgram_key)  
            except Exception as e:  
                logger.error(f"Deepgram failed: {e}, falling back to Edge")  
        return await generate_edge_tts(text)  
---

### **4.5. API Endpoints (FastAPI)**

| Method | Endpoint | Description | Auth |
| ----- | ----- | ----- | ----- |
| POST | `/api/auth/signup` | Student sign‑up | No |
| POST | `/api/auth/login` | Student/coordinator login | No |
| POST | `/api/auth/refresh` | Refresh JWT | Yes |
| GET | `/api/users/me` | Get current user profile | Yes |
| PUT | `/api/users/me` | Update profile | Yes |
| POST | `/api/interviews` | Start a new interview session | Yes |
| POST | `/api/interviews/{id}/answer` | Submit answer for a question | Yes |
| POST | `/api/interviews/{id}/score` | Get AI scoring for the interview | Yes |
| GET | `/api/interviews/{id}` | Get interview details \+ scores | Yes |
| GET | `/api/interviews` | List user's interviews | Yes |
| GET | `/api/leaderboard/cohort` | Cohort leaderboard (anonymised) | Yes |
| GET | `/api/analytics/dashboard` | Student dashboard stats | Yes |
| GET | `/api/analytics/coordinator` | Coordinator overview metrics | Yes (coordinator only) |
| POST | `/api/outcomes` | Report post‑interview outcome | Yes |
| POST | `/api/placement/outcomes` | Bulk outcome upload | Yes (coordinator only) |
| GET | `/api/cohorts` | List cohorts | Yes |
| POST | `/api/cohorts` | Create cohort | Yes (coordinator only) |
| GET | `/api/tts/generate` | Generate TTS audio for feedback | Yes |
| DELETE | `/api/users/me/data` | GDPR data export/delete | Yes |

---

## **5\. Deployment & Hosting**

### **Frontend (GitHub Pages / Vercel)**

1. Build the React app:  
   bash  
   npm run build  
2. Deploy to GitHub Pages (or Vercel):  
   bash  
   npm run deploy  \# or vercel \--prod  
3. Set environment variables (`VITE_API_BASE_URL`) in the hosting provider.

### **Backend (Render)**

1. Push code to GitHub.  
2. On Render, create a new Web Service, connect your repo.  
3. Set environment variables (see `.env.example`).  
4. Build command: `pip install -r requirements.txt`  
5. Start command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`  
6. Render will auto‑deploy on push.

### **Database (Neon)**

1. Create a Neon project.  
2. Copy the connection string (`postgresql://...`).  
3. Run migrations:  
   bash  
   alembic upgrade head  
4. Set `DATABASE_URL` in Render environment.

### **UptimeRobot (Keep Render Alive)**

1. Sign up at UptimeRobot.  
2. Add a new monitor (HTTP(s)), enter your Render URL (`https://your-app.onrender.com/health`).  
3. Set interval to **10 minutes**.  
4. This will ping your `/health` endpoint, preventing the free tier from sleeping.

---

## **6\. User Flow – Interview Session (End‑to‑End)**

text  
1\. Student enters target company and JD → Mock Interview Page  
2\. Backend automatically fetches student's resume details (projects, tech stack, resume score) and sends them to DeepSeek v4 flash API. DeepSeek analyzes JD + resume and passes context to Nematron 3 Nano Omni API.  
3\. Clicks "Start Session" → Interview Session Page  
4\. Frontend shows:  
   \- Pre‑recording checklist (modal)  
   \- Camera/mic permissions (simulated, no video/audio is stored; media is immediately deleted post-interview)  
   \- Recording controls (Start/Stop)  
5\. Student records answer → MediaRecorder captures Blob  
6\. On Stop Recording:  
   \- Frontend sends audio blob to backend  
   \- Backend calls Groq Whisper → transcript  
   \- Backend calls Nematron 3 Nano Omni API → generates next question/response based on context (including resume projects)
   \- Backend generates TTS response (Edge TTS by default)  
7\. Student can continue to next question or end session  
8\. On End Session:
   \- Full transcript is sent to DeepSeek v4 flash API for brutal scoring against the role-specific rubric
   \- Backend calculates Final Career Readiness Score (Interview 60% + Resume 30% + Consistency 10%) and stores all scores and feedback in Neon (audio/video are immediately deleted)
   \- Frontend displays Result Page with full interview summary (Career Readiness Score, Score breakdown, rubric comparison, transcript feedback, 14-day improvement plan)  
---

## **7\. Cost Estimation (Monthly)**

| Service | Free Tier | Usage (1,000 students, 10 questions each) | Cost |
| ----- | ----- | ----- | ----- |
| **Render** | 750 hours, 512 MB RAM | \~24/7 uptime | $0 (kept alive via UptimeRobot) |
| **Neon** | 0.5 GB storage, 10 GB bandwidth | \~50,000 rows | $0 |
| **Groq (STT \- Whisper)** | 20 RPM, 2,000 RPD, 7,200 ASH/hour | 10,000 audio transcriptions (3 min each \= 30,000 min audio) | $0 (free tier) |
| **DeepSeek v4 flash / Nematron 3 Nano Omni** | Generous Free Tiers | Search context, live conversation, and full scoring | $0 (estimated) |
| **Edge TTS** | Free | Unlimited | $0 |
| **Deepgram** | $200 credit | Optional fallback | $0 (until credit exhausted) |
| **UptimeRobot** | 50 monitors | 1 monitor | $0 |
| **GitHub Pages** | Unlimited | Static hosting | $0 |

**Total estimated monthly cost (MVP):** $0.

---

## **9\. Monitoring & Logging**

* **Backend logs** – use `structlog` \+ console (Render logs visible in dashboard).  
* **Error tracking** – integrate Sentry (free tier) for frontend and backend.  
* **API metrics** – use FastAPI’s built‑in OpenTelemetry or Prometheus (optional).  
* **Health check** – `/health` endpoint returns DB status and uptime.

python  
@app.get("/health")  
async def health\_check():  
    \# Check DB connection  
    try:  
        db.session.execute("SELECT 1")  
    except:  
        raise HTTPException(503, "Database unavailable")  
    return {"status": "ok", "uptime": get\_uptime()}  
---

## **10\. Security & Compliance**

* **JWT authentication** – short‑lived access tokens \+ refresh tokens.  
* **Password hashing** – bcrypt (via `passlib`).  
* **CORS** – restrict to allowed origins.  
* **Rate limiting** – use `slowapi` to limit /auth endpoints.  
* **Data encryption** – HTTPS only; sensitive data encrypted at rest in Neon.  
* **GDPR** – data export and delete endpoints implemented.

---

## **11\. Scalability and Reliability Improvements**

*The current MVP intentionally prioritizes simplicity and rapid development. These improvements are reserved for future scaling stages once real usage patterns are observed.*

1. **Request Queue System**
   - Buffer AI requests during traffic spikes
   - Prevent API overload

2. **Retry Mechanism**
   - Automatic retries for temporary API failures

3. **Circuit Breaker Pattern**
   - Prevent cascading failures when external AI services become unavailable

4. **Fallback Providers**
   - Secondary AI providers if Groq, DeepSeek, or Nematron become unavailable

5. **Rate Limit Management**
   - Protect against abuse and quota exhaustion

6. **Background Job Processing**
   - Separate heavy scoring operations from real-time interview flow

7. **Monitoring and Alerting**
   - API latency tracking
   - Error rate tracking
   - Queue health monitoring

8. **Caching Layer**
   - Cache frequently used company interview contexts
   - Reduce repeated external API calls

---

## **12\. Conclusion**

This architecture is **deployment-ready for pilot usage**, **cost‑effective**, and **scalable**. It leverages modern, well‑supported tools that minimise development effort while keeping operational costs near zero for an MVP. The modular design allows easy replacement of any component without rewriting the entire system.

All API endpoints, database schemas, and integration flows are documented above. Developers can begin implementing immediately.