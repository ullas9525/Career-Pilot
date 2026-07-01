# Screen Inventory

This document catalogs every distinct view in the CareerPilot Vite React + JavaScript frontend application.

## 1. Authentication Views
- **`Auth_Login`**: Email/password form. Links to signup.
- **`Auth_Signup`**: Email/password, University selection, Role selection (hidden by default).

## 2. Student Views
- **`Student_Dashboard`**: Primary hub. Shows current Career Readiness Score (donut chart), recent interviews list, and "Start Interview" CTA.
- **`Student_Profile`**: Resume upload zone. Displays parsed JSON data and current Resume Score.
- **`Interview_Setup`**: Form requiring Target Company input and Job Description textarea.
- **`Interview_Lobby`**: Microphone permission check and audio visualizer test.
- **`Interview_Live`**: Minimalist screen. Large pulsing audio visualizer, AI speaker status ("Listening...", "Thinking...", "Speaking..."), and a push-to-talk microphone button.
- **`Interview_Results`**: Comprehensive feedback screen containing the dimension score cards and side-by-side transcript viewer.

## 3. Coordinator Views
- **`Coord_Dashboard`**: Aggregate metrics (Average Cohort Score, Total Interviews this week).
- **`Coord_Roster`**: Sortable table of all students. Sortable by Readiness Score, Name, or Last Interview Date.
- **`Coord_AtRisk`**: Filtered view showing only students with scores < 4.0, including a CTA to "Email Student".

## 4. Global Components
- **`Nav_Sidebar`**: Left-aligned navigation menu (collapsible on mobile).
- **`Top_Bar`**: Contains User Avatar, Logout button, and Theme Toggle (Dark/Light).
- **`Toast_Notifications`**: Ephemeral popups for success/error states (e.g., "Resume parsed successfully").
