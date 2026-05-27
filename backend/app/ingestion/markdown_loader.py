import os
import hashlib
from pathlib import Path
from typing import List
from dataclasses import dataclass


@dataclass
class RawDocument:
    file_path: str
    title: str
    category: str
    content: str
    checksum: str


def _detect_category(rel_path: str) -> str:
    parts = rel_path.replace("\\", "/").split("/")
    if "chapters" in parts:
        return "chapter"
    if "exercises" in parts:
        return "exercise"
    if "projects" in parts:
        return "project"
    if "appendices" in parts:
        return "appendix"
    return "general"


def _extract_title(content: str, file_stem: str) -> str:
    for line in content.split("\n"):
        line = line.strip()
        if line.startswith("title:"):
            return line.replace("title:", "").strip().strip('"').strip("'")
        if line.startswith("# "):
            return line.replace("# ", "").strip()
    return file_stem.replace("-", " ").title()


def _compute_checksum(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def _skip_file(rel_path: str) -> bool:
    name = os.path.basename(rel_path)
    parts = rel_path.replace("\\", "/").split("/")
    if "contributing" in parts:
        return True
    return name == "intro.md"


def load_all_documents(content_dir: str) -> List[RawDocument]:
    docs = []
    base = Path(content_dir)
    if not base.exists():
        return docs

    for md_file in sorted(base.rglob("*.md")):
        rel_path = str(md_file.relative_to(base))
        if _skip_file(rel_path):
            continue
        raw = md_file.read_text(encoding="utf-8")
        title = _extract_title(raw, md_file.stem)
        category = _detect_category(rel_path)
        checksum = _compute_checksum(raw)
        docs.append(
            RawDocument(
                file_path=rel_path,
                title=title,
                category=category,
                content=raw,
                checksum=checksum,
            )
        )
    return docs
