# Scalability Plan

While the MVP is intentionally constrained to a single Render instance and free-tier databases, this Scalability Plan details the transition path for handling large, multi-college enterprise deployments (Phase 2 and beyond).

## 1. Traffic Surges (Queueing)
**Challenge:** During placement seasons, hundreds of students from a single college may start mock interviews simultaneously, overwhelming the AI API rate limits or timing out the FastAPI event loop.
**Solution:** 
- Implement a **Request Queue System** (e.g., Redis + BullMQ).
- **Audio Loop:** Live interview audio processing will take priority in the fast lane.
- **Scoring Pipeline:** Post-interview transcript scoring (which utilizes the heavier DeepSeek model) will be offloaded to a Background Job Processing queue. Students will see a "Calculating Score..." UI state rather than hanging the main server thread.

## 2. API Quota Exhaustion (Rate Limiting)
**Challenge:** Exceeding free-tier limits on external AI services.
**Solution:**
- Transition to paid API tiers funded by B2B revenue.
- Implement **Fallback Providers**. If Groq Whisper goes down or hits a rate limit, the system will automatically failover to Deepgram.

## 3. Database Scaling
**Challenge:** Storing tens of thousands of interview transcripts will eventually exhaust the Neon free tier storage.
**Solution:**
- Upgrade Neon to a paid tier to utilize auto-scaling read replicas.
- Transcripts older than 6 months can be archived to cold storage (e.g., AWS S3) to save primary database costs, leaving only the computed scores in the relational DB.

## 4. Compute Scaling (Horizontal)
**Challenge:** The FastAPI monolith cannot handle >500 concurrent WebSocket/HTTP streaming connections on a 512MB RAM instance.
**Solution:**
- Move from the Render free tier to Render Pro (or AWS ECS/EKS).
- Deploy multiple instances of the backend behind a Load Balancer.
- Utilize Redis as a centralized session store to manage WebSocket state across multiple instances.
