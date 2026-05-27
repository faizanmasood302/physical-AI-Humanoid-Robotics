import re
from typing import List
from app.ingestion.markdown_loader import RawDocument
from app.models.content import ContentChunk


def _extract_chapter_name(file_path: str) -> str:
    parts = file_path.replace("\\", "/").split("/")
    for p in parts:
        if p.startswith("chapter-"):
            return p.replace("chapter-", "").replace(".md", "").replace("-", " ").title()
    return "General"


def _extract_section_heading(line: str) -> str:
    stripped = line.strip()
    if stripped.startswith("## "):
        return stripped.replace("## ", "").strip()
    if stripped.startswith("### "):
        return stripped.replace("### ", "").strip()
    return ""


def chunk_document(doc: RawDocument, chunk_size: int = 1000, overlap: int = 100) -> List[ContentChunk]:
    chapter = _extract_chapter_name(doc.file_path)
    content = doc.content

    frontmatter_end = content.find("---", 3)
    if frontmatter_end != -1 and content.startswith("---"):
        content = content[frontmatter_end + 3:].strip()

    content = re.sub(r'\n{3,}', '\n\n', content)
    content = re.sub(r'!\[.*?\]\(.*?\)', '', content)
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1', content)

    lines = content.split("\n")
    chunks: List[ContentChunk] = []
    current_chunk = ""
    current_section = "Introduction"
    chunk_index = 0

    for line in lines:
        heading = _extract_section_heading(line)
        if heading:
            if len(current_chunk) > chunk_size:
                chunks.append(ContentChunk(
                    id=f"{doc.file_path}#{chunk_index}",
                    file_path=doc.file_path,
                    chapter=chapter,
                    section=current_section,
                    content=current_chunk.strip(),
                    chunk_index=chunk_index,
                ))
                chunk_index += 1
                words = current_chunk.split()
                overlap_text = " ".join(words[-50:]) if len(words) > 50 else ""
                current_chunk = overlap_text
            current_section = heading

        current_chunk += line + "\n"

        while len(current_chunk) > chunk_size + overlap:
            split_at = current_chunk.rfind("\n", 0, chunk_size)
            if split_at == -1:
                split_at = chunk_size
            chunk_text = current_chunk[:split_at].strip()
            if chunk_text:
                chunks.append(ContentChunk(
                    id=f"{doc.file_path}#{chunk_index}",
                    file_path=doc.file_path,
                    chapter=chapter,
                    section=current_section,
                    content=chunk_text,
                    chunk_index=chunk_index,
                ))
                chunk_index += 1
            words = current_chunk.split()
            overlap_text = " ".join(words[-50:]) if len(words) > 50 else ""
            current_chunk = overlap_text + current_chunk[split_at:]

    remaining = current_chunk.strip()
    if remaining:
        chunks.append(ContentChunk(
            id=f"{doc.file_path}#{chunk_index}",
            file_path=doc.file_path,
            chapter=chapter,
            section=current_section,
            content=remaining,
            chunk_index=chunk_index,
        ))

    return chunks


def chunk_all_documents(docs: List[RawDocument]) -> List[ContentChunk]:
    all_chunks: List[ContentChunk] = []
    for doc in docs:
        all_chunks.extend(chunk_document(doc))
    return all_chunks
