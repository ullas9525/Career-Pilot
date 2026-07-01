# Disaster Recovery Plan

This document outlines the recovery procedures in the event of catastrophic failure (e.g., complete loss of the Render backend or the Neon database).

## 1. RTO and RPO Targets
- **Recovery Time Objective (RTO):** 4 Hours. The maximum tolerable time the system can be offline before academic pilot schedules are severely impacted.
- **Recovery Point Objective (RPO):** 24 Hours (during MVP). The maximum tolerable data loss, translating to up to one day's worth of mock interviews.

## 2. Database Backup & Recovery (Neon)
- **Automated Backups:** Neon serverless architecture automatically maintains Point-in-Time Recovery (PITR) history for 7 days on the free tier. 
- **Recovery Procedure:** 
  1. Login to Neon Console.
  2. Select the Production Branch.
  3. Select "Restore" and choose the exact minute prior to the corruption/disaster event.
  4. The connection string remains identical; no application-level changes are required.

## 3. Application Infrastructure Recovery (Render)
- **Threat:** Render suspends the account or the specific data center goes down.
- **Recovery Procedure:** 
  1. Since the architecture is entirely defined by Infrastructure as Code (`render.yaml`) and Dockerized dependencies, the application can be redeployed to an alternate host (e.g., Railway, Fly.io, or Heroku) within minutes.
  2. The developer must manually inject the API keys (Groq, DeepSeek, Neon) into the new host's environment variable manager.
  3. Update DNS records (if utilizing a custom domain) to point to the new host.

## 4. Third-Party AI Failure
- If Groq, DeepSeek, or Nematron suffer a catastrophic outage, the system relies on the **Reliability Plan** (Fallback Providers). If the fallback providers also fail, the frontend will be put into "Maintenance Mode" to prevent students from having broken interviews.
