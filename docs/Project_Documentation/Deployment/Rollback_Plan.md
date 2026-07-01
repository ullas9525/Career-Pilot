# Rollback Plan

This document outlines the emergency procedures if a deployment to the Render production environment introduces critical bugs (e.g., the AI conversational loop crashes).

## 1. Application Code Rollback
- **Mechanism:** Render automatically retains previous build containers.
- **Procedure:**
  1. Login to the Render Dashboard.
  2. Navigate to the `careerpilot-backend` service.
  3. Go to the "Events" or "Deploys" tab.
  4. Identify the last known stable deployment.
  5. Click "Rollback to this deploy".
  6. The container swap will happen automatically within ~30 seconds.

## 2. Database Schema Rollback
- **Mechanism:** Neon PostgreSQL Point-in-Time Recovery (PITR).
- **Context:** If a deployment included a destructive database migration (e.g., dropping a critical column) that broke the application, rolling back the code alone is insufficient.
- **Procedure:**
  1. Login to the Neon Dashboard.
  2. Navigate to the Branches section.
  3. Select the production branch and choose "Restore to point in time".
  4. Select a timestamp immediately prior to the failed deployment.
  5. *Note:* This will result in data loss for any mock interviews conducted between the failed deployment and the rollback. Coordinators must be notified.

## 3. Post-Rollback Analysis (Post-Mortem)
- Following any rollback, the engineering team must create an Incident Report detailing:
  - Root cause of the failure.
  - Why the automated testing (Phase 9) failed to catch it.
  - New test cases added to prevent recurrence.
