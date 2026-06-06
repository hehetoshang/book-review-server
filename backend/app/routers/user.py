from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import get_db
from app.models import Comment
from app.dependencies import get_current_user, CurrentUser
from app.schemas import ApiResponse

router = APIRouter(prefix="/api/user", tags=["user"])


@router.get("/comments")
async def get_user_comments(
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
    current_user: CurrentUser = Depends(get_current_user),
):
    offset = (page - 1) * limit

    total_result = await db.execute(
        select(func.count(Comment.id)).where(Comment.user_id == current_user.user_id)
    )
    total = total_result.scalar()
    total_pages = (total + limit - 1) // limit if total else 0

    from sqlalchemy.orm import joinedload
    comments_result = await db.execute(
        select(Comment)
        .options(joinedload(Comment.app))
        .where(Comment.user_id == current_user.user_id)
        .order_by(Comment.created_at.desc())
        .offset(offset)
        .limit(limit)
    )
    comments = comments_result.scalars().all()

    return ApiResponse(
        data={
            "list": [
                {
                    "id": comment.id,
                    "appId": comment.app_id,
                    "appName": comment.app.name if comment.app else "",
                    "bookId": comment.book_id,
                    "bookTitle": comment.book_title,
                    "chapterId": comment.chapter_id,
                    "chapterName": comment.chapter_name,
                    "content": comment.content,
                    "createdAt": comment.created_at.isoformat() if comment.created_at else "",
                    "rootId": comment.root_id,
                    "quoteId": comment.quote_id,
                    "likeCount": comment.like_count,
                    "dislikeCount": comment.dislike_count,
                }
                for comment in comments
            ],
            "pagination": {"total": total or 0, "page": page, "limit": limit, "totalPages": total_pages},
        }
    )
