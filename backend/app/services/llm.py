from openai import AsyncOpenAI
from app.config import settings

client = AsyncOpenAI(
    api_key=settings.openai_api_key,
    base_url=settings.openai_base_url,
)


SYSTEM_PROMPT = """You are an expert teaching assistant for the "Physical AI & Humanoid Robotics" textbook. 
Your role is to help students understand the textbook content.

Rules:
1. If relevant context from the textbook is provided, use it to answer and cite the specific chapter/section.
2. If the context doesn't contain enough information, you may use your own knowledge to answer, but clearly state that it's not from the textbook.
3. For general conversation (greetings, etc.), respond naturally.
4. Keep answers clear, educational, and appropriate for a university-level course.
5. When asked about selected text, focus your answer specifically on that text.
6. Use LaTeX notation $...$ for any mathematical formulas.
7. Be concise but thorough in your explanations."""


async def generate_answer(
    question: str,
    context_chunks: list[str],
    conversation_history: list[dict] | None = None,
) -> str:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    if conversation_history:
        for msg in conversation_history[-10:]:
            messages.append({"role": msg["role"], "content": msg["content"]})

    context_text = "\n\n---\n\n".join(context_chunks)
    user_message = f"""Context from textbook:
{context_text}

Question: {question}

Answer using the context if relevant, otherwise use your own knowledge."""

    messages.append({"role": "user", "content": user_message})

    response = await client.chat.completions.create(
        model=settings.openai_model,
        messages=messages,
        temperature=0.3,
        max_tokens=1024,
    )
    return response.choices[0].message.content or ""
