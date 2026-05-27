from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.chat import ChatRequest, ChatResponse
from app.services.embeddings import create_embedding
from app.services.vector_store import search_similar
from app.services.llm import generate_answer
from app.database import get_session, ChatSession, ChatMessage
from datetime import datetime, timezone
import uuid

router = APIRouter(prefix="/api/v1")


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: AsyncSession = Depends(get_session)):
    if not request.session_id or request.session_id == "new":
        request.session_id = str(uuid.uuid4())
        db.add(ChatSession(session_id=request.session_id, created_at=datetime.now(timezone.utc)))
        await db.commit()

    query_embedding = await create_embedding(request.message)
    results = await search_similar(
        query_embedding,
        top_k=5,
        chapter_filter=request.chapter_filter,
    )

    context_chunks = [r.payload["content"] for r in results if r.payload]
    sources = []
    seen = set()
    for r in results:
        if r.payload and r.payload["file_path"] not in seen:
            sources.append(f"{r.payload['chapter']} ({r.payload['file_path']})")
            seen.add(r.payload["file_path"])

    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == request.session_id)
        .order_by(ChatMessage.created_at.asc())
    )
    existing = result.scalars().all()
    history = [{"role": m.role, "content": m.content} for m in existing]

    db.add(ChatMessage(session_id=request.session_id, role="user", content=request.message))
    await db.commit()

    reply = await generate_answer(request.message, context_chunks, history)

    db.add(ChatMessage(session_id=request.session_id, role="assistant", content=reply, sources=sources))
    await db.commit()

    return ChatResponse(
        session_id=request.session_id,
        reply=reply,
        sources=sources[:3],
    )


@router.post("/chat/history")
async def get_chat_history(session_id: str, db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
    )
    messages = result.scalars().all()
    return [
        {"role": m.role, "content": m.content, "sources": m.sources}
        for m in messages
    ]
