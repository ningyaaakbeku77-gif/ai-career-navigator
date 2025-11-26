class AssessmentAgent:
    def __init__(self):
        self.conversation_history = []
    
    async def start_assessment(self, career_goal: str):
        return f"Let's discuss your path to becoming a {career_goal}"
    
    async def process_response(self, user_response: str):
        return {
            "response": "Great! Tell me more about your experience.",
            "skill_scores": {}
        }
