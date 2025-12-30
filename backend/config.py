import os
from typing import List
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "Best Moments"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv('DEBUG', 'False').lower() == 'true'
    
    # Server Settings
    HOST: str = os.getenv('HOST', '0.0.0.0')
    PORT: int = int(os.getenv('PORT', 8000))
    
    # Database Settings
    MONGODB_URL: str = os.getenv('MONGODB_URL', 'mongodb://localhost:27017')
    MONGODB_DB_NAME: str = os.getenv('MONGODB_DB_NAME', 'best_moments')
    
    # AWS S3 Settings
    AWS_ACCESS_KEY_ID: str = os.getenv('AWS_ACCESS_KEY_ID', '')
    AWS_SECRET_ACCESS_KEY: str = os.getenv('AWS_SECRET_ACCESS_KEY', '')
    AWS_REGION: str = os.getenv('AWS_REGION', 'us-east-1')
    S3_BUCKET_NAME: str = os.getenv('S3_BUCKET_NAME', '')
    CLOUDFRONT_DOMAIN: str = os.getenv('CLOUDFRONT_DOMAIN', '')
    
    # CORS Settings
    CORS_ORIGINS: List[str] = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
    
    # Frontend URL
    FRONTEND_URL: str = os.getenv('FRONTEND_URL', 'http://localhost:3000')
    
    # File Upload Settings
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_IMAGE_TYPES: List[str] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()