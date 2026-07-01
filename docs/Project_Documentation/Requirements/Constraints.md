# Constraints

The development and deployment of the CareerPilot platform are bound by the following technical, financial, and operational constraints:

## 1. Financial Constraints
- **Zero-Capital MVP:** The MVP must be built and deployed without incurring any upfront or recurring software/infrastructure costs. All services (Render, Neon PostgreSQL, Groq, DeepSeek, Nematron, Tavily Search, Edge TTS) must be utilized strictly within their respective free-tier limitations.

## 2. Technical Constraints
- **Web-Only Environment:** The current iteration is strictly a web application. Native iOS and Android applications are out of scope.
- **Latency Over Accuracy (Audio Loop):** In the live conversational loop, maintaining a sub-3-second latency is prioritized over using a massive, slow LLM. Hence, the ultra-fast Nematron 3 Nano Omni and Groq Whisper are mandated over heavier models like GPT-4o for the live loop.
- **Stateless Live Processing:** Because Render free-tier instances have limited RAM (512MB) and ephemeral disks, all audio processing must occur in memory, and large files cannot be stored on the server's local file system.

## 3. Time Constraints
- **Final-Year Project Deadlines:** The core MVP must be feature-complete and deployed within a strict 9-week development window to meet academic submission deadlines and pilot launch schedules.

## 4. Ethical and Legal Constraints
- **No Video Analytics:** The system will not perform facial expression or confidence analysis due to known racial/gender biases in current CV models and ethical concerns regarding student privacy.
- **Data Protection:** The platform is bound by strict privacy rules; audio data cannot be used to train models or stored post-session. All scoring logic must operate solely on the generated text transcript.
