# Monitoring Strategy

Effective monitoring is critical for CareerPilot, particularly because the system relies heavily on third-party AI APIs where latency can fluctuate wildly.

## 1. System Health Monitoring
- **UptimeRobot:** A free monitor is configured to ping the backend `/health` endpoint every 10 minutes.
  - **Purpose 1:** Verify the server is online and the database connection is alive.
  - **Purpose 2:** Prevent the free-tier Render container from going to sleep, ensuring the first interview request of the day does not suffer a 30-second cold start delay.

## 2. API Latency Tracking
- Custom middleware will wrap all external API calls (Groq, DeepSeek, Nematron, Tavily).
- Metrics tracked:
  - Time to First Byte (TTFB) for streaming LLM responses.
  - Total STT transcription time.
  - Total context generation time.
- These metrics will be exposed via a lightweight internal dashboard or exported to a free monitoring tier (e.g., Datadog Free or Prometheus/Grafana if deployed locally).

## 3. Error Rate Monitoring
- Tracking HTTP 429 (Too Many Requests) from API providers to anticipate quota exhaustion.
- Tracking HTTP 5xx errors from the backend to identify unhandled exceptions or database connection drops.

## 4. Queue Health (Post-Pilot)
- When the background job queue (BullMQ/Redis) is implemented for asynchronous scoring, monitors will track:
  - Queue depth (number of pending transcripts waiting to be scored).
  - Processing time per transcript.
  - Job failure rates.
