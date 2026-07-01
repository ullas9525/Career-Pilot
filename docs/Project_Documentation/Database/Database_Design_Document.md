# Database Design Document

## 1. Introduction
This document details the database architecture for the CareerPilot platform. The system utilizes **Neon serverless PostgreSQL**, chosen specifically for its ability to scale compute to zero during idle periods (critical for maintaining a near-zero cost MVP) while providing robust relational data integrity.

## 2. Design Principles
- **Relational Integrity:** Strict foreign key constraints between Universities, Users (Students/Coordinators), and Interviews.
- **Data Minimization:** No BLOB storage for media. Audio/video streams are processed ephemerally in RAM. Only computed scores and text transcripts are persisted.
- **Auditability:** Soft deletes (`is_active` boolean) and timestamp tracking (`created_at`, `updated_at`) on all core entities.
- **Performance:** B-Tree indexing on frequently queried foreign keys (`user_id`, `university_id`) and search fields (email).

## 3. High-Level Schema Architecture
The database is partitioned into three logical domains:
1. **Identity & Access Management (IAM):** Users, Roles, Universities.
2. **Profile & Context:** Resumes (parsed JSON), Target Roles.
3. **Assessment Data:** Interviews, Transcripts (JSON), Score Breakdowns.

## 4. Connection Management
- The Python/FastAPI backend connects to Neon via connection pooling (e.g., PgBouncer or SQLAlchemy's native pooling) to prevent connection exhaustion during concurrent interview sessions.
- Connection strings are securely injected via environment variables (`DATABASE_URL`).
