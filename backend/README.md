# RAG Chatbot Backend

FastAPI backend for the Physical AI & Humanoid Robotics textbook chatbot.

## Architecture

- **FastAPI** — API server
- **OpenAI** — Embeddings (`text-embedding-3-small`) + Chat (`gpt-4o-mini`)
- **Qdrant Cloud** — Vector store for semantic search
- **Neon (PostgreSQL)** — Chat history & content metadata

## Setup

```bash
# 1. Create env file
cp .env.example .env
# Edit .env with your credentials

# 2. Install dependencies
pip install -r requirements.txt

# 3. Ingest textbook content
python scripts/ingest.py

# 4. Run server
uvicorn app.main:app --reload
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Health check |
| POST | `/api/v1/chat` | Chat with context |
| POST | `/api/v1/query` | Query textbook |
| POST | `/api/v1/query/selected` | Query about selected text |
| POST | `/api/v1/ingest` | Ingest/re-ingest content |
| GET | `/api/v1/ingest/status` | Check content status |

## Docker

```bash
docker-compose up --build
```
