# AI Improvement Roadmap

As Open-Source and proprietary AI models evolve rapidly, CareerPilot's backend architecture must continuously evaluate and integrate superior models to reduce latency and improve intelligence.

## 1. Near-Term Upgrades (0-6 Months)
- **Local STT (WebAssembly):** Currently, audio is sent to the Groq server for Whisper STT. To completely eliminate network STT latency, the next major upgrade involves running Whisper.cpp or a similar lightweight STT model directly inside the user's browser via WebAssembly. The backend will only receive the raw text string.
- **Multilingual Support:** Transitioning the Edge TTS and Whisper configurations to support regional languages (e.g., Hindi, Tamil) for Tier-3 engineering colleges where English fluency is a major interview barrier.

## 2. Mid-Term Upgrades (6-12 Months)
- **Fine-Tuned Small Language Models (SLMs):** Instead of relying on general-purpose models like Nematron 3, CareerPilot will fine-tune an open-source 8B parameter model (e.g., Llama 3 8B) explicitly on millions of technical interview transcripts. This highly specialized model will run on cheaper hardware (or local edge devices) while providing superior technical domain knowledge.

## 3. Long-Term Aspirations (12+ Months)
- **Multi-Modal Interviews:** Integrating vision models (e.g., GPT-4o or Claude 3.5 Sonnet) allowing the student to share their screen or hold up a whiteboard. The AI will evaluate their architectural diagrams or live coding attempts in real-time, matching the intensity of FAANG system design interviews.
