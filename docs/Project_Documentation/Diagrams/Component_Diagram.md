# Component Diagram

## 1. Purpose
The Component Diagram shows how the structural components of the CareerPilot system are wired together. It visualizes the internal organization of the backend and how it interfaces with the frontend and external services.

## 2. Mermaid Diagram

```mermaid
componentDiagram
    %% Frontend Components
    package "Vite React + JavaScript Frontend" {
        [Auth Context]
        [Interview Lobby UI]
        [Live Session Audio Context]
        [Score Dashboard UI]
    }

    %% Backend Components
    package "Modular Backend (Python/FastAPI)" {
        [API Gateway / Router]
        [Auth Middleware]
        
        component "Core Logic" {
            [Context Generator]
            [Live Loop Orchestrator]
            [Scoring Engine]
        }
        
        component "AI Adapters" {
            [Tavily Adapter]
            [DeepSeek Adapter]
            [Groq Adapter]
            [Nematron Adapter]
            [EdgeTTS Adapter]
        }
        
        [Prisma/SQLAlchemy ORM]
    }

    database "Neon PostgreSQL" {
        [Users & Roles]
        [Transcripts & Scores]
    }

    %% Connections
    [Auth Context] --> [API Gateway / Router] : HTTPS
    [Live Session Audio Context] --> [API Gateway / Router] : WSS / HTTPS

    [API Gateway / Router] --> [Auth Middleware]
    [Auth Middleware] --> [Core Logic]

    [Context Generator] --> [Tavily Adapter]
    [Context Generator] --> [DeepSeek Adapter]
    
    [Live Loop Orchestrator] --> [Groq Adapter]
    [Live Loop Orchestrator] --> [Nematron Adapter]
    [Live Loop Orchestrator] --> [EdgeTTS Adapter]
    
    [Scoring Engine] --> [DeepSeek Adapter]

    [Core Logic] --> [Prisma/SQLAlchemy ORM]
    [Prisma/SQLAlchemy ORM] --> [Users & Roles] : TCP/TLS
    [Prisma/SQLAlchemy ORM] --> [Transcripts & Scores] : TCP/TLS
```
