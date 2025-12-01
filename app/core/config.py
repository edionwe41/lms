from pydantic import BaseModel
from typing import List, Optional

class Settings(BaseModel):
    PROJECT_NAME: str = "Library Management System"

    # CORS ORIGINS (allow front-end)
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]

    # DATABASE URL
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./library.db"

    # JWT Settings
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 1 week
    JWT_SECRET: str = "CHANGE_ME_TO_SECURE_RANDOM"   # change in production
    JWT_ALGORITHM: str = "HS256"

    class Config:
        env_file = ".env"
        from_attributes = True

settings = Settings()
