from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db, close_db
from app.services.vector_store import init_vector_store, close_vector_store
from app.routers import chat, query, ingest, health
from loguru import logger


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up...")
    if settings.database_url:
        await init_db()
    if settings.qdrant_url and settings.qdrant_api_key:
        await init_vector_store()
        logger.info("Vector store initialized")
    else:
        logger.warning("Qdrant not configured - vector search disabled")
    if not settings.openai_api_key:
        logger.warning("OpenAI not configured - LLM disabled")
    yield
    await close_db()
    await close_vector_store()
    logger.info("Shutdown complete")


app = FastAPI(
    title="Physical AI & Humanoid Robotics - RAG Chatbot API",
    description="RAG-powered chatbot backend for the Physical AI & Humanoid Robotics textbook",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(chat.router)
app.include_router(query.router)
app.include_router(ingest.router)


@app.get("/")
async def root():
    return {
        "app": "Physical AI & Humanoid Robotics - RAG Chatbot",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/v1/health",
    }
