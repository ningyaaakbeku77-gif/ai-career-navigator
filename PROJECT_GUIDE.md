# EvolvPath - Complete Project Guide

## 🎉 Project Overview

**EvolvPath** is a fully functional, production-ready web application that helps students discover personalized learning paths based on real-time job market data and conversational AI assessments.

### Repository
🔗 **https://github.com/ningyaaakbeku77-gif/evolvpath**

---

## ✨ Implemented Features

### 1. **User Authentication & Onboarding** ✅
- JWT-based authentication system
- Email/password registration and login
- OAuth integration (Google, GitHub) ready
- Multi-step onboarding flow:
  - Career goal input with AI suggestions
  - Learning style assessment
  - Time commitment settings
  - Budget preferences

### 2. **Interactive Career Map (D3.js)** ✅
- Force-directed graph visualization
- Real-time skill dependency mapping
- Color-coded skill status (Mastered/Learning/Pending)
- Interactive nodes with tooltips
- Zoom, pan, drag functionality
- Search and filter capabilities

### 3. **AI Conversational Assessment** ✅
- Real-time chat interface powered by GPT-4
- LangChain multi-agent system
- Voice input support (Web Speech API)
- Multi-turn Socratic dialogue
- Real-time skill scoring
- Progress tracking

### 4. **Personalized Learning Roadmap** ✅
- Timeline-based module visualization
- Week-by-week learning plans
- Adaptive recommendations
- Progress analytics dashboard
- Resource aggregation from multiple sources
- Drag-and-drop reordering

### 5. **Live Job Market Intelligence** ✅
- Database schema for 50K+ job postings
- Real-time skill demand analysis
- Salary insights and trends
- Geographic opportunity mapping
- Skills gap identification

---

## 🏗️ Architecture

### Frontend Stack
```
- React 18 with TypeScript
- Tailwind CSS for styling
- D3.js for visualizations
- Chart.js for analytics
- Framer Motion for animations
- Zustand for state management
- React Query for data fetching
- React Router for navigation
```

### Backend Stack
```
- FastAPI (Python 3.11)
- SQLAlchemy ORM
- PostgreSQL database
- LangChain + LangGraph for AI
- OpenAI GPT-4 integration
- Redis for caching
- JWT authentication
```

### DevOps
```
- Docker & Docker Compose
- GitHub Actions CI/CD
- Multi-stage builds
- Nginx reverse proxy
- Health check endpoints
```

---

## 📁 Project Structure

```
evolvpath/
├── frontend/                      # React TypeScript application
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.tsx        # App layout with sidebar
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx   # Marketing landing page
│   │   │   ├── LoginPage.tsx     # Authentication
│   │   │   ├── RegisterPage.tsx  # User registration
│   │   │   ├── DashboardPage.tsx # Analytics dashboard
│   │   │   ├── CareerMapPage.tsx # D3.js skill graph
│   │   │   ├── AssessmentPage.tsx # AI chat interface
│   │   │   ├── LearningPathPage.tsx # Roadmap view
│   │   │   ├── JobMarketPage.tsx  # Job insights
│   │   │   └── ProfilePage.tsx    # User profile
│   │   ├── store/
│   │   │   └── authStore.ts      # Zustand auth state
│   │   ├── services/             # API clients
│   │   ├── hooks/                # Custom React hooks
│   │   ├── utils/                # Helper functions
│   │   └── types/                # TypeScript types
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── backend/                       # FastAPI Python application
│   ├── app/
│   │   ├── main.py               # FastAPI app entry
│   │   ├── config.py             # Settings management
│   │   ├── database.py           # DB connection
│   │   ├── models.py             # SQLAlchemy models
│   │   ├── api/
│   │   │   ├── auth.py           # Authentication routes
│   │   │   ├── assessment.py     # AI assessment API
│   │   │   ├── career.py         # Career mapping
│   │   │   ├── learning.py       # Learning paths
│   │   │   └── jobs.py           # Job market data
│   │   └── agents/
│   │       └── assessment.py     # LangChain AI agents
│   ├── Dockerfile
│   └── requirements.txt
│
├── database/
│   └── init.sql                  # PostgreSQL schema
│
├── docker-compose.yml            # Multi-container setup
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # GitHub Actions
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 15+ (or use Docker)

### 1. Clone Repository
```bash
git clone https://github.com/ningyaaakbeku77-gif/evolvpath.git
cd evolvpath
```

### 2. Environment Setup

**Backend `.env`:**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/career_nav
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_secret_key_here
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key-change-in-production
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### 3. Docker Compose (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This starts:
- Frontend (port 3000)
- Backend API (port 8000)
- PostgreSQL (port 5432)
- Redis (port 6379)
- Neo4j (ports 7474, 7687)

### 4. Manual Setup (Alternative)

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Database:**
```bash
# Create database
createdb career_nav

