from fastapi import APIRouter
from app.models.content import IngestStatus
from app.ingestion.markdown_loader import load_all_documents
from app.ingestion.chunker import chunk_all_documents
from app.services.embeddings import create_embeddings_batch
from app.services.vector_store import upsert_chunks, delete_all_chunks
from app.config import settings
import os

router = APIRouter(prefix="/api/v1")


@router.post("/ingest", response_model=IngestStatus)
async def ingest_content():
    content_dir = settings.content_dir or os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        "website", "docs"
    )

    docs = load_all_documents(content_dir)
    if not docs:
        return IngestStatus(
            total_files=0,
            total_chunks=0,
            files_ingested=[],
            status=f"No markdown files found in {content_dir}",
        )

    chunks = chunk_all_documents(docs)

    file_chunks: dict[str, list] = {}
    for chunk in chunks:
        file_chunks.setdefault(chunk.file_path, []).append(chunk)

    await delete_all_chunks()

    for file_path, file_chunks_list in file_chunks.items():
        texts = [c.content for c in file_chunks_list]
        embeddings = await create_embeddings_batch(texts)
        await upsert_chunks(file_chunks_list, embeddings)

    return IngestStatus(
        total_files=len(docs),
        total_chunks=len(chunks),
        files_ingested=[d.file_path for d in docs],
        status="success",
    )


@router.get("/ingest/status")
async def ingest_status():
    content_dir = settings.content_dir or os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
        "website", "docs"
    )
    docs = load_all_documents(content_dir)
    return {
        "content_dir": content_dir,
        "files_found": len(docs),
        "files": [d.file_path for d in docs],
    }
