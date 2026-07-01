# Deployment Strategy

## 1. Cloud Provider Selection
CareerPilot relies on **Render** for backend hosting and **Vercel** (or Render Static Sites) for frontend hosting. These platforms were selected because they offer zero-configuration deployments via GitHub integration and possess generous free tiers capable of supporting the MVP.
The database is hosted on **Neon**, which offers a serverless PostgreSQL architecture.

## 2. Environment Segregation
- **Development:** Runs locally on developers' machines (`localhost`). Connects to a dedicated development branch of the Neon database.
- **Production (Pilot):** The live environment accessible to students. Hosted on Render. Connects to the main production branch of the Neon database.

## 3. Zero-Downtime Architecture (Future)
For the MVP, Render's native deployment mechanism is used, which may incur a few seconds of downtime during the container swap. In Phase 2, deployments will utilize Blue/Green deployment strategies to ensure zero downtime during active placement seasons.
