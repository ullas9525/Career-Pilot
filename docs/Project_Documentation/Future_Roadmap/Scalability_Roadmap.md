# Scalability Roadmap

As CareerPilot transitions from a small MVP pilot to a commercially viable B2B platform utilized by multiple universities simultaneously, the architecture must transition from "Free-Tier Monolith" to "Enterprise Distributed".

## 1. Zero to 10,000 Users (Current MVP State)
- **Infrastructure:** Render Free Tier (Web Service), Neon PostgreSQL (Free Tier, 0.5GB).
- **Concurrency:** Limited by the single FastAPI event loop and API rate limits on Groq/DeepSeek.
- **Goal:** Prove product-market fit at near-zero cost.

## 2. 10,000 to 100,000 Users (The B2B Transition)
- **Infrastructure Upgrade:** Move to Paid Render instances (or AWS Elastic Beanstalk). Upgrade Neon to a paid tier to unlock higher storage for transcripts.
- **Queueing Introduced:** Implement Redis + BullMQ. Post-interview transcript scoring is offloaded to background workers so the main web server threads are never blocked.
- **Database Indexing:** As the `Users` and `Interviews` tables grow, strict B-Tree indexes on `university_id` and `user_id` must be enforced to keep the Coordinator Dashboard loading times under 2 seconds.

## 3. 100,000 to 1M+ Users (Enterprise Scale)
- **Microservices Architecture:** Break the monolith. The `Live_Audio_Loop` service is split from the `Auth_Dashboard` service, as they have vastly different scaling requirements (Audio needs sustained WebSockets; Dashboards need heavy database reads).
- **Data Sharding:** Partition the Neon PostgreSQL database by `university_id` (Tenant-based sharding). This ensures that a massive university conducting thousands of interviews during a placement drive does not degrade database performance for other universities.
- **CDN Edge Computing:** Push the Vite React + JavaScript frontend and static assets to a global CDN (e.g., Cloudflare or Vercel Edge) to minimize time-to-interactive for international users.
