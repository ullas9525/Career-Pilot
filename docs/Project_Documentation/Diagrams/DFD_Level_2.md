# Data Flow Diagram (Level 2)

## 1. Purpose
The Level 2 DFD zooms in on Process 3.0 ("Execute Interview") from the Level 1 DFD. This is the most complex component of CareerPilot, involving rapid asynchronous orchestration between the backend and multiple external AI APIs.

## 2. Assumptions
- This diagram represents a single "conversational turn" (one back-and-forth between Student and AI).
- Temporary memory (RAM) is used as a transient datastore (`T1`) to hold the rolling transcript during the active session.

## 3. Explanation of Elements
- **Processes:**
  - `3.1 Transcribe Audio`: Groq Whisper integration.
  - `3.2 Generate Response`: Nematron integration.
  - `3.3 Synthesize Speech`: Edge TTS integration.
  - `3.4 Update Transcript`: Appends the new turn to the array.
- **External APIs:** Treated as external endpoints within this sub-process boundary.

## 4. Mermaid Diagram

```mermaid
flowchart TD
    %% External Entities & Stores
    Student[Student Client]
    Groq[Groq API (STT)]
    Nematron[Nematron API (LLM)]
    EdgeTTS[Edge TTS API]
    T1[(T1: In-Memory Transcript)]
    D3[(D3: Interviews DB)]

    %% Processes
    P31((3.1\nTranscribe\nAudio))
    P32((3.2\nGenerate\nResponse))
    P33((3.3\nSynthesize\nSpeech))
    P34((3.4\nUpdate\nTranscript))

    %% Data Flows
    Student -- Audio Blob (Student Voice) --> P31
    P31 -- Raw Audio File --> Groq
    Groq -- String (Student Text) --> P31

    P31 -- Student Text --> P34
    P34 -- Append Student Text --> T1
    
    T1 -- Full Conversation History --> P32
    D3 -- Pre-computed Context (JD+Resume) --> P32
    
    P32 -- Payload (Context + History) --> Nematron
    Nematron -- String (AI Text) --> P32

    P32 -- AI Text --> P34
    P34 -- Append AI Text --> T1
    
    P32 -- AI Text --> P33
    P33 -- Text String --> EdgeTTS
    EdgeTTS -- Audio Stream (AI Voice) --> P33
    
    P33 -- Playable Audio Blob --> Student
```
