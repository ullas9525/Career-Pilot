# Data Flow Diagram (Level 1)

## 1. Purpose
The Level 1 DFD breaks down Process 0 (CareerPilot System) into its major sub-processes, showing how data moves between the core functional modules and the primary datastores (Neon PostgreSQL).

## 2. Assumptions
- Datastores map roughly to the core database tables defined in the ER diagram.
- The external AI APIs are abstracted to avoid cluttering the primary business logic flow.

## 3. Explanation of Elements
- **Processes (Circles):** 
  - `1.0 Manage Identity`: Handles Auth and RBAC.
  - `2.0 Process Context`: Handles Resume parsing and JD search context.
  - `3.0 Execute Interview`: The live audio loop.
  - `4.0 Calculate Score`: Post-interview evaluation.
  - `5.0 Generate Reports`: Aggregation for the dashboard.
- **Datastores (Open Rectangles):** `D1 Users`, `D2 Resumes`, `D3 Interviews`, `D4 Results`.
- **Data Flows (Arrows):** Indicate the specific payloads moving between sub-processes and stores.

## 4. Mermaid Diagram

```mermaid
flowchart TD
    %% External Entities
    Student[Student]
    Coordinator[Coordinator]

    %% Datastores
    D1[(D1: Users DB)]
    D2[(D2: Resumes DB)]
    D3[(D3: Interviews DB)]
    D4[(D4: Results DB)]

    %% Processes
    P1((1.0\nManage Identity))
    P2((2.0\nProcess Context))
    P3((3.0\nExecute Interview))
    P4((4.0\nCalculate Score))
    P5((5.0\nGenerate Reports))

    %% Auth Flows
    Student -- Credentials --> P1
    Coordinator -- Credentials --> P1
    P1 -- Auth Token --> Student
    P1 -- User Profile Data --> D1

    %% Context Flows
    Student -- Resume Upload --> P2
    Student -- JD & Company --> P2
    P2 -- Parsed Resume JSON --> D2
    P2 -- Context Payload --> P3

    %% Interview Flows
    Student -- Voice Audio --> P3
    P3 -- TTS Audio --> Student
    P3 -- Session Metadata --> D3
    P3 -- Final Transcript --> P4

    %% Scoring Flows
    P4 -- Read Transcript --> P4
    P4 -- Dimension Scores & Feedback --> D4
    P4 -- Final Report --> Student

    %% Dashboard Flows
    Coordinator -- Request Analytics --> P5
    D4 -- Aggregated Scores --> P5
    D1 -- Student Roster --> P5
    P5 -- Dashboard UI Data --> Coordinator
```
