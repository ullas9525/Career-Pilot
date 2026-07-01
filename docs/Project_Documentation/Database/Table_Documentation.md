# Table Documentation

This document describes the specific tables designed for the CareerPilot Neon PostgreSQL database.

## 1. `universities`
Stores the B2B tenant records.
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `domain` (VARCHAR)
- `created_at` (TIMESTAMP)

## 2. `users`
Stores all human actors in the system (Students and Coordinators).
- `id` (UUID, Primary Key)
- `university_id` (UUID, Foreign Key)
- `email` (VARCHAR)
- `password_hash` (VARCHAR)
- `role` (ENUM: 'STUDENT', 'COORDINATOR')

## 3. `resumes`
Stores the AI-parsed resume data to prevent re-parsing before every interview.
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key, Unique)
- `parsed_data` (JSONB)
- `resume_score` (DECIMAL)

## 4. `interviews`
Tracks the lifecycle of a mock interview session.
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `target_company` (VARCHAR)
- `job_description` (TEXT)
- `status` (ENUM: 'IN_PROGRESS', 'COMPLETED')

## 5. `interview_results`
Stores the heavy JSON output from the post-interview scoring phase.
- `id` (UUID, Primary Key)
- `interview_id` (UUID, Foreign Key, Unique)
- `transcript` (JSONB)
- `score_breakdown` (JSONB)
- `career_readiness_score` (DECIMAL)
