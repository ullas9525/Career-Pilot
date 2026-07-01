# Interaction Design

This document specifies the micro-interactions, animations, and state transitions within the CareerPilot UI, which are critical for making the AI interview feel responsive and human-like.

## 1. The Audio Visualizer (Live Interview)
- **State 1: Idle.** The visualizer shows a flat line.
- **State 2: Student Speaking.** The visualizer ripples based on the amplitude of the student's microphone input (via Web Audio API). The color is a neutral white/gray.
- **State 3: AI Thinking.** The visualizer transitions into a slow, pulsing electric blue glow, indicating that the backend is processing (STT -> LLM).
- **State 4: AI Speaking.** The visualizer ripples with the AI's audio output amplitude. The color is electric blue to clearly differentiate who is currently "holding the floor."

## 2. Micro-Interactions
- **Button Hover States:** All primary buttons slightly scale up (`transform: scale(1.05)`) and increase shadow depth on hover to invite interaction.
- **Score Reveal:** On the `Interview_Results` page, the Career Readiness Score does not appear instantly. It counts up from 0.0 to the final score over 1.5 seconds, accompanied by a circular progress ring filling up. This gamifies the reveal and increases emotional engagement.
- **Skeleton Loaders:** During heavy API calls (e.g., waiting 15 seconds for DeepSeek to parse a resume), the UI displays skeleton loaders mimicking the shape of the expected text rather than a generic spinning wheel.

## 3. Error State Interactions
- **Microphone Denied:** If the user denies mic access, the UI shakes the "Start" button horizontally (CSS keyframe shake) and highlights the browser's address bar area with a tooltip explaining how to grant permissions.
- **Network Drop:** If the WebSocket/HTTP stream drops mid-interview, a non-intrusive toast notification slides down from the top: "Reconnecting to AI..." while the pulsing animation turns amber.
