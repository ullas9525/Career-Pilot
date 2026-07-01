# Navigation Design

CareerPilot uses a simplified, flat navigation hierarchy to keep users focused on their primary tasks.

## 1. Student Navigation Hierarchy
- **Dashboard (Home)** `/dashboard`
  - -> Interview Setup `/interview/setup`
    - -> Interview Lobby `/interview/lobby`
      - -> Live Interview `/interview/live/:id`
        - -> Results `/interview/results/:id`
- **Profile & Resume** `/profile`
- **History** `/history` (List of past results)

## 2. Coordinator Navigation Hierarchy
- **Dashboard (Home)** `/coordinator/dashboard`
- **Student Roster** `/coordinator/roster`
- **At-Risk Students** `/coordinator/at-risk`
- **Settings** `/coordinator/settings`

## 3. UI Navigation Patterns
- **Sidebar:** The primary navigation mechanism for switching between root views (Dashboard, Profile, History). The sidebar is persistent except during the `Interview_Live` view, where it is hidden to maximize focus.
- **Breadcrumbs:** Used deep within the interview flow (e.g., `Dashboard > Interview Setup > Results`) to allow easy backward navigation, though backward navigation is disabled during the `Interview_Live` state to prevent accidental session termination.
- **Modals:** Used exclusively for destructive actions (e.g., "Are you sure you want to end the interview early?") to prevent accidental data loss.
