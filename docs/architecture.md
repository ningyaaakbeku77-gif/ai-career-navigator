# EvolvPath System Architecture

```mermaid
graph TD
    subgraph User's Browser
        UI[React + Tailwind UI]
        VA[Voice Capture]
    end

    subgraph Frontend (React/Vite)
        UI -->|REST API requests, Auth tokens| FE[React App]
        VA --> FE
        FE -.->|SpeechRecognition APIs|VA
    end

    subgraph Backend (FastAPI)
        FE -->|REST/HTTP| API[FastAPI Server]
        API -->|/api/auth/*| AUTH[Auth Module (JWT)]
        API -->|/api/assessment/message| AI[AI Feedback Logic]
        API -->|/api/jobs/search| JOBS[Jobs API/Mock]
        API -->|/api/roadmap/generate| ROADMAP[Roadmap logic]
    end

    subgraph AI Model
        AI -->|API Call| GPT[OpenAI GPT-4]
    end

    subgraph Database
        AUTH --> DB[(PostgreSQL)]
        AI --> DB
        JOBS --> DB
        ROADMAP --> DB
        DB -.-> API
    end

    FE -.->|WebSocket future| API
```*