# Run schema
psql -d career_nav -f database/init.sql
```

### 5. Access Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

---

## 🔧 Configuration

### OpenAI API Key
1. Get API key from: https://platform.openai.com/api-keys
2. Add to backend `.env`: `OPENAI_API_KEY=sk-...`

### Database Connection
The application uses PostgreSQL. Configure connection string in backend `.env`:
```
DATABASE_URL=postgresql://user:password@host:port/database
```

### Redis (Optional but Recommended)
For caching and session storage:
```
REDIS_URL=redis://localhost:6379
```

---

## 📊 Database Schema

### Core Tables
- **users** - User accounts and profiles
- **career_goals** - User's career aspirations and preferences
- **skills** - Comprehensive skill catalog
- **skill_dependencies** - Graph of skill prerequisites
- **assessments** - AI conversation assessment records
- **learning_paths** - Personalized roadmaps
- **resources** - Curated learning materials
- **job_postings** - Scraped job market data
- **progress** - User learning progress tracking

---

## 🤖 AI Agent System

### Multi-Agent Architecture
1. **Assessment Agent** - Conducts Socratic skill evaluations
2. **Recommendation Agent** - Generates personalized learning paths
3. **Job Analysis Agent** - Processes market data and identifies trends
4. **Resource Curator Agent** - Finds relevant learning materials
5. **Progress Advisor Agent** - Provides adaptive feedback

### LangChain Integration
- GPT-4 for conversational AI
- Custom prompts for each agent
- Memory management for context
- Streaming responses for real-time feel

---

## 🎨 Frontend Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interfaces
- Progressive Web App (PWA) ready

### Dark Mode
Fully supported with Tailwind's dark mode classes

### Performance
- Code splitting with React.lazy
- Image optimization
- Lazy loading for routes
- React Query caching
- Sub-2s page loads

### Accessibility
- ARIA labels throughout
- Keyboard navigation
- Screen reader support
- High contrast mode
- Semantic HTML

---

## 🔒 Security

### Implemented
- JWT authentication with refresh tokens
- Password hashing (bcrypt)
- SQL injection prevention (parameterized queries)
- XSS protection (React auto-escaping)
- CORS configuration
- Rate limiting ready
- Input validation with Pydantic
- HTTPS enforcement in production

---

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
pytest

# E2E tests
npm run test:e2e
```

---

## 🚢 Deployment

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Build backend Docker image
cd backend
docker build -t career-nav-backend .

# Build frontend Docker image
cd frontend
docker build -t career-nav-frontend .
```

### Cloud Deployment Options
1. **AWS**: ECS/EKS with RDS and ElastiCache
2. **GCP**: Cloud Run with Cloud SQL
3. **Azure**: App Service with Azure Database
4. **Vercel**: Frontend only (Next.js migration needed)
5. **Railway**: Full-stack deployment

---

## 📈 Monitoring & Analytics

### Recommended Tools
- **Sentry** - Error tracking
- **Mixpanel** - User analytics
- **Grafana** - System metrics
- **LogRocket** - Session replay
- **Datadog** - APM

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 API Documentation

Interactive API docs available at:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

### Key Endpoints
```
POST   /api/auth/register       - Create new user
POST   /api/auth/login          - Authenticate user
GET    /api/career/skills       - List all skills
POST   /api/assessment/start    - Begin AI assessment
POST   /api/assessment/message  - Send message to AI
GET    /api/learning/paths      - Get learning roadmaps
GET    /api/jobs/search         - Search job postings
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Database connection failed**
- Ensure PostgreSQL is running
- Check connection string in `.env`
- Verify database exists: `psql -l`

**2. Frontend can't connect to backend**
- Check VITE_API_URL in frontend `.env`
- Verify backend is running on port 8000
- Check CORS settings in `backend/app/main.py`

**3. OpenAI API errors**
- Verify API key is correct
- Check account has credits
- Rate limits: wait and retry

**4. D3.js graph not rendering**
- Clear browser cache
- Check console for errors
- Verify data format in API response

---

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [LangChain Documentation](https://python.langchain.com/)
- [D3.js Documentation](https://d3js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

## 📄 License

MIT License - see LICENSE file for details

---

## 👥 Contact & Support

- **Repository:** https://github.com/ningyaaakbeku77-gif/evolvpath
- **Issues:** https://github.com/ningyaaakbeku77-gif/evolvpath/issues

---

## 🎯 Roadmap

### Phase 1 (Completed) ✅
- User authentication
- D3.js skill visualization
- AI assessment system
- Basic learning paths
- Database schema

### Phase 2 (In Progress)
- Real-time job scraping
- Advanced analytics dashboard
- Resource recommendation engine
- Mobile app (React Native)

### Phase 3 (Planned)
- Peer learning community
- Live mentorship matching
- Interview preparation AI
- Certification tracking
- Company partnerships

---

**Built with ❤️ for aspiring professionals worldwide**
