# Class Diagram

## 1. Purpose
The Class Diagram models the static structure of the CareerPilot backend application, outlining the primary objects, their attributes, methods, and relationships. It is particularly relevant for the Object-Oriented design of the ORM (SQLAlchemy/SQLModel) models and the service controllers.

## 2. Assumptions
- External AI clients are modeled as Interface implementations to demonstrate the Dependency Injection pattern (allowing easy swapping of providers).

## 3. Mermaid Diagram

```mermaid
classDiagram
    class User {
        +UUID id
        +String email
        +String role
        +UUID university_id
        +login()
        +updateProfile()
    }

    class University {
        +UUID id
        +String name
        +String domain
        +getStudents()
    }

    class Resume {
        +UUID id
        +UUID user_id
        +String rawText
        +JSON parsedData
        +Float resumeScore
        +parseResume()
    }

    class Interview {
        +UUID id
        +UUID user_id
        +String targetRole
        +String targetCompany
        +String jobDescription
        +startSession()
        +endSession()
    }

    class InterviewResult {
        +UUID id
        +UUID interview_id
        +JSON transcript
        +JSON scoreBreakdown
        +Float careerReadinessScore
        +calculateFinalScore()
    }

    %% Interfaces for AI Providers
    class IAIService {
        <<interface>>
        +generateText(prompt)
    }
    
    class IAudioService {
        <<interface>>
        +speechToText(audioBlob)
        +textToSpeech(textString)
    }

    %% Implementations
    class DeepSeekService {
        +generateText(prompt)
    }
    class GroqService {
        +speechToText(audioBlob)
    }

    %% Relationships
    University "1" -- "*" User : has
    User "1" -- "1" Resume : owns
    User "1" -- "*" Interview : conducts
    Interview "1" -- "1" InterviewResult : yields
    
    IAIService <|.. DeepSeekService : implements
    IAudioService <|.. GroqService : implements
```
