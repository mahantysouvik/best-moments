from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from config import settings
from routes import event_routes, image_routes, template_routes
from utils.exceptions import setup_exception_handlers
from dao.database import init_db, close_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    yield
    # Shutdown
    await close_db()

app = FastAPI(
    title="Best Moments API",
    description="Event Photo Sharing Platform with QR code generation and template selection",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup exception handlers
setup_exception_handlers(app)

# Include routers
app.include_router(event_routes.router, prefix="/api/events", tags=["Events"])
app.include_router(image_routes.router, prefix="/api/images", tags=["Images"])
app.include_router(template_routes.router, prefix="/api/templates", tags=["Templates"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to Best Moments API",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )