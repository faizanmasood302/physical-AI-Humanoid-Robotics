import numpy as np
from fastembed import TextEmbedding
from app.config import settings

_model = None


def _get_model():
    global _model
    if _model is None:
        _model = TextEmbedding(
            model_name=settings.embedding_model,
            max_length=512,
        )
    return _model


def _encode(texts: list[str]) -> list[list[float]]:
    model = _get_model()
    embeddings = list(model.embed(texts))
    return [e.tolist() for e in embeddings]


async def create_embedding(text: str) -> list[float]:
    return _encode([text])[0]


async def create_embeddings_batch(texts: list[str]) -> list[list[float]]:
    batch_size = 32
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i + batch_size]
        all_embeddings.extend(_encode(batch))
    return all_embeddings
