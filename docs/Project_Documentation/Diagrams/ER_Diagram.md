# Entity Relationship (ER) Diagram

## 1. Purpose
This diagram visualizes the relational schema of the Neon PostgreSQL database, outlining tables, primary keys, foreign keys, and multiplicity.

## 2. Mermaid Diagram

```mermaid
erDiagram
    UNIVERSITIES {
        UUID id PK
        VARCHAR name
        VARCHAR domain UK
        TIMESTAMP created_at
    }

    USERS {
        UUID id PK
        UUID university_id FK
        VARCHAR email UK
        VARCHAR password_hash
        ENUM role "STUDENT, COORDINATOR"
        TIMESTAMP created_at
        BOOLEAN is_active
    }

    RESUMES {
        UUID id PK
        UUID user_id FK
        TEXT raw_text
        JSONB parsed_data
        DECIMAL resume_score
        TIMESTAMP updated_at
    }

    INTERVIEWS {
        UUID id PK
        UUID user_id FK
        VARCHAR target_role
        VARCHAR target_company
        TEXT job_description
        ENUM status "IN_PROGRESS, COMPLETED"
        TIMESTAMP created_at
        TIMESTAMP completed_at
    }

    INTERVIEW_RESULTS {
        UUID id PK
        UUID interview_id FK
        JSONB transcript
        JSONB score_breakdown
        DECIMAL career_readiness_score
        TIMESTAMP created_at
    }

    %% Relationships
    UNIVERSITIES ||--o{ USERS : "has members"
    USERS ||--o| RESUMES : "owns"
    USERS ||--o{ INTERVIEWS : "conducts"
    INTERVIEWS ||--o| INTERVIEW_RESULTS : "yields"
```
