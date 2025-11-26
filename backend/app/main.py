from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="EvolvPath API",
    description="Backend API for AI-powered career navigation platform",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "EvolvPath API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/skills")
async def get_skills():
    return {
        "skills": [
            {"id": 1, "name": "Python", "category": "Programming", "status": "mastered"},
            {"id": 2, "name": "Machine Learning", "category": "AI/ML", "status": "learning"},
            {"id": 3, "name": "React", "category": "Frontend", "status": "pending"}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

@app.get('/api/jobs/search')
async def search_jobs(query: str = ''):
    # Mock job data - in production, scrape from real APIs
    return {
        'jobs': [
            {
                'id': 1,
                'title': 'Machine Learning Engineer',
                'company': 'Tech Corp',
                'location': 'Remote',
                'salary': '\ - \',
                'skills': ['Python', 'TensorFlow', 'ML'],
                'posted': '2 days ago',
                'remote': True
            }
        ],
        'total': 1
    }
