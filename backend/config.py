from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # Application Settings
    APP_NAME: str = "Best Moments"
    DEBUG: bool = os.getenv("DEBUG", "True") == "True"
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    
    # Database Settings
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "best_moments_db")
    
    # AWS S3 Settings
    AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY", "")
    AWS_REGION: str = os.getenv("AWS_REGION", "us-east-1")
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET_NAME", "best-moments-images")
    
    # OpenAI Settings (for image generation)
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Security Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
    ]
    
    # Event Settings
    EVENT_CODE_LENGTH: int = 8
    MAX_IMAGE_SIZE_MB: int = 10
    ALLOWED_IMAGE_FORMATS: List[str] = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    
    # Template Settings
    TEMPLATE_CATEGORIES: List[str] = ["wedding", "birthday", "engagement", "annoprasan", "other"]
    TEMPLATES_PER_CATEGORY: int = 5
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()