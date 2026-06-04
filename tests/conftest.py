#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
"""测试配置文件 - pytest fixtures 和测试客户端

使用单个 session per test 模式，确保同一测试内的所有操作共享同一数据库会话。
"""

import os
import sys
import asyncio

# 确保 backend 目录在 sys.path 中
_backend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend")
sys.path.insert(0, _backend_dir)

# 在导入 app 之前设置环境变量，确保使用异步 SQLite 驱动
os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///:memory:"
os.environ["NODE_ENV"] = "test"

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.main import app
from app.database import Base, get_db
from app.models import User, App, Comment, ThirdPartyUser, Nonce, ReviewBook, ReviewChapter

# 测试用数据库 URL（SQLite 内存数据库）
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

# 全局共享的 engine
_test_engine = None


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest_asyncio.fixture(scope="session")
async def setup_test_engine():
    """创建全局测试数据库引擎（session 级别）"""
    global _test_engine
    _test_engine = create_async_engine(TEST_DATABASE_URL, echo=False)
    async with _test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with _test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await _test_engine.dispose()


def _make_session_factory():
    """创建 session factory"""
    return async_sessionmaker(_test_engine, class_=AsyncSession, expire_on_commit=False)


async def _cleanup_tables(session):
    """清理所有表中的数据，但保留表结构"""
    # 按依赖关系逆序删除
    await session.execute(Comment.__table__.delete())
    await session.execute(ThirdPartyUser.__table__.delete())
    await session.execute(Nonce.__table__.delete())
    await session.execute(App.__table__.delete())
    await session.execute(User.__table__.delete())
    await session.commit()


@pytest_asyncio.fixture
async def db_session(setup_test_engine):
    """每个测试用例获取一个独立的数据库 session"""
    factory = _make_session_factory()
    async with factory() as session:
        # 清理数据
        await _cleanup_tables(session)
        yield session
        await session.rollback()


@pytest_asyncio.fixture
async def client(setup_test_engine, db_session):
    """创建测试用异步 HTTP 客户端，使用测试 session"""

    async def _get_test_db():
        yield db_session

    # 覆盖 get_db 依赖
    app.dependency_overrides[get_db] = _get_test_db

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

    # 清理依赖覆盖
    app.dependency_overrides.pop(get_db, None)


@pytest_asyncio.fixture
async def admin_user(db_session):
    """创建一个管理员用户并返回其信息"""
    import bcrypt

    password_hash = bcrypt.hashpw("admin123".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    admin = User(
        email="admin@test.com",
        username="admin",
        nickname="管理员",
        password=password_hash,
        role="admin",
        is_active=True,
    )
    db_session.add(admin)
    await db_session.flush()
    await db_session.refresh(admin)

    return {
        "id": admin.id,
        "email": "admin@test.com",
        "username": "admin",
        "nickname": "管理员",
        "password": "admin123",
    }


@pytest_asyncio.fixture
async def normal_user(db_session):
    """创建一个普通用户并返回其信息"""
    import bcrypt

    password_hash = bcrypt.hashpw("user123".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    user = User(
        email="user@test.com",
        username="testuser",
        nickname="测试用户",
        password=password_hash,
        role="user",
        is_active=True,
    )
    db_session.add(user)
    await db_session.flush()
    await db_session.refresh(user)

    return {
        "id": user.id,
        "email": "user@test.com",
        "username": "testuser",
        "nickname": "测试用户",
        "password": "user123",
    }


@pytest_asyncio.fixture
async def test_app(db_session):
    """创建一个测试应用"""
    test_app = App(
        app_id="test_app_123",
        secret="test_secret_key_12345678901234567890123456",
        name="测试应用",
        domains="localhost,127.0.0.1",
        is_active=True,
    )
    db_session.add(test_app)
    await db_session.flush()
    await db_session.refresh(test_app)

    return {
        "id": test_app.id,
        "app_id": "test_app_123",
        "secret": "test_secret_key_12345678901234567890123456",
        "name": "测试应用",
    }
