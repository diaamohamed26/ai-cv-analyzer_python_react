from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analysis import router as analysis_router


# Initialize FastAPI
app = FastAPI(
    title="AI CV Analyzer",
    description="AI-powered CV analysis using Python, FastAPI and Groq",
    version="1.0.0",
)


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home endpoint
@app.get("/")
async def home():
    return {
        "success": True,
        "message": "AI CV Analyzer API is running",
        "ai_provider": "Groq",
        "version": "1.0.0",
    }


# Health endpoint
@app.get("/api/health")
async def health():
    return {
        "success": True,
        "status": "healthy",
    }


# Include API routes
app.include_router(analysis_router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
