from typing import Generic, TypeVar, Optional
from pydantic import BaseModel

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    err: str = "ok"
    data: Optional[T] = None
    message: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    nickname: str
    role: str
    avatar: Optional[str] = None


class LoginResponse(BaseModel):
    token: str
    user: UserResponse


class AppResponse(BaseModel):
    id: int
    app_id: str
    name: str
    domains: str
    is_active: bool
    created_at: str
    updated_at: str


class CommentResponse(BaseModel):
    id: int
    app_id: int
    book_id: int
    chapter_id: int
    segment_id: int
    cfi: str
    cfi_base: str
    type: int
    level: int
    content: str
    created_at: str
    updated_at: str
    geo: str
    user_id: int
    root_id: Optional[int] = None
    quote_id: Optional[int] = None
    like_count: int = 0
    dislike_count: int = 0


class PaginationResponse(BaseModel):
    total: int
    page: int
    page_size: int
    items: list


class StatsResponse(BaseModel):
    total_users: int
    total_apps: int
    total_comments: int
    active_apps: int
    active_users: int
