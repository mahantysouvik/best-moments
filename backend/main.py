from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from app.database import connect_to_mongo, close_mongo_connection
from app.routes import event_routes, album_routes, image_routes, template_routes
from app.utils.exceptions import AppException
from app.utils.responses import APIResponse

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

app = FastAPI(
    title="Best Moments API",
    description="API for managing event photo sharing with QR codes and templates",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(event_routes.router, prefix="/api/v1")
app.include_router(album_routes.router, prefix="/api/v1")
app.include_router(image_routes.router, prefix="/api/v1")
app.include_router(template_routes.router, prefix="/api/v1")

# Global exception handler
@app.exception_handler(AppException)
async def app_exception_handler(request, exc: AppException):
    return APIResponse.error(exc.message, exc.status_code, exc.details)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Best Moments API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv('PORT', 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)