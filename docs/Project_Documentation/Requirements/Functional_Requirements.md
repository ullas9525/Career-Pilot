# Functional Requirements

## 1. Authentication and Authorization
- **FR1.1:** The system must allow students and placement coordinators to register and authenticate using email and password.
- **FR1.2:** The system must implement Role-Based Access Control (RBAC) separating 'Student' and 'Coordinator' roles.

## 2. Student Profile & Resume
- **FR2.1:** The system must allow students to upload a resume (PDF/Docx) or paste their text.
- **FR2.2:** The system must automatically extract text, parse projects/tech stacks, and compute a Resume Score using DeepSeek v4 flash.

## 3. Interview Preparation (Context Generation)
- **FR3.1:** The system must prompt the student to input a Target Company and Job Description (JD).
- **FR3.2:** The system must use the Tavily Search API to query recent interview questions related to the Target Company.
- **FR3.3:** The system must synthesize the JD, Web Search Results, and the Student's Resume into a system prompt payload.

## 4. Live Interview Engine
- **FR4.1:** The frontend must capture student audio via the browser's MediaRecorder API upon clicking "Start Recording."
- **FR4.2:** The backend must transcribe the audio to text using Groq Whisper.
- **FR4.3:** The backend must generate conversational responses using Nematron 3 Nano Omni.
- **FR4.4:** The system must convert the AI's response text back into audio using Edge TTS and play it automatically on the frontend.
- **FR4.5:** The system must not enforce a strict time limit (timer) on student responses to prevent anxiety.

## 5. Scoring & Feedback
- **FR5.1:** Upon ending the session, the system must send the full transcript to DeepSeek v4 flash for evaluation against the target role's strict rubric.
- **FR5.2:** The system must calculate a final Career Readiness Score: (Interview 60% + Resume 30% + Consistency 10%).
- **FR5.3:** The system must render a detailed feedback report including side-by-side transcript comparisons and a 14-day improvement plan.

## 6. Placement Coordinator Dashboard
- **FR6.1:** The system must display a roster of all registered students to the coordinator.
- **FR6.2:** The system must flag students with a Career Readiness Score below 4.0 as "At-Risk."
