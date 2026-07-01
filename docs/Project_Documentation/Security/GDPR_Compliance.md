# GDPR and Data Privacy Compliance

CareerPilot is designed with a "privacy-by-default" methodology, crucial for handling academic and personal student data.

## 1. Right to be Forgotten (Data Erasure)
- The system fully supports the GDPR Right to Erasure.
- A "Delete Account" button is available in the Student Profile UI.
- Clicking this triggers a cascading hard delete in the Neon database. The user record, their parsed resume JSON, and all historical interview transcripts are permanently wiped from the primary database within milliseconds.

## 2. Right of Access (Data Portability)
- Students can view their entire interview history and resume parsing results at any time via the UI.
- Future enhancements (Phase 3) may include a "Download All Data" JSON export button.

## 3. Data Minimization (Audio Handling)
- The most sensitive data collected by the platform is the student's raw voice (audio).
- CareerPilot explicitly complies with data minimization by **never storing audio**.
- Audio blobs are streamed into RAM, pushed to Groq for transcription, and instantly garbage-collected by the Python runtime. There are no cloud buckets containing voice recordings.

## 4. Anonymization in B2B Dashboards
- To prevent inherent biases in placement tracking, universities can configure their dashboards to display student data via anonymized UUIDs rather than explicit names/emails, ensuring they are judging solely based on the objective Career Readiness Score.
