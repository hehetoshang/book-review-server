import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from passlib.context import CryptContext
from webserver.app.database import engine, Base, async_session_factory
from webserver.app.models import User, App, ReviewBook, ReviewChapter

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as session:
        # Create admin user
        admin = User(
            email="admin@example.com",
            username="admin",
            nickname="Admin",
            password=pwd_context.hash("admin123"),
            role="admin",
            is_active=True,
        )
        session.add(admin)

        # Create test user
        test_user = User(
            email="test@example.com",
            username="testuser",
            nickname="Test User",
            password=pwd_context.hash("test123"),
            role="user",
            is_active=True,
        )
        session.add(test_user)

        # Create test app
        test_app = App(
            app_id="test-app-001",
            secret="test-secret-change-in-production",
            name="Test Application",
            domains="*",
            is_active=True,
        )
        session.add(test_app)

        # Create sample books and chapters
        book1 = ReviewBook(title="Sample Book 1", alias="sample-book-1")
        session.add(book1)
        await session.flush()

        chapter1 = ReviewChapter(
            book_id=book1.id,
            title="Chapter 1",
            alias="chapter-1",
            parents="",
        )
        session.add(chapter1)

        await session.commit()

    print("Seed data created successfully!")


if __name__ == "__main__":
    asyncio.run(seed())
