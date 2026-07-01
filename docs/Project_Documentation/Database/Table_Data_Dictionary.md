# Table Documentation & Data Dictionary

This document combines the specific table layouts and the data dictionary for the Neon PostgreSQL database.

## 1. Table: `universities`
- `id` (UUID, Primary Key)
- `name` (VARCHAR, Not Null): Name of the institution.
- `domain` (VARCHAR, Unique): Email domain associated with the university (e.g., `mit.edu`).
- `created_at` (TIMESTAMP)

## 2. Table: `users`
- `id` (UUID, Primary Key)
- `university_id` (UUID, Foreign Key -> `universities.id`, Nullable for admin)
- `email` (VARCHAR, Unique, Not Null)
- `password_hash` (VARCHAR, Not Null)
- `role` (ENUM: 'STUDENT', 'COORDINATOR', 'ADMIN', Default: 'STUDENT')
- `full_name` (VARCHAR)
- `created_at` (TIMESTAMP)
- `is_active` (BOOLEAN, Default: TRUE)

## 3. Table: `resumes`
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key -> `users.id`, Unique)
- `raw_text` (TEXT): The raw extracted text from the PDF.
- `parsed_data` (JSONB): Structured data extracted by DeepSeek (projects, tech stacks).
- `resume_score` (DECIMAL(3,1)): AI calculated score from 0.0 to 10.0.
- `updated_at` (TIMESTAMP)

## 4. Table: `interviews`
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key -> `users.id`)
- `target_role` (VARCHAR): e.g., 'Backend Developer'.
- `target_company` (VARCHAR): e.g., 'Stripe'.
- `job_description` (TEXT): The JD pasted by the student.
- `status` (ENUM: 'IN_PROGRESS', 'COMPLETED', 'FAILED')
- `created_at` (TIMESTAMP)
- `completed_at` (TIMESTAMP, Nullable)

## 5. Table: `interview_results`
- `id` (UUID, Primary Key)
- `interview_id` (UUID, Foreign Key -> `interviews.id`, Unique)
- `transcript` (JSONB): `[{ "speaker": "AI", "text": "..." }, { "speaker": "STUDENT", "text": "..." }]`
- `score_breakdown` (JSONB): Dimension-level scores and feedback justifications.
- `career_readiness_score` (DECIMAL(3,1)): Computed as (Interview * 0.6) + (Resume * 0.3) + (Consistency * 0.1).
- `created_at` (TIMESTAMP)

## 6. Table: `consistency_metrics` (Materialized View or Aggregate)
- `user_id` (UUID)
- `total_interviews` (INT)
- `consistency_score` (DECIMAL(3,1)): Value from 0-10 based on frequency of practice over a rolling 30-day window.
