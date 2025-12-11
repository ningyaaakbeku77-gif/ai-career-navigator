from fastapi import APIRouter
from pydantic import BaseModel
import openai
import os

router = APIRouter()

# --- Load your OpenAI API key from .env or system env ---
openai.api_key = os.getenv("OPENAI_API_KEY", "sk-your-key-here")

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
    """
    Main AI integration: User submits answer, you send it to OpenAI for evaluation and return the result.
    """
    try:
        # Build prompt for interview answer scoring
        prompt = f"""As an AI interviewer for EvolvPath, please:
        1. Briefly (2 lines) evaluate the technical depth, clarity, and relevance of this candidate answer.
        2. Assign a skill score (0-10) for this answer.

        Candidate answer: {data.message}

        Respond with:
        Feedback:
        Skill Score:
        """

        completion = openai.Completion.create(
            model="text-davinci-003",  # Or try "gpt-3.5-turbo-instruct" if available
            prompt=prompt,
            max_tokens=200,
            temperature=0.65,
        )

        text = completion["choices"][0]["text"].strip()
        # Example output: "Feedback: Good fundamentals. Needs more real-world context.\nSkill Score: 7"
        lines = text.split('\n')
        feedback_lines = [line for line in lines if "Feedback:" in line]
        score_lines = [line for line in lines if "Skill Score" in line or "Skill score" in line]

        feedback = feedback_lines[0][len("Feedback:"):].strip() if feedback_lines else text.strip().split('\n')[0]
        skill_score = None
        if score_lines:
            try:
                skill_score = float(score_lines[0].split(":")[-1].strip())
            except Exception:
                skill_score = 7.0  # fallback
        else:
            skill_score = 7.0

        return {
            "response": feedback,
            "skill_scores": {"interview": skill_score / 10.0}  # normalized 0.0-1.0 for UI progress
        }
    except Exception as e:
        # Fallback to a generic result if anything goes wrong
        return {
            "response": "(Fallback) Good answer! For a deeper score breakdown, connect to OpenAI.",
            "skill_scores": {"interview": 0.7}
        }