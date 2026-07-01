# Error Handling Standards

Consistent error handling is critical for frontend stability, especially during the volatile live audio interview loop where external APIs may timeout.

## 1. Standard Error Envelope
All backend endpoints that fail must return a standardized JSON structure:
```json
{
  "error": true,
  "code": "ERROR_CODE_STRING",
  "message": "Human readable message describing the failure."
}
```

## 2. HTTP Status Codes
- **200 / 201:** Success.
- **400 Bad Request:** Malformed payload (e.g., missing Job Description).
- **401 Unauthorized:** Missing, invalid, or expired JWT.
- **403 Forbidden:** Valid JWT, but the user lacks the required RBAC role.
- **404 Not Found:** Requested resource (e.g., a specific interview ID) does not exist.
- **429 Too Many Requests:** Client hit the API Gateway rate limit.
- **500 Internal Server Error:** Unhandled backend crash or database connection failure.
- **502 Bad Gateway:** DeepSeek, Nematron, or Groq failed to respond to the backend's proxy request.

## 3. specific Error Codes (`code` string)
- `AUTH_EXPIRED`: The frontend should intercept this, delete the local token, and force a redirect to `/login`.
- `AUDIO_STT_FAILED`: Groq Whisper failed to transcribe the audio. The frontend should prompt: "I didn't quite catch that, could you repeat?" instead of crashing.
- `LLM_TIMEOUT`: Nematron took >10 seconds to respond. The frontend should prompt: "Give me one second to process that..."
- `SCORE_GENERATION_FAILED`: DeepSeek failed to parse the transcript into JSON. The system must fallback to a secondary LLM or queue the job for a retry.
