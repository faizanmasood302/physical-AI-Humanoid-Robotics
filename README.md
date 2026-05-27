Link: https://physical-ai-humanoid-robotics-psi-five.vercel.app/
uilding Physical AI & Humanoid Robotics — An Interactive RAG Textbook
Built a full-stack RAG chatbot for a Physical AI & Humanoid Robotics textbook with this stack:
🧠 AI/ML
- Groq (Llama 3.3 70B) — LLM for chat responses
- FastEmbed (Qdrant) — Local embeddings (ONNX, 384-dim)
- Qdrant Cloud — Vector store for semantic search
⚡ Backend
- FastAPI — RAG API server
- Neon Postgres — Chat history & metadata persistence
- Better Auth — Email/password authentication with bearer tokens
- Hono — Auth server (Node.js)
🌐 Frontend
- Docusaurus v3.9 — Static site generation for textbook
- React — Interactive auth, chatbot widget, text selection QA
- Vercel — Frontend deployment
☁️ Infrastructure
- Hugging Face Spaces (Docker) — Backend & auth server hosting
- GitHub Actions — Auto-sync to HF Spaces
- Neon — Serverless Postgres (connection pooling, cold-start resilience)
