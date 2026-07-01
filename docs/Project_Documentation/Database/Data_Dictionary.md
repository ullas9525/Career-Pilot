# Data Dictionary

This document defines the exact datatypes, constraints, and business logic for all fields in the CareerPilot database.

## 1. Field Definitions

| Table | Field Name | Data Type | Constraints | Description |
|---|---|---|---|---|
| `universities` | `id` | UUID | Primary Key, Auto-gen | Unique identifier for a university tenant. |
| `universities` | `domain` | VARCHAR(255) | Unique, Not Null | The official email domain (e.g., `mit.edu`). |
| `users` | `email` | VARCHAR(255) | Unique, Not Null | The login identifier for the user. |
| `users` | `password_hash` | VARCHAR(255) | Not Null | Bcrypt hashed password. |
| `users` | `role` | VARCHAR(20) | ENUM('STUDENT', 'COORDINATOR') | Defines RBAC permissions. |
| `resumes` | `parsed_data` | JSONB | Nullable | DeepSeek extracted JSON representing projects and skills. |
| `resumes` | `resume_score` | DECIMAL(3,1) | Min: 0.0, Max: 10.0 | The objective resume score. |
| `interviews` | `status` | VARCHAR(20) | ENUM('IN_PROGRESS', 'COMPLETED') | Tracks if the session closed cleanly. |
| `interview_results` | `career_readiness_score`| DECIMAL(3,1) | Min: 0.0, Max: 10.0 | Calculated final score. |
| `interview_results` | `transcript` | JSONB | Not Null | Complete conversation array. |
| `interview_results` | `score_breakdown` | JSONB | Not Null | Dimension-level feedback and justifications. |

## 2. JSONB Schema Definitions
- **`transcript` Schema:** `[{"speaker": "AI" | "STUDENT", "text": "string", "timestamp": "ISO8601"}]`
- **`score_breakdown` Schema:** `{"dimensions": [{"name": "string", "score": number, "justification": "string", "ideal_answer": "string"}]}`
