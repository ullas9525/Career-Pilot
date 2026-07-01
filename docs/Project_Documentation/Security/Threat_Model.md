# Threat Model

## 1. Introduction
This document identifies potential security threats to the CareerPilot platform and outlines the mitigation strategies implemented to protect student data and backend infrastructure.

## 2. Threat Identification (STRIDE Model)

### 2.1 Spoofing
- **Threat:** An attacker attempts to impersonate a student or a placement coordinator to view unauthorized scores or manipulate interviews.
- **Mitigation:** Strict JWT-based authentication. Passwords hashed with bcrypt. No plain-text credentials stored.

### 2.2 Tampering
- **Threat:** An attacker intercepts the audio stream or the DeepSeek JSON payload to artificially inflate their Career Readiness Score.
- **Mitigation:** All traffic is encrypted in transit via HTTPS/WSS. The scoring logic executes entirely server-side; the client cannot dictate its own score.

### 2.3 Repudiation
- **Threat:** A student claims they did not conduct a specific interview or delete their account.
- **Mitigation:** Standard server-side logging of all destructive actions tied to the authenticated `user_id`.

### 2.4 Information Disclosure
- **Threat:** Exposure of sensitive student resumes or interview transcripts via an insecure API endpoint.
- **Mitigation:** RBAC middleware ensures that `GET /api/dashboard/cohort` can only be accessed by JWTs containing the `COORDINATOR` role. Student endpoints are restricted to `user_id` matches.

### 2.5 Denial of Service (DoS)
- **Threat:** A malicious script repeatedly triggers the live interview loop, exhausting the free-tier API quotas for Groq and DeepSeek, causing the app to crash for legitimate users.
- **Mitigation:** API Gateway rate limiting (e.g., max 5 interviews per hour per user).

### 2.6 Elevation of Privilege
- **Threat:** A student attempts to gain Coordinator or Admin privileges.
- **Mitigation:** Role assignments are hardcoded in the JWT payload generated exclusively by the secure backend. Users cannot mutate their own role via the profile update API.
