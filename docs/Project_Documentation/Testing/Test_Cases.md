# Test Cases

## 1. Authentication Test Cases
| TC-ID | Title | Steps | Expected Result | Pass/Fail |
|---|---|---|---|---|
| TC-AUTH-01 | Valid Login | 1. Enter valid email and password. 2. Click Login. | User is redirected to Dashboard. JWT is stored. | |
| TC-AUTH-02 | Invalid Password | 1. Enter valid email, invalid password. 2. Click Login. | HTTP 401. UI shows "Invalid Credentials" toast. | |
| TC-AUTH-03 | RBAC Enforcement | 1. Login as STUDENT. 2. Manually navigate to `/coordinator/dashboard`. | HTTP 403. UI redirects to Student Dashboard. | |

## 2. AI Pipeline Test Cases
| TC-ID | Title | Steps | Expected Result | Pass/Fail |
|---|---|---|---|---|
| TC-AI-01 | Context Generation | 1. Input "Google" and valid JD. 2. Click Generate. | Backend successfully calls Tavily and DeepSeek. UI transitions to Lobby within 15s. | |
| TC-AI-02 | STT Accuracy Check | 1. Start live interview. 2. Speak a clear technical sentence. 3. Check logs. | Groq Whisper transcript matches spoken words with >90% accuracy. | |
| TC-AI-03 | LLM Context Retention | 1. Say "My name is John". 2. AI responds. 3. Ask "What is my name?". | Nematron correctly recalls "John". | |
| TC-AI-04 | Audio Response Latency | 1. Stop speaking. 2. Start stopwatch. 3. Stop stopwatch when AI audio plays. | Stopwatch reads < 3.0 seconds. | |

## 3. Scoring Test Cases
| TC-ID | Title | Steps | Expected Result | Pass/Fail |
|---|---|---|---|---|
| TC-SCORE-01 | Math Verification | 1. Force mock Interview Score = 10, Resume Score = 10, Consistency = 10. | Final Career Readiness Score is exactly 10.0. | |
| TC-SCORE-02 | JSON Parsing | 1. End Interview. 2. Wait for DeepSeek response. | Backend successfully parses DeepSeek's string output into a valid JSON object without crashing. | |
