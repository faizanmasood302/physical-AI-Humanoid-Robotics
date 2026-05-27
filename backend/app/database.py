import asyncio
from collections.abc import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, Text, DateTime, func, JSON
from sqlalchemy.exc import OperationalError, InterfaceError
from app.config import settings
from loguru import logger

engine = None
async_session = None


class Base(DeclarativeBase):
    pass


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(String(128), unique=True, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    session_meta = Column("metadata", JSON, nullable=True)


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(String(128), nullable=False, index=True)
    role = Column(String(16), nullable=False)
    content = Column(Text, nullable=False)
    sources = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ContentMetadata(Base):
    __tablename__ = "content_metadata"

    id = Column(Integer, primary_key=True, autoincrement=True)
    file_path = Column(String(512), unique=True, nullable=False)
    title = Column(String(256), nullable=False)
    category = Column(String(64), nullable=False)
    chunk_count = Column(Integer, default=0)
    checksum = Column(String(64), nullable=False)
    last_ingested = Column(DateTime(timezone=True), server_default=func.now())


async def init_db():
    global engine, async_session
    if not settings.database_url:
        logger.warning("No DATABASE_URL configured - skipping database init")
        return
    engine = create_async_engine(
        settings.database_url,
        echo=False,
        pool_size=5,
        max_overflow=10,
        pool_pre_ping=True,
        pool_recycle=1800,
        pool_use_lifo=True,
        connect_args={
            "timeout": 15,
            "command_timeout": 10,
        },
    )
    async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database initialized (pool=5, overflow=10, recycle=1800s, pre-ping=on)")


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    if async_session is None:
        raise RuntimeError("Database not initialized - no DATABASE_URL configured")
    max_retries = 2
    for attempt in range(max_retries + 1):
        try:
            async with async_session() as session:
                yield session
                return
        except (OperationalError, InterfaceError) as e:
            logger.warning(f"DB error (attempt {attempt + 1}/{max_retries + 1}): {e}")
            if attempt < max_retries:
                await asyncio.sleep(0.5 * (attempt + 1))
                continue
            raise


async def close_db():
    global engine
    if engine:
        await engine.dispose()
        logger.info("Database engine disposed")
