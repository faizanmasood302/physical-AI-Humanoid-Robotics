from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ContentChunk(BaseModel):
    id: str
    file_path: str
    chapter: str
    section: str
    content: str
    chunk_index: int


class ContentMetadata(BaseModel):
    id: int
    file_path: str
    title: str
    category: str
    chunk_count: int
    last_ingested: datetime
    checksum: str


class IngestStatus(BaseModel):
    total_files: int
    total_chunks: int
    files_ingested: list[str]
    status: str
