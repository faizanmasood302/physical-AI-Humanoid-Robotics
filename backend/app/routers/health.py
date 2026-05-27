from fastapi import APIRouter
from app.config import settings

router = APIRouter(prefix="/api/v1")


@router.get("/health")
async def health_check():
    return {
        "status": "ok",
        "qdrant_configured": bool(settings.qdrant_url),
        "openai_configured": bool(settings.openai_api_key),
        "database_configured": bool(settings.database_url),
        "content_dir": settings.content_dir or "default (website/docs)",
    }
