# UX Specification

## 1. Core UX Principles
- **Dark Mode Default:** To align with developer aesthetics, the platform defaults to a high-contrast dark mode (deep grays, vibrant primary accents like neon green for positive scores and harsh red for negative feedback).
- **Minimal Cognitive Load:** The interface must avoid clutter. During the live interview, the screen should only contain the audio visualizer and the "Speak" button to minimize distraction and simulate focus.
- **Brutal but Constructive:** The feedback UI must clearly visually distinguish between praise and criticism. Negative feedback must always be immediately followed by an actionable "Ideal Answer".

## 2. Accessibility (a11y)
- **Keyboard Navigable:** All core actions (starting interview, toggling mic) must have keyboard shortcuts (e.g., Spacebar to toggle mic).
- **Screen Reader Support:** ARIA labels on all interactive elements.
- **Color Contrast:** Minimum 4.5:1 contrast ratio for all text elements against background colors.

## 3. Typography & Color Palette
- **Primary Font:** Inter or Roboto (sans-serif) for clean readability.
- **Monospace Font:** Fira Code or JetBrains Mono for rendering code snippets within the transcript feedback.
- **Primary Action Color:** Electric Blue (`#3B82F6`) for primary CTA buttons.
- **Success Color:** Emerald (`#10B981`) for scores > 7.0.
- **Warning Color:** Amber (`#F59E0B`) for scores 5.0 - 6.9.
- **Danger Color:** Rose (`#F43F5E`) for scores < 5.0 and "End Interview" destructive actions.
