from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.core.database import Base, engine
from app.api import auth, users

app = FastAPI(
    title="Career Pilot API",
    version="1.0.0",
    description="AI-Based Mock Interview Preparation Platform",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)


@app.on_event("startup")
def on_startup():
    if engine:
        Base.metadata.create_all(bind=engine)


@app.get("/health")
async def health_check():
    return {"status": "ok", "version": "1.0.0"}
