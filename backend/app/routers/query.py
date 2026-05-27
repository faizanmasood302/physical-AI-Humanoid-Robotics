from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.chat import QueryRequest, SelectedTextRequest, ChatResponse
from app.services.embeddings import create_embedding
from app.services.vector_store import search_similar
from app.services.llm import generate_answer
from app.database import get_session
import uuid

router = APIRouter(prefix="/api/v1")


@router.post("/query", response_model=ChatResponse)
async def query_textbook(request: QueryRequest):
    query_embedding = await create_embedding(request.query)
    results = await search_similar(
        query_embedding,
        top_k=request.top_k,
        chapter_filter=request.chapter_filter,
    )

    context_chunks = [r.payload["content"] for r in results if r.payload]
    sources = []
    seen = set()
    for r in results:
        if r.payload and r.payload["file_path"] not in seen:
            sources.append(f"{r.payload['chapter']} ({r.payload['file_path']})")
            seen.add(r.payload["file_path"])

    reply = await generate_answer(request.query, context_chunks)

    session_id = str(uuid.uuid4())

    return ChatResponse(
        session_id=session_id,
        reply=reply,
        sources=sources[:3],
    )


@router.post("/query/selected", response_model=ChatResponse)
async def query_selected_text(
    request: SelectedTextRequest,
    db: AsyncSession = Depends(get_session),
):
    if not request.session_id or request.session_id == "new":
        request.session_id = str(uuid.uuid4())

    combined = f"Selected text: {request.selected_text}\n\nQuestion: {request.question}"
    query_embedding = await create_embedding(combined)
    results = await search_similar(query_embedding, top_k=3)

    context_chunks = [request.selected_text]
    for r in results:
        if r.payload:
            context_chunks.append(r.payload["content"])

    sources = []
    seen = set()
    for r in results:
        if r.payload and r.payload["file_path"] not in seen:
            sources.append(f"{r.payload['chapter']} ({r.payload['file_path']})")
            seen.add(r.payload["file_path"])

    sources.append("User-selected text")

    reply = await generate_answer(
        f'Regarding this selected text: "{request.selected_text[:200]}..."\n\nQuestion: {request.question}',
        context_chunks,
    )

    return ChatResponse(
        session_id=request.session_id,
        reply=reply,
        sources=sources[:3],
    )
