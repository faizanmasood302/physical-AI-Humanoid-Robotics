from pydantic import BaseModel
from typing import List, Optional


class ChatRequest(BaseModel):
    session_id: str
    message: str
    chapter_filter: Optional[str] = None


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    sources: List[str] = []


class QueryRequest(BaseModel):
    query: str
    top_k: int = 5
    chapter_filter: Optional[str] = None


class SelectedTextRequest(BaseModel):
    session_id: str
    selected_text: str
    question: str


class Message(BaseModel):
    role: str
    content: str


class ChatHistory(BaseModel):
    session_id: str
    messages: List[Message]
