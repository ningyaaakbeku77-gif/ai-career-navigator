# EvolvPath

_EvolvPath is an AI-powered web platform for personalized career navigation, AI mock interviews, skill gap analysis, learning roadmaps, and market-matched job recommendations. Built for the IIT Bombay AI competition (Round 2 - Functional Prototype, 60–80% Completion)._

---

## 🚀 Overview

**EvolvPath** is your career co-pilot:
- **Personalized AI Interview Coach:** Simulates real interviews, evaluates answers, provides feedback.
- **Voice-enabled Guidance:** Use AI with text or voice for hands-free learning or interview prep.
- **Smart Learning Roadmap:** Visualize your skill journey, track progress, and get actionable module recommendations.
- **Dynamic Job Search:** Find actual tech jobs, matched to your evolving skill set.
- **Dark/Light Mode:** Enjoy a modern, accessible interface in your preferred theme.

---

## 🏗️ Architecture

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite, Context API (Auth, Theme), Web Speech API
- **Backend:** FastAPI (Python 3.11), SQLAlchemy, Pydantic, JWT auth, RESTful API
- **Database:** PostgreSQL (schema included), Redis (planned), job scraping (roadmap)
- **AI Models:** (Pluggable) OpenAI GPT-4 via LangChain (mock logic in prototype)
- **DevOps:** Docker, docker-compose, Nginx (frontend), API docs at `/docs`

---

## 📂 Directory Structure

```text
/
├── frontend/          # React client (src/components, src/contexts)
├── backend/           # FastAPI + DB models + API routes
├── docker-compose.yml # Dev orchestration
├── requirements.txt   # Python backend dependencies
├── README.md
├── PROJECT_GUIDE.md   # Architecture & technical writeup
└── .gitignore