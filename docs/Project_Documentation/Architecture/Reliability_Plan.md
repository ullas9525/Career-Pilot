# Reliability Plan

As a system heavily dependent on external third-party APIs (LLMs, STT, TTS, Search), CareerPilot's reliability is intrinsically linked to the uptime of those providers. This document outlines the strategies to maintain system stability despite external volatility.

## 1. Retry Mechanisms
- **Transient Failures:** Network blips or temporary API timeouts (HTTP 502, 503, 504) from DeepSeek or Nematron will trigger an automatic Exponential Backoff Retry (e.g., retry after 1s, 2s, 4s) up to a maximum of 3 attempts.
- **Client Resilience:** If a retry loop takes too long during the live interview, the frontend will display a non-intrusive "Thinking..." indicator rather than throwing a hard error.

## 2. Circuit Breaker Pattern (Future Enhancement)
- If an API provider (e.g., Groq) fails consecutively 5 times within a 1-minute window, the Circuit Breaker will "open", preventing further requests from hanging the system. 
- While the circuit is open, the system will immediately route traffic to the predefined fallback provider.
- After a cooldown period, the circuit will "half-open" to test if the primary provider has recovered.

## 3. Fallback Providers
- **STT Fallback:** Primary: Groq Whisper. Fallback: Deepgram.
- **TTS Fallback:** Primary: Edge TTS. Fallback: Deepgram TTS or Google Cloud TTS.
- **LLM Conversational Fallback:** Primary: Nematron 3 Nano Omni. Fallback: Llama 3 (via Groq) or DeepSeek.

## 4. State Preservation
- **Mid-Interview Crashes:** The frontend will maintain the local transcript array in `localStorage` or session state. If the browser crashes or the student accidentally refreshes, they can rejoin the session and the backend will resume the context from the last saved turn.
