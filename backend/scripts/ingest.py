#!/usr/bin/env python3
"""Standalone script to ingest all textbook content into Qdrant."""
import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.config import settings
from app.ingestion.markdown_loader import load_all_documents
from app.ingestion.chunker import chunk_all_documents
from app.services.embeddings import create_embeddings_batch
from app.services.vector_store import init_vector_store, upsert_chunks, close_vector_store
from loguru import logger


async def main():
    content_dir = settings.content_dir or os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "website", "docs"
    )

    logger.info(f"Loading documents from {content_dir}")
    docs = load_all_documents(content_dir)
    logger.info(f"Found {len(docs)} documents")

    if not docs:
        logger.error("No documents found. Check CONTENT_DIR path.")
        sys.exit(1)

    chunks = chunk_all_documents(docs)
    logger.info(f"Generated {len(chunks)} chunks")

    await init_vector_store()

    file_chunks: dict[str, list] = {}
    for chunk in chunks:
        file_chunks.setdefault(chunk.file_path, []).append(chunk)

    total = len(file_chunks)
    for i, (file_path, file_chunks_list) in enumerate(file_chunks.items(), 1):
        texts = [c.content for c in file_chunks_list]
        logger.info(f"[{i}/{total}] Embedding {file_path} ({len(texts)} chunks)")
        embeddings = await create_embeddings_batch(texts)
        await upsert_chunks(file_chunks_list, embeddings)

    await close_vector_store()
    logger.success(f"Ingestion complete: {len(docs)} files, {len(chunks)} chunks")


if __name__ == "__main__":
    asyncio.run(main())
