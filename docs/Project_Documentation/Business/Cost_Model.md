# Cost Model

## MVP Infrastructure Costs (Target: Near-Zero)
The architecture is aggressively designed to operate within free-tier limits during the MVP and pilot phases:
- **Backend Hosting (Render):** Free tier (kept awake via UptimeRobot).
- **Database (Neon serverless PostgreSQL):** Free tier (0.5 GB storage is sufficient as media is immediately deleted).
- **Speech-to-Text (Groq Whisper):** Free tier (2,000 RPD).
- **LLM / Context (DeepSeek v4 flash):** Generous free tier.
- **LLM / Live Interview (Nematron 3 Nano Omni):** Generous free tier.
- **Web Search (Tavily Search API):** 1,000 free searches/month.
- **Text-to-Speech (Edge TTS):** Free / No API key required.

## Scaled Production Costs (Post-Pilot)
As the platform scales beyond free-tier limits, costs will transition to standard pay-as-you-go API models.
- The unit economics are highly favorable: The cost of API tokens (STT + LLM + TTS) for a 30-minute interview is estimated to be under $0.05.
- At an annual license fee of $20 per student, the gross margin per student is expected to exceed 95%, assuming 10 mock interviews per student per year.
