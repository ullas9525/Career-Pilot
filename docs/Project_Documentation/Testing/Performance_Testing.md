# Performance Testing

Given the strict constraint of operating the MVP on free-tier infrastructure, performance testing focuses on finding the breaking point of the system rather than proving it can handle massive enterprise scale.

## 1. Latency Benchmarking (The Audio Loop)
The most critical performance metric is the end-to-end audio loop latency.
- **Metric:** Audio In -> STT -> LLM -> TTS -> Audio Out.
- **Target:** < 3.0 seconds (Average).
- **Test Methodology:**
  - Create a mock client script that pushes a 5-second pre-recorded audio `.webm` blob to the `/api/interviews/:id/turn` endpoint.
  - Record the timestamp immediately before the request is dispatched.
  - Record the timestamp the moment the first byte of the returned TTS audio stream is received.
  - Run this loop 50 times during varying times of day to account for Groq/Nematron network fluctuations.

## 2. API Quota Stress Testing
- **Metric:** Handling HTTP 429 (Too Many Requests).
- **Test Methodology:**
  - Rapidly fire requests to the DeepSeek scoring endpoint using a load testing tool (e.g., K6 or Artillery) until the free tier rate limit is hit.
  - Verify that the backend gracefully catches the 429 error, initiates an exponential backoff retry, and informs the frontend without crashing the FastAPI event loop.

## 3. Database Connection Pooling
- **Metric:** Connection exhaustion under concurrent load.
- **Test Methodology:**
  - Simulate 50 concurrent students finishing their interviews at the exact same moment (triggering 50 simultaneous massive JSON writes to Neon PostgreSQL).
  - Monitor Neon dashboard to ensure the connection pooler queues the transactions correctly without throwing "Too Many Connections" fatal errors.
