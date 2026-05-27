from qdrant_client import AsyncQdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
from app.config import settings
from app.models.content import ContentChunk

client: AsyncQdrantClient | None = None


async def init_vector_store():
    global client
    if not settings.qdrant_url:
        return
    client = AsyncQdrantClient(
        url=settings.qdrant_url,
        api_key=settings.qdrant_api_key,
    )
    collections = await client.get_collections()
    existing = [c.name for c in collections.collections]
    if settings.qdrant_collection not in existing:
        await client.create_collection(
            collection_name=settings.qdrant_collection,
            vectors_config=VectorParams(size=settings.embedding_dimension, distance=Distance.COSINE),
        )


async def upsert_chunks(chunks: list[ContentChunk], embeddings: list[list[float]]):
    if client is None:
        raise RuntimeError("Vector store not initialized")
    points = [
        PointStruct(
            id=hash(chunk.id) % (2**63),
            vector=embeddings[i],
            payload={
                "chunk_id": chunk.id,
                "file_path": chunk.file_path,
                "chapter": chunk.chapter,
                "section": chunk.section,
                "content": chunk.content,
                "chunk_index": chunk.chunk_index,
            },
        )
        for i, chunk in enumerate(chunks)
    ]
    await client.upsert(
        collection_name=settings.qdrant_collection,
        points=points,
    )


async def search_similar(
    query_embedding: list[float],
    top_k: int = 5,
    chapter_filter: str | None = None,
) -> list:
    if client is None:
        raise RuntimeError("Vector store not initialized")
    search_filter = None
    if chapter_filter:
        search_filter = Filter(
            must=[FieldCondition(key="chapter", match=MatchValue(value=chapter_filter))]
        )
    results = await client.query_points(
        collection_name=settings.qdrant_collection,
        query=query_embedding,
        limit=top_k,
        query_filter=search_filter,
    )
    return results.points


async def delete_all_chunks():
    if client is None:
        return
    exists = await client.collection_exists(settings.qdrant_collection)
    if exists:
        await client.delete_collection(collection_name=settings.qdrant_collection)
    await init_vector_store()


async def close_vector_store():
    global client
    if client:
        await client.close()
        client = None
