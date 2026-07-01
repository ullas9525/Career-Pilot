# **Career Pilot User Flow Document**

## **1\. Introduction**

This document defines the navigation paths and screen sequences for the Career Pilot web application. It covers all HTML screens provided and ensures a logical, user‑centric flow from entry to core functionality.

All screens are linked through sidebars, buttons, and CTAs. The flows below represent the primary user journeys.

---

## **2\. User Roles**

| Role | Description |
| ----- | ----- |
| **Student** | A candidate preparing for job interviews. |
| **Placement Coordinator** | A college staff member managing student preparation and tracking outcomes. |

---

## **3\. Student Flow**

### **3.1. Onboarding & Authentication**

| Step | Screen | Action / Transition |
| ----- | ----- | ----- |
| 1 | **Landing Page** (`Landing Screen Code.html`) | User arrives. Clicks **“Get Started”** (Student) or **“I’m a Placement Coordinator”** (Coordinator – see Section 4). |
| 2 | **Student Login Page** (`Student Login Screen Code.html`) | User logs in or switches to **Sign Up** tab. |
| 3 | **Profile Completion Page** (`Profile Completion Screen Code.html`) | After successful sign‑in, user completes personal details, selects target role, uploads resume, and optionally connects LinkedIn/GitHub. |
| 4 | **Student Dashboard** (`Student Dashboard Screen Code.html`) | After profile completion, user lands on the main dashboard. |

### **3.2. Main Dashboard & Navigation**

The **Student Dashboard** serves as the hub. From here, the user can access all major sections via the sidebar or quick actions.

| Sidebar Link | Target Screen | Description |
| ----- | ----- | ----- |
| **Overview** | Student Dashboard (current) | Summary cards, score breakdown, skill balance, practice heatmap, recent activity. |
| **History** | History Page (`History Screen Code.html`) | List of past mock interviews with scores and dates. Clicking an entry opens a detailed report (Result Screen). |
| **Interview Process** | Interview Process Page (`Full Interview process Screen Code.html`) | Roadmap showing resume check, aptitude (coming soon), tech mock, HR mock, human eval. |
| **Mock Interview** | Mock Interview Page (`Mock Interview Screen Code.html`) | Three interview types: Tech AI, HR AI, Human Mentor. |
| **My Cohort** | Cohort Screen (`cohert.html`) | Cohort details, personal stats, leaderboard, peer comparison. |
| **Leaderboard** | Leaderboard Page (`Leaderboard Screen Code.html`) | Anonymous rankings within cohort, engagement score, role‑based filters. |
| **Settings** | Settings Page (`Settings code.html`) | Interview settings, notifications, role selection, GDPR data export/delete. |
| **Post‑Interview** | Post‑Interview Outcome (`Post_interview_system.html`) | (Optional) Report real interview outcome to improve AI.  |

### **3.3. Mock Interview Flow**

| Step | Screen | Action |
| ----- | ----- | ----- |
| 1 | **Mock Interview Page** | User selects an interview type (Tech, HR, or Human Mentor). |
| 2 | **Interview Session Page** (`Interview Session Code.html`) | The interview session loads with video layout, timer, recording controls, and permission checks. |
| 3 | **Result Page** (`Result Screen Code.html`) | After ending the session, the user is shown their score, rubric breakdown, transcript feedback, and improvement plan. |
| 4 | **History Page** (optional) | User can return to History to see all past attempts. |

### **3.4. Other Student Journeys**

* **View Past Interview Details**: From **History Page**, click any interview → **Result Page** (with full feedback).  
* **Check Process Roadmap**: From **Interview Process Page**, view progress and upcoming assessments (placeholder).  
* **View Cohort Ranking**: From **Cohort Screen**, see personal stats and leaderboard.  
* **Adjust Preferences**: From **Settings Page**, update interview duration, difficulty, role, or notification toggles.  
* **Report Real Interview Outcome**: From **Post‑Interview Outcome Page**, fill the optional form to share results.

---

## **4\. Placement Coordinator Flow**

| Step | Screen | Action |
| ----- | ----- | ----- |
| 1 | **Landing Page** | User clicks **“I’m a Placement Coordinator”**. |
| 2 | **Placement Login Page** (`Placement Login Screen Code.html`) | Coordinator logs in with work email, password, and college code. |
| 3 | **Placement Dashboard** (`Placement Dashboard Screen Code.html`) | Main coordinator hub showing metrics, batch snapshot, student progress table, alerts, outcomes, and correlation graphs. |
| 4 | **Navigation to sub‑screens** (via sidebar): |  |
|  | **College Analytics** | (Already the Dashboard) |
|  | **Placement Groups** | `Placement Group Management Screen Code.html` – create/manage cohorts, view group leaderboards. |
|  | **Global Leaderboard** | `Leaderboard Screen Code.html` – college‑wide leaderboard (anonymised). |
|  | **Placement Outcomes** | `Placement Outcome Screen Code.html` – bulk upload or add single outcome records, view success correlation. |
|  | **Student Progress** | `Placement Student Progress Screen Code.html` – search/filter students, view individual progress (side panel). |
|  | **Settings** | `Settings code.html` – coordinator settings (similar to student, but with college‑level controls). |

---

## **5\. Screen Transition Summary (Visual Overview)**

### **Student Journey**

Landing Page  
     │  
    ▼  
Student Login (or Sign Up)  
     │  
    ▼  
Profile Completion  
     │  
    ▼  
Student Dashboard  
    ├──► History ──► Result (detail)  
    ├──► Interview Process  
    ├──► Mock Interview ──► Interview Session ──► Result  
    ├──► My Cohort  
    ├──► Leaderboard  
    ├──► Settings  
    └──► Post‑Interview Outcome

### **Coordinator Journey**

Landing Page (click “I'm a Coordinator”)  
     │  
    ▼  
Placement Login  
     │  
    ▼  
Placement Dashboard  
    ├──► Placement Groups  
    ├──► Global Leaderboard  
    ├──► Placement Outcomes  
    ├──► Student Progress  
    └──► Settings  
---

## **6\. Key Navigation Patterns**

* **Sidebar** is present on all authenticated screens (Student and Coordinator) to enable quick switching.  
* **Back/Close buttons** on screens like Interview Session and Result allow return to previous context.  
* **Modals** (e.g., pre‑recording checklist in Interview Session) overlay the current screen.  
* **Empty states** (History, Leaderboard, etc.) are designed to guide users when no data exists.

---

## **7\. Notes for Front‑End Development**

* **Routing**: Each screen should be accessible via a unique URL path (e.g., `/student/dashboard`, `/coordinator/groups`).  
* **State Management**: User role, selected role, and interview session data should be stored in the browser (localStorage) or a global state store.  
* **Authentication**: Protect all authenticated screens; redirect to login if not logged in.  
* **Conditional Navigation**: Coordinator sidebar should show only coordinator‑relevant links; student sidebar only student links.

