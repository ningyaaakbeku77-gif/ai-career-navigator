from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter()

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    return {
        "access_token": "fake-jwt-token",
        "token_type": "bearer"
    }

@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    return {
        "access_token": "fake-jwt-token",
        "token_type": "bearer"
    }
