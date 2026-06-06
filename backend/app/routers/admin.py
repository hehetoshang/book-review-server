from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
import secrets

from app.database import get_db
from app.models import User, App, Comment
from app.dependencies import require_admin
from app.schemas import ApiResponse

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.get("/stats")
async def get_stats(
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    from datetime import datetime, timedelta, timezone

    total_users_result = await db.execute(select(func.count(User.id)))
    total_users = total_users_result.scalar()

    total_apps_result = await db.execute(select(func.count(App.id)))
    total_apps = total_apps_result.scalar()

    total_comments_result = await db.execute(select(func.count(Comment.id)))
    total_comments = total_comments_result.scalar()

    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    today_comments_result = await db.execute(
        select(func.count(Comment.id)).where(Comment.created_at >= today_start)
    )
    today_comments = today_comments_result.scalar()

    return ApiResponse(
        data={
            "appCount": total_apps or 0,
            "commentCount": total_comments or 0,
            "todayComments": today_comments or 0,
            "userCount": total_users or 0,
        }
    )


@router.get("/apps")
async def get_apps(
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    offset = (page - 1) * limit

    total_result = await db.execute(select(func.count(App.id)))
    total = total_result.scalar()

    apps_result = await db.execute(
        select(App).order_by(App.created_at.desc()).offset(offset).limit(limit)
    )
    apps = apps_result.scalars().all()

    return ApiResponse(
        data={
            "list": [
                {
                    "id": app.id,
                    "appId": app.app_id,
                    "name": app.name,
                    "domains": app.domains,
                    "isActive": app.is_active,
                    "createdAt": app.created_at.isoformat() if app.created_at else "",
                    "updatedAt": app.updated_at.isoformat() if app.updated_at else "",
                }
                for app in apps
            ],
            "pagination": {"total": total or 0, "page": page, "limit": limit},
        }
    )


@router.get("/apps/{app_id}")
async def get_app(
    app_id: int,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    result = await db.execute(select(App).where(App.id == app_id))
    app = result.scalar_one_or_none()

    if not app:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "应用不存在"})

    return ApiResponse(
        data={
            "id": app.id,
            "appId": app.app_id,
            "name": app.name,
            "domains": app.domains,
            "isActive": app.is_active,
            "createdAt": app.created_at.isoformat() if app.created_at else "",
            "updatedAt": app.updated_at.isoformat() if app.updated_at else "",
        }
    )


@router.post("/apps")
async def create_app(
    body: dict,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    name = body.get("name", "").strip()
    domains = body.get("domains", "").strip()

    if not name:
        return JSONResponse(status_code=400, content={"err": "error", "statusMessage": "应用名称不能为空"})

    generated_app_id = secrets.token_urlsafe(16)
    secret = secrets.token_urlsafe(32)

    new_app = App(
        app_id=generated_app_id,
        secret=secret,
        name=name,
        domains=domains,
        is_active=True,
    )
    db.add(new_app)
    await db.flush()

    return ApiResponse(
        data={
            "id": new_app.id,
            "appId": new_app.app_id,
            "secret": new_app.secret,
            "name": new_app.name,
            "domains": new_app.domains,
            "isActive": new_app.is_active,
        }
    )


@router.put("/apps/{app_id}")
async def update_app(
    app_id: int,
    body: dict,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    result = await db.execute(select(App).where(App.id == app_id))
    app = result.scalar_one_or_none()

    if not app:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "应用不存在"})

    if "name" in body:
        app.name = body["name"].strip()
    if "domains" in body:
        app.domains = body["domains"].strip()
    if "isActive" in body:
        app.is_active = body["isActive"]

    await db.flush()

    return ApiResponse(
        data={
            "id": app.id,
            "appId": app.app_id,
            "name": app.name,
            "domains": app.domains,
            "isActive": app.is_active,
        }
    )


@router.get("/apps/{app_id}/secret")
async def get_app_secret(
    app_id: int,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    result = await db.execute(select(App).where(App.id == app_id))
    app = result.scalar_one_or_none()

    if not app:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "应用不存在"})

    return ApiResponse(data={"secret": app.secret})


@router.post("/apps/{app_id}/reset-secret")
async def reset_app_secret(
    app_id: int,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    result = await db.execute(select(App).where(App.id == app_id))
    app = result.scalar_one_or_none()

    if not app:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "应用不存在"})

    app.secret = secrets.token_urlsafe(32)
    await db.flush()

    return ApiResponse(data={"secret": app.secret})


@router.get("/users")
async def get_users(
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    offset = (page - 1) * limit

    total_result = await db.execute(select(func.count(User.id)))
    total = total_result.scalar()

    users_result = await db.execute(
        select(User).order_by(User.created_at.desc()).offset(offset).limit(limit)
    )
    users = users_result.scalars().all()

    return ApiResponse(
        data={
            "list": [
                {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "nickname": user.nickname,
                    "role": user.role,
                    "isActive": user.is_active,
                    "avatar": user.avatar,
                    "createdAt": user.created_at.isoformat() if user.created_at else "",
                }
                for user in users
            ],
            "pagination": {"total": total or 0, "page": page, "limit": limit},
        }
    )


@router.get("/users/{user_id}")
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "用户不存在"})

    return ApiResponse(
        data={
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "nickname": user.nickname,
            "role": user.role,
            "isActive": user.is_active,
            "avatar": user.avatar,
        }
    )


@router.put("/users/{user_id}")
async def update_user(
    user_id: int,
    body: dict,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "用户不存在"})

    if "nickname" in body:
        user.nickname = body["nickname"].strip()
    if "role" in body:
        user.role = body["role"]
    if "isActive" in body:
        user.is_active = body["isActive"]

    await db.flush()

    return ApiResponse(
        data={
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "nickname": user.nickname,
            "role": user.role,
            "isActive": user.is_active,
        }
    )


@router.get("/comments")
async def get_comments(
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    offset = (page - 1) * limit

    total_result = await db.execute(select(func.count(Comment.id)))
    total = total_result.scalar()

    comments_result = await db.execute(
        select(Comment).options(selectinload(Comment.user)).order_by(Comment.created_at.desc()).offset(offset).limit(limit)
    )
    comments = comments_result.scalars().all()

    return ApiResponse(
        data={
            "list": [
                {
                    "id": comment.id,
                    "appId": comment.app_id,
                    "bookId": comment.book_id,
                    "chapterId": comment.chapter_id,
                    "content": comment.content,
                    "createdAt": comment.created_at.isoformat() if comment.created_at else "",
                    "userId": comment.user_id,
                    "rootId": comment.root_id,
                    "quoteId": comment.quote_id,
                    "nickname": comment.user.nickname if comment.user else "",
                }
                for comment in comments
            ],
            "pagination": {"total": total or 0, "page": page, "limit": limit},
        }
    )


@router.delete("/comments/{comment_id}")
async def delete_comment(
    comment_id: int,
    db: AsyncSession = Depends(get_db),
    _admin=Depends(require_admin),
):
    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    comment = result.scalar_one_or_none()

    if not comment:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "评论不存在"})

    await db.delete(comment)
    await db.flush()

    return ApiResponse(data={"message": "评论已删除"})
