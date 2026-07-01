# Context Diagram

## 1. Purpose
The Context Diagram (also known as Level 0 DFD in some notations, though kept distinct here) provides a high-level, "black-box" view of the CareerPilot system. It illustrates the central system and its interactions with external entities (users and external APIs).

## 2. Assumptions
- The system abstracts the internal complexity of the modular backend.
- External APIs (Groq, DeepSeek, Nematron, Tavily) are treated as distinct external entities providing specific services.
- The University Administration acts as a distinct user archetype from the Student.

## 3. Explanation of Elements
- **CareerPilot System (Center):** The core application providing mock interview services.
- **Student (External Entity):** Inputs audio, JDs, and resumes; receives audio and feedback scores.
- **Placement Coordinator (External Entity):** Inputs queries; receives aggregated reports and alerts.
- **AI Providers (External Entities):** Groq provides STT; DeepSeek provides intelligence/scoring; Nematron provides conversational generation; Tavily provides web search context.

## 4. Mermaid Diagram

```mermaid
flowchart TD
    %% Define External Entities
    Student[Student]
    Coordinator[Placement Coordinator]
    
    %% Define System
    System(((CareerPilot System)))
    
    %% Define External APIs
    Groq[Groq STT/TTS]
    DeepSeek[DeepSeek v4]
    Nematron[Nematron 3]
    Tavily[Tavily Search API]

    %% Student Interactions
    Student -- 1. Upload Resume & JD --> System
    Student -- 2. Speak Audio --> System
    System -- 3. Play AI Audio --> Student
    System -- 4. Deliver Feedback Score --> Student

    %% Coordinator Interactions
    Coordinator -- 1. Request Cohort Data --> System
    System -- 2. Provide Analytics & Alerts --> Coordinator

    %% API Interactions
    System -- Audio Blob --> Groq
    Groq -- Text Transcript --> System

    System -- Resume & JD --> DeepSeek
    DeepSeek -- Interview Context & Final Score --> System

    System -- Transcript History --> Nematron
    Nematron -- Next Conversational Prompt --> System

    System -- Company Name --> Tavily
    Tavily -- Web Interview Questions --> System

    %% Styling
    style System fill:#f9f,stroke:#333,stroke-width:4px
```
