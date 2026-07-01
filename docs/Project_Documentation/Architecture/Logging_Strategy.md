# Logging Strategy

A robust logging strategy is essential for debugging asynchronous AI pipelines and tracking audit trails for academic evaluation.

## 1. Log Levels & Formatting
The system will use a structured logging library (e.g., standard `logging` for Python/FastAPI) emitting JSON format.
- **ERROR:** System crashes, unhandled exceptions, database connection failures, and persistent external API failures (after retries).
- **WARN:** Single API timeouts (before retry succeeds), rate limit warnings, unusual but handled latency spikes.
- **INFO:** Lifecycle events: System startup, User Login, Interview Started, Interview Ended, Score Calculated.
- **DEBUG:** (Disabled in Production) Raw API payloads to/from DeepSeek and Nematron, detailed routing paths.

## 2. Correlation IDs
- Every mock interview session is assigned a unique `Session_ID`.
- Every log emitted during that interview (from the initial context generation, through every STT/TTS loop, to the final scoring) must include this `Session_ID`. This allows developers to trace exactly where a specific interview failed.

## 3. Storage and Retention
- **MVP Phase:** Logs are printed to `stdout` and collected by Render's native log aggregator.
- **Retention:** Render retains logs temporarily. Critical errors must trigger alerts (e.g., via a Discord/Slack webhook) so they are not lost.
- **Post-Pilot:** Logs will be shipped to a centralized logging service (e.g., Loggly, Papertrail, or ELK stack) with a 30-day retention policy.

## 4. Privacy Filtering
- **CRITICAL:** The logging middleware must explicitly sanitize and redact all PII (Personally Identifiable Information). 
- Student names, emails, raw resumes, and interview transcripts must **never** be written to application logs. Logs should only contain metadata, timestamps, and error codes.
