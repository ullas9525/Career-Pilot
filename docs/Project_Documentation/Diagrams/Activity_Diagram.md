# Activity Diagram

## 1. Purpose
The Activity Diagram models the control flow of the primary business process: A student starting, conducting, and completing a mock interview. It highlights the conditional logic (e.g., waiting for mic access, handling API errors).

## 2. Assumptions
- The user is already logged in and has uploaded a resume.
- The diagram utilizes swimlanes to distinguish between Client (Frontend) and Server (Backend) responsibilities.

## 3. Mermaid Diagram

```mermaid
stateDiagram-v2
    direction TB
    
    [*] --> Setup
    
    state "Client (Frontend)" as Client {
        Setup: Input JD & Company
        MicCheck: Request Mic Permissions
        Record: User Speaks Answer
        Wait: Display "Thinking..."
        Play: Play AI Audio
        EndSession: Click "End Interview"
        ViewResults: Render Results Dashboard
    }
    
    state "Server (Backend + APIs)" as Server {
        ContextGen: Generate Context (DeepSeek + Tavily)
        STT: Transcribe Audio (Groq)
        LLM: Generate Next Turn (Nematron)
        TTS: Synthesize Speech (Edge TTS)
        Scoring: Brutal Scoring (DeepSeek)
        DBWrite: Save Results to Neon
    }
    
    Setup --> MicCheck
    MicCheck --> ContextGen : Granted
    MicCheck --> [*] : Denied (Error)
    
    ContextGen --> Play : Initial AI Greeting
    
    Play --> Record : Wait for User
    Record --> STT : Send Audio Blob
    STT --> LLM : Transcribed Text
    LLM --> TTS : AI Response Text
    TTS --> Play : Audio Stream
    
    Play --> EndSession : User Chooses to End
    EndSession --> Scoring : Send Full Transcript
    Scoring --> DBWrite
    DBWrite --> ViewResults
    
    ViewResults --> [*]
```
