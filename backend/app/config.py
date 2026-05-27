from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    openai_api_key: str = ""
    openai_base_url: str = "https://api.groq.com/openai/v1"
    openai_model: str = "llama-3.3-70b-versatile"

    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    embedding_dimension: int = 384

    qdrant_url: str = ""
    qdrant_api_key: str = ""
    qdrant_collection: str = "textbook_chunks"

    database_url: str = ""

    api_host: str = "0.0.0.0"
    api_port: int = 8000
    cors_origins: str = "http://localhost:3000,https://physical-ai-humanoid-robotics-book.vercel.app"

    content_dir: str = ""

    @property
    def cors_origin_list(self) -> List[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
