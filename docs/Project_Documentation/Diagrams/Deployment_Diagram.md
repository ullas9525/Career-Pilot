# Deployment Diagram

## 1. Purpose
The Deployment Diagram shows the physical mapping of software components to hardware/cloud infrastructure. It highlights the use of free-tier cloud environments for the MVP.

## 2. Assumptions
- Render provides HTTPS termination automatically.
- Vercel/GitHub Pages is used for the static frontend hosting via a global CDN.

## 3. Mermaid Diagram

```mermaid
architecture-beta
    %% Currently, Mermaid Architecture diagrams are highly experimental.
    %% Using a deployment graph syntax instead for reliability.
```
*Wait, `architecture-beta` might not render correctly in all standard markdown viewers. We will use a standard graph TD with subgraphs to map physical nodes.*

```mermaid
flowchart TD
    %% Client Node
    subgraph Client Device ["Client Device (Browser/Mobile)"]
        Browser[Web Browser]
        React[Vite React + JavaScript SPA]
        Browser --> React
    end

    %% Edge/CDN Node
    subgraph Edge ["Frontend CDN (Vercel / GitHub Pages)"]
        StaticAssets[Static HTML/JS/CSS]
    end

    %% Cloud Server Node
    subgraph Render ["Render (Free Tier Instance)"]
        subgraph Docker ["Docker Container (Linux)"]
            Node[Python / FastAPI Server]
            API[API Gateway]
            Core[Core Logic Modules]
            Node --> API
            API --> Core
        end
    end

    %% Database Node
    subgraph DBCloud ["Neon Cloud"]
        Postgres[(Serverless PostgreSQL)]
        Pooler[Connection Pooler]
        Pooler --> Postgres
    end

    %% Third-Party Cloud Nodes
    subgraph APIs ["Third-Party AI Clouds"]
        GroqCloud(Groq LPU Cloud)
        DeepSeekCloud(DeepSeek Servers)
    end

    %% Network Connections
    React -- HTTPS GET --> StaticAssets
    React -- HTTPS / WSS --> Node
    Core -- TCP/TLS (Port 5432) --> Pooler
    Core -- HTTPS POST --> GroqCloud
    Core -- HTTPS POST --> DeepSeekCloud
```
