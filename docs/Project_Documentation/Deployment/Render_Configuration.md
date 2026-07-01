# Render Configuration (Infrastructure as Code)

To maintain environment consistency, CareerPilot utilizes a `render.yaml` file (Infrastructure as Code) rather than manual GUI configuration for the Render platform.

## `render.yaml` Specification

```yaml
services:
  - type: web
    name: careerpilot-backend
    env: python
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port 10000
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false # Set manually in Render dashboard for security
      - key: JWT_SECRET
        sync: false
      - key: DEEPSEEK_API_KEY
        sync: false
      - key: GROQ_API_KEY
        sync: false
      - key: TAVILY_API_KEY
        sync: false
    healthCheckPath: /health
```

## Post-Deployment Actions
1. Navigate to the Render Dashboard.
2. Inject the secure API keys into the environment variable UI (since they are excluded from the `render.yaml` via `sync: false`).
3. Set up UptimeRobot to ping the `/health` endpoint URL provided by Render.
