# EvolvPath

AI-powered career navigation platform with real-time job market intelligence, conversational assessments, and personalized learning paths

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)

## 📋 Project Overview

EvolvPath is an intelligent career guidance platform that leverages AI to provide:
- 🎯 **Conversational AI Assessments** - Natural language-based career skill evaluation
- 📊 **Real-time Job Market Intelligence** - Live job data scraping and analysis
- 🎓 **Personalized Learning Roadmaps** - Custom skill development paths
- 🎤 **Voice Assistant Integration** - Hands-free interaction capabilities
- 🔐 **Secure Authentication** - JWT-based user management

## 🏗️ Architecture Overview

The platform follows a modern **microservices architecture** with:

### Frontend (React + TypeScript)
- **Framework**: React 18 with Vite build tool
- **Styling**: TailwindCSS for responsive design
- **State Management**: Zustand for lightweight state control
- **Routing**: React Router v6
- **UI Components**: Lucide React icons

### Backend (Python FastAPI)
- **Framework**: FastAPI for high-performance async API
- **AI/ML Stack**: LangChain, LangGraph, OpenAI integration
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Caching**: Redis for session and data caching
- **Task Queue**: Celery for background job processing
- **Authentication**: JWT tokens with python-jose

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (frontend reverse proxy)
- **Database**: PostgreSQL 15+
- **Cache Layer**: Redis 7+

## 🚀 Setup Instructions

### Prerequisites
- Docker & Docker Compose (recommended)
- OR Node.js 18+ and Python 3.11+
- PostgreSQL 15+
- Redis 7+
- OpenAI API Key

### Quick Start with Docker

1. **Clone the repository**
```bash
git clone https://github.com/ningyaaakbeku77-gif/ai-career-navigator.git
cd ai-career-navigator
```

2. **Configure environment variables**
```bash
# Create .env file in backend directory
cat > backend/.env << EOF
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/career_nav
REDIS_URL=redis://redis:6379
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET_KEY=your_secret_key_here
EOF
```

3. **Start all services**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Manual Setup

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📚 How to Run Locally

### Development Mode
```bash
# Terminal 1: Start backend
cd backend
uvicorn app.main:app --reload

# Terminal 2: Start frontend
cd frontend
npm run dev

# Terminal 3: Start Redis (if not using Docker)
redis-server

# Terminal 4: Start PostgreSQL (if not using Docker)
# Or use your local PostgreSQL instance
```

### Production Build
```bash
# Frontend production build
cd frontend
npm run build
npm run preview

# Backend with production server
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🔌 APIs & Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Assessment
- `POST /api/assessment/message` - Submit assessment message
- `GET /api/assessment/history` - Get assessment history
- `POST /api/assessment/start` - Start new assessment session

### Job Intelligence
- `GET /api/jobs/search` - Search job listings
- `GET /api/jobs/trends` - Get market trends
- `POST /api/jobs/scrape` - Trigger job data scraping

### Learning Paths
- `GET /api/learning/roadmap` - Get personalized roadmap
- `POST /api/learning/track` - Track learning progress
- `GET /api/learning/resources` - Get learning resources

**Full API Documentation**: http://localhost:8000/docs (Swagger UI)

**Postman Collection**: Available in `docs/postman_collection.json`

## 📊 Example Inputs/Outputs

### Assessment API Example
**Request:**
```json
{
  "message": "I want to become a data scientist",
  "session_id": "user_123_session"
}
```

**Response:**
```json
{
  "reply": "Great choice! Data science requires strong skills in...",
  "suggested_skills": ["Python", "Statistics", "Machine Learning"],
  "recommended_path": "data_science_beginner",
  "confidence_score": 0.92
}
```

### Job Search Example
**Request:**
```bash
GET /api/jobs/search?role=software+engineer&location=remote&experience=mid
```

**Response:**
```json
{
  "total_results": 145,
  "jobs": [
    {
      "title": "Senior Software Engineer",
      "company": "Tech Corp",
      "location": "Remote",
      "salary_range": "$120k-$180k",
      "posted_date": "2024-12-10",
      "match_score": 0.87
    }
  ]
}
```

## 📦 Dependencies

### Backend Dependencies
```
fastapi==0.115.0          # Web framework
uvicorn==0.32.0           # ASGI server
sqlalchemy==2.0.35        # ORM
psycopg2-binary==2.9.9    # PostgreSQL driver
langchain==0.3.2          # AI framework
langchain-openai==0.2.2   # OpenAI integration
langgraph==0.2.34         # Agent workflows
openai==1.51.0            # OpenAI API
redis==5.1.1              # Cache layer
celery==5.4.0             # Task queue
python-jose==3.3.0        # JWT handling
passlib==1.7.4            # Password hashing
```

### Frontend Dependencies
```
react==18.3.1             # UI framework
react-router-dom==6.26.0  # Routing
zustand==4.5.4            # State management
lucide-react==0.554.0     # Icons
vite==latest              # Build tool
tailwindcss==latest       # CSS framework
typescript==latest        # Type safety
```

## 👥 Contributors

- [**ningyaaakbeku77-gif**](https://github.com/ningyaaakbeku77-gif) - Creator & Maintainer

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Repository](https://github.com/ningyaaakbeku77-gif/ai-career-navigator)
- [Issues](https://github.com/ningyaaakbeku77-gif/ai-career-navigator/issues)
- [Documentation](./docs)
- [Project Guide](./PROJECT_GUIDE.md)

## 🙏 Acknowledgments

- LangChain for AI orchestration framework
- OpenAI for language model capabilities
- FastAPI for the excellent Python web framework
- React community for frontend tools

---

**Built with ❤️ for empowering career growth through AI**
