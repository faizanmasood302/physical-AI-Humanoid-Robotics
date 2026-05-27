import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel
from app.config import settings

_model = None
_tokenizer = None
_device = "cuda" if torch.cuda.is_available() else "cpu"


def _get_model_and_tokenizer():
    global _model, _tokenizer
    if _model is None:
        _tokenizer = AutoTokenizer.from_pretrained(settings.embedding_model)
        _model = AutoModel.from_pretrained(settings.embedding_model).to(_device).eval()
    return _tokenizer, _model


def _mean_pooling(token_embeddings: torch.Tensor, attention_mask: torch.Tensor) -> torch.Tensor:
    mask = attention_mask.unsqueeze(-1).float()
    return (token_embeddings * mask).sum(dim=1) / mask.sum(dim=1).clamp(min=1e-9)


def _encode(texts: list[str]) -> list[list[float]]:
    tokenizer, model = _get_model_and_tokenizer()
    encoded = tokenizer(texts, padding=True, truncation=True, max_length=512, return_tensors="pt").to(_device)
    with torch.no_grad():
        outputs = model(**encoded)
    embeddings = _mean_pooling(outputs.last_hidden_state, encoded["attention_mask"])
    embeddings = torch.nn.functional.normalize(embeddings, p=2, dim=1)
    return embeddings.cpu().numpy().tolist()


async def create_embedding(text: str) -> list[float]:
    return _encode([text])[0]


async def create_embeddings_batch(texts: list[str]) -> list[list[float]]:
    batch_size = 32
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i + batch_size]
        all_embeddings.extend(_encode(batch))
    return all_embeddings
