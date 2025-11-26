from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AssessmentStart(BaseModel):
    career_goal: str

class AssessmentMessage(BaseModel):
    message: str
    session_id: str

@router.post("/start")
async def start_assessment(data: AssessmentStart):
    return {
        "session_id": "session-123",
        "message": "Hi! Let's start your career assessment. Tell me about your experience with " + data.career_goal
    }

@router.post("/message")
async def send_message(data: AssessmentMessage):
    return {
        "response": "That's interesting! Can you tell me more about your projects?",
        "skill_scores": {"python": 0.7, "javascript": 0.5}
    }
