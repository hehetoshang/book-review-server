from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timezone

from webserver.app.database import get_db
from webserver.app.models import User, App, Comment, ThirdPartyUser, Nonce
from webserver.app.dependencies import get_current_user, CurrentUser
from webserver.app.utils.jwt import create_access_token, decode_access_token
from webserver.app.utils.sanitize import sanitize_html
from webserver.app.utils.proxy_auth import verify_proxy_token
from webserver.app.config import settings
from webserver.app.schemas import ApiResponse

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

    from sqlalchemy.orm import joinedload
    query = query.options(joinedload(Comment.user))
    query = query.order_by(Comment.created_at.desc()).offset(offset).limit(limit)
    comments_result = await db.execute(query)
    comments = comments_result.scalars().all()

    return ApiResponse(
        data={
            "list": [
                {
                    "id": comment.id,
                    "bookId": comment.book_id,
                    "bookTitle": comment.book_title,
                    "chapterId": comment.chapter_id,
                    "chapterName": comment.chapter_name,
                    "segmentId": comment.segment_id,
                    "cfi": comment.cfi,
                    "cfiBase": comment.cfi_base,
                    "type": comment.type,
                    "level": comment.level,
                    "content": comment.content,
                    "createdAt": comment.created_at.isoformat() if comment.created_at else "",
                    "userId": comment.user_id,
                    "nickname": comment.user.nickname if comment.user else "",
                    "avatar": comment.user.avatar if comment.user else "",
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
    book_title = str(body.get("bookTitle", "")).strip()
    chapter_id = body.get("chapterId", 0)
    chapter_name = str(body.get("chapterName", "")).strip()
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
        book_title=book_title,
        chapter_id=chapter_id,
        chapter_name=chapter_name,
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
    proxy_token = body.get("proxyToken", "").strip()
    external_id = body.get("externalId", "").strip()
    external_email = body.get("externalEmail", "").strip()
    external_nick = body.get("externalNick", "").strip()

    if not app_id or not proxy_token or not external_id:
        return JSONResponse(status_code=400, content={"err": "error", "statusMessage": "必填字段不能为空"})

    app_result = await db.execute(select(App).where(App.app_id == app_id))
    app = app_result.scalar_one_or_none()

    if not app or not app.is_active:
        return JSONResponse(status_code=404, content={"err": "error", "statusMessage": "应用不存在或已禁用"})

    payload = verify_proxy_token(app.secret, proxy_token)
    if not payload:
        return JSONResponse(status_code=401, content={"err": "error", "statusMessage": "代理令牌无效或已过期"})

    nonce_val = payload.get("nonce")
    if not nonce_val:
        return JSONResponse(status_code=400, content={"err": "error", "statusMessage": "缺少nonce"})

    # Check nonce for replay protection
    nonce_result = await db.execute(select(Nonce).where(Nonce.nonce == nonce_val))
    if nonce_result.scalar_one_or_none():
        return JSONResponse(status_code=400, content={"err": "error", "statusMessage": "nonce已被使用"})

    # Store nonce with expiry
    ttl = int(settings.get("PROXY_TOKEN_TTL", 300))
    expires_at = datetime.fromtimestamp(datetime.now(timezone.utc).timestamp() + ttl, tz=timezone.utc)
    
    new_nonce = Nonce(
        app_id=app.id,
        nonce=nonce_val,
        expires_at=expires_at.replace(tzinfo=None)
    )
    db.add(new_nonce)
    await db.flush()

    tp_result = await db.execute(
        select(ThirdPartyUser).where(
            ThirdPartyUser.app_id == app.id,
            ThirdPartyUser.external_id == external_id,
        )
    )
    tp_user = tp_result.scalar_one_or_none()

    if tp_user:
        internal_user_id = tp_user.internal_user_id
        tp_user.last_login_at = datetime.now(timezone.utc).replace(tzinfo=None)
        await db.flush()
    else:
        import bcrypt
        import random
        import string
        
        username = external_id.lower()
        email = external_email or f"{external_id}@proxy.{app.app_id}.local"

        user_result = await db.execute(select(User).where(User.username == username))
        user = user_result.scalar_one_or_none()

        if not user:
            # Generate random password
            rand_pwd = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
            hashed_pwd = bcrypt.hashpw(rand_pwd.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            
            user = User(
                email=email,
                username=username,
                nickname=external_nick or external_id,
                password=hashed_pwd,
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
