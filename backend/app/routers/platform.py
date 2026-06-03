from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime

from app.database import get_db
from app.models import User, App, Comment, ThirdPartyUser
from app.dependencies import get_current_user, CurrentUser
from app.utils.jwt import create_access_token, decode_access_token
from app.utils.sanitize import sanitize_html
from app.utils.proxy_auth import verify_proxy_signature
from app.config import settings
from app.schemas import ApiResponse

router = APIRouter(prefix="/api/platform", tags=["platform"])


@router.get("/comments")
async def get_comments(
    appId: str,
    chapterId: int = 0,
    bookId: int = 0,
    cfi: str = "",
    page: int = 1,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
):
    app_result = await db.execute(select(App).where(App.app_id == appId))
    app = app_result.scalar_one_or_none()

    if not app or not app.is_active:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "应用不存在或已禁用"})

    offset = (page - 1) * limit

    query = select(Comment).where(Comment.app_id == app.id)

    if chapterId:
        query = query.where(Comment.chapter_id == chapterId)
    if bookId:
        query = query.where(Comment.book_id == bookId)
    if cfi:
        query = query.where(Comment.cfi == cfi)

    total_result = await db.execute(select(func.count()).select_from(query.subquery()))
    total = total_result.scalar() or 0
    total_pages = (total + limit - 1) // limit if total else 0

    query = query.order_by(Comment.created_at.asc()).offset(offset).limit(limit)
    comments_result = await db.execute(query)
    comments = comments_result.scalars().all()

    return ApiResponse(
        data={
            "list": [
                {
                    "id": comment.id,
                    "bookId": comment.book_id,
                    "chapterId": comment.chapter_id,
                    "segmentId": comment.segment_id,
                    "cfi": comment.cfi,
                    "cfiBase": comment.cfi_base,
                    "type": comment.type,
                    "level": comment.level,
                    "content": comment.content,
                    "createdAt": comment.created_at.isoformat() if comment.created_at else "",
                    "userId": comment.user_id,
                    "rootId": comment.root_id,
                    "quoteId": comment.quote_id,
                    "likeCount": comment.like_count,
                    "dislikeCount": comment.dislike_count,
                }
                for comment in comments
            ],
            "pagination": {"total": total, "page": page, "limit": limit, "totalPages": total_pages},
        }
    )


@router.post("/comments")
async def create_comment(
    body: dict,
    db: AsyncSession = Depends(get_db),
):
    app_id = body.get("appId", "").strip()
    token = body.get("token", "").strip()
    book_id = body.get("bookId", 0)
    chapter_id = body.get("chapterId", 0)
    segment_id = body.get("segmentId", 0)
    cfi = body.get("cfi", "").strip()
    cfi_base = body.get("cfiBase", "").strip()
    content = body.get("content", "").strip()
    comment_type = body.get("type", 0)
    level = body.get("level", 0)
    root_id = body.get("rootId")
    quote_id = body.get("quoteId")
    geo = body.get("geo", "")

    if not app_id or not token or not content:
        return JSONResponse(status_code=400, content={"err": "error", "statusMessage": "必填字段不能为空"})

    app_result = await db.execute(select(App).where(App.app_id == app_id))
    app = app_result.scalar_one_or_none()

    if not app or not app.is_active:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "应用不存在或已禁用"})

    payload = decode_access_token(token)
    if not payload:
        return JSONResponse(status_code=401, content={"err": "error", "statusMessage": "Token 无效或已过期"})

    user_id = payload.get("userId")
    if not user_id:
        return JSONResponse(status_code=401, content={"err": "error", "statusMessage": "Token 无效"})

    user_result = await db.execute(select(User).where(User.id == user_id))
    user = user_result.scalar_one_or_none()

    if not user or not user.is_active:
        return JSONResponse(status_code=403, content={"err": "error", "statusMessage": "用户不存在或已被禁用"})

    sanitized_content = sanitize_html(content)

    new_comment = Comment(
        app_id=app.id,
        book_id=book_id,
        chapter_id=chapter_id,
        segment_id=segment_id,
        cfi=cfi,
        cfi_base=cfi_base,
        type=comment_type,
        level=level,
        content=sanitized_content,
        user_id=user_id,
        root_id=root_id,
        quote_id=quote_id,
        geo=geo,
    )
    db.add(new_comment)
    await db.flush()

    return ApiResponse(
        data={
            "id": new_comment.id,
            "content": new_comment.content,
            "createdAt": new_comment.created_at.isoformat() if new_comment.created_at else "",
        }
    )


@router.post("/proxy-login")
async def proxy_login(
    body: dict,
    db: AsyncSession = Depends(get_db),
):
    app_id = body.get("appId", "").strip()
    external_id = body.get("externalId", "").strip()
    external_email = body.get("externalEmail", "").strip()
    external_nick = body.get("externalNick", "").strip()
    timestamp = body.get("timestamp", "").strip()
    nonce = body.get("nonce", "").strip()
    signature = body.get("signature", "").strip()

    if not app_id or not external_id or not signature:
        return JSONResponse(status_code=400, content={"err": "error", "statusMessage": "必填字段不能为空"})

    app_result = await db.execute(select(App).where(App.app_id == app_id))
    app = app_result.scalar_one_or_none()

    if not app or not app.is_active:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "应用不存在或已禁用"})

    if not verify_proxy_signature(app_id, timestamp, nonce, signature, app.secret):
        return JSONResponse(status_code=401, content={"err": "error", "statusMessage": "签名验证失败"})

    try:
        ts = int(timestamp)
        if abs(datetime.utcnow().timestamp() - ts) > 300:
            return JSONResponse(status_code=401, content={"err": "error", "statusMessage": "请求已过期"})
    except ValueError:
        return JSONResponse(status_code=400, content={"err": "error", "statusMessage": "时间戳格式错误"})

    tp_result = await db.execute(
        select(ThirdPartyUser).where(
            ThirdPartyUser.app_id == app.id,
            ThirdPartyUser.external_id == external_id,
        )
    )
    tp_user = tp_result.scalar_one_or_none()

    if tp_user:
        internal_user_id = tp_user.internal_user_id
        tp_user.last_login_at = datetime.utcnow()
        await db.flush()
    else:
        username = external_id.lower()
        email = external_email or f"{external_id}@proxy.local"

        user_result = await db.execute(select(User).where(User.username == username))
        user = user_result.scalar_one_or_none()

        if not user:
            user = User(
                email=email,
                username=username,
                nickname=external_nick or external_id,
                password="",
                role="user",
                is_active=True,
            )
            db.add(user)
            await db.flush()

        tp_user = ThirdPartyUser(
            app_id=app.id,
            external_id=external_id,
            external_email=external_email or None,
            external_nick=external_nick or None,
            internal_user_id=user.id,
        )
        db.add(tp_user)
        await db.flush()

        internal_user_id = user.id

    user_result = await db.execute(select(User).where(User.id == internal_user_id))
    internal_user = user_result.scalar_one_or_none()

    if not internal_user:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "用户不存在"})

    token = create_access_token(
        data={"userId": internal_user.id, "email": internal_user.email, "role": internal_user.role}
    )

    return ApiResponse(
        data={
            "token": token,
            "user": {
                "id": internal_user.id,
                "email": internal_user.email,
                "username": internal_user.username,
                "nickname": internal_user.nickname,
                "role": internal_user.role,
                "avatar": internal_user.avatar,
            },
        }
    )
