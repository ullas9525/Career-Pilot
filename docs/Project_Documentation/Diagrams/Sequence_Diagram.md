# Sequence Diagram

## 1. Purpose
The Sequence Diagram illustrates the exact chronological order of messages exchanged between the objects/components during the Live Audio Loop of the mock interview. It is critical for understanding the latency SLA.

## 2. Assumptions
- The WebSocket connection (or HTTP polling mechanism) is already established.
- The context has already been generated.
- The diagram shows a single conversational round trip.

## 3. Mermaid Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant UI as Vite React + JavaScript Frontend
    participant Server as FastAPI Backend
    participant Groq as Groq (Whisper)
    participant Nematron as Nematron 3
    participant TTS as Edge TTS

    Student->>UI: Releases "Speak" Button
    activate UI
    UI->>Server: POST Audio Blob
    activate Server
    
    Server->>Groq: Upload Audio (Multipart)
    activate Groq
    Groq-->>Server: Return Text Transcript
    deactivate Groq
    
    Server->>Server: Append to Session Transcript History
    
    Server->>Nematron: Send Prompt + History
    activate Nematron
    Note over Nematron: Rapid LLM Inference
    Nematron-->>Server: Return AI Response String
    deactivate Nematron
    
    Server->>Server: Append to Session Transcript History
    
    Server->>TTS: Send AI Response String
    activate TTS
    TTS-->>Server: Stream Audio Bytes
    deactivate TTS
    
    Server-->>UI: Return Audio Blob / Stream
    deactivate Server
    
    UI->>UI: Render Visualizer
    UI->>Student: Play Audio
    deactivate UI
```
