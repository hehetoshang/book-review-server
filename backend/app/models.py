from datetime import datetime
from typing import Optional

from sqlalchemy import Integer, String, Boolean, DateTime, Text, Index, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "readers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    nickname: Mapped[str] = mapped_column(String(255), nullable=False)
    avatar: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    role: Mapped[str] = mapped_column(String(50), nullable=False, default="user")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, name="isActive")
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
    access_time: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True, name="accessTime")
    last_read: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True, name="lastRead")
    permission: Mapped[str] = mapped_column(String(255), nullable=False, default="")

    comments: Mapped[list["Comment"]] = relationship("Comment", back_populates="user")
    third_parties: Mapped[list["ThirdPartyUser"]] = relationship("ThirdPartyUser", back_populates="internal_user")


class App(Base):
    __tablename__ = "apps"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    app_id: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, name="appId")
    secret: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    domains: Mapped[str] = mapped_column(Text, nullable=False, default="")
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True, name="isActive")
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    comments: Mapped[list["Comment"]] = relationship("Comment", back_populates="app")
    nonces: Mapped[list["Nonce"]] = relationship("Nonce", back_populates="app")
    third_parties: Mapped[list["ThirdPartyUser"]] = relationship("ThirdPartyUser", back_populates="app")


class ThirdPartyUser(Base):
    __tablename__ = "third_party_users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    app_id: Mapped[int] = mapped_column(Integer, ForeignKey("apps.id"), nullable=False)
    external_id: Mapped[str] = mapped_column(String(255), nullable=False, name="externalId")
    external_email: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, name="externalEmail")
    external_nick: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, name="externalNick")
    internal_user_id: Mapped[int] = mapped_column(Integer, ForeignKey("readers.id"), nullable=False, name="internalUserId")
    last_login_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now(), name="lastLoginAt")
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())

    app: Mapped["App"] = relationship("App", back_populates="third_parties")
    internal_user: Mapped["User"] = relationship("User", back_populates="third_parties")


class Nonce(Base):
    __tablename__ = "nonces"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    app_id: Mapped[int] = mapped_column(Integer, ForeignKey("apps.id"), nullable=False)
    nonce: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, name="expiresAt")
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())

    app: Mapped["App"] = relationship("App", back_populates="nonces")


class ReviewBook(Base):
    __tablename__ = "review_books"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    alias: Mapped[str] = mapped_column(String(255), nullable=False, default="")


class ReviewChapter(Base):
    __tablename__ = "review_chapters"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    book_id: Mapped[int] = mapped_column(Integer, nullable=False, default=0, name="bookId")
    title: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    alias: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    parents: Mapped[str] = mapped_column(Text, nullable=False, default="")


class Comment(Base):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    app_id: Mapped[int] = mapped_column(Integer, ForeignKey("apps.id"), nullable=False, default=0, name="appId")
    book_id: Mapped[int] = mapped_column(Integer, nullable=False, default=0, name="bookId")
    book_title: Mapped[str] = mapped_column(String(255), nullable=False, default="", name="bookTitle")
    chapter_id: Mapped[int] = mapped_column(Integer, nullable=False, default=0, name="chapterId")
    chapter_name: Mapped[str] = mapped_column(String(255), nullable=False, default="", name="chapterName")
    segment_id: Mapped[int] = mapped_column(Integer, nullable=False, default=0, name="segmentId")
    cfi: Mapped[str] = mapped_column(Text, nullable=False, default="")
    cfi_base: Mapped[str] = mapped_column(Text, nullable=False, default="", name="cfiBase")
    type: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    level: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    content: Mapped[str] = mapped_column(Text, nullable=False, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
    geo: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("readers.id"), nullable=False, name="userId")
    root_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, name="rootId")
    quote_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, name="quoteId")
    like_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0, name="likeCount")
    dislike_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0, name="dislikeCount")

    user: Mapped["User"] = relationship("User", back_populates="comments")
    app: Mapped[Optional["App"]] = relationship("App", back_populates="comments")
