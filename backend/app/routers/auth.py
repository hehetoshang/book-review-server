from fastapi import APIRouter, Depends, Response
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import bcrypt

from app.database import get_db
from app.models import User
from app.schemas import LoginResponse, UserResponse, ApiResponse
from app.dependencies import get_current_user, CurrentUser
from app.utils.jwt import create_access_token
from app.config import settings
from datetime import datetime, timezone

router = APIRouter(prefix="/api/auth", tags=["auth"])

def _hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def _verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


@router.post("/login", response_model=ApiResponse[LoginResponse])
async def login(body: dict, response: Response, db: AsyncSession = Depends(get_db)):
    account = body.get("account", "").strip()
    password = body.get("password", "")

    if not account or not password:
        return JSONResponse(
            status_code=400,
            content={"err": "error", "message": "账号和密码不能为空"},
        )

    user = None
    if "@" in account:
        result = await db.execute(select(User).where(User.email == account.lower()))
        user = result.scalar_one_or_none()
    else:
        result = await db.execute(select(User).where(User.username == account.lower()))
        user = result.scalar_one_or_none()

    if not user:
        return JSONResponse(
            status_code=401,
            content={"err": "error", "message": "账号或密码错误"},
        )

    if not _verify_password(password, user.password):
        return JSONResponse(
            status_code=401,
            content={"err": "error", "message": "账号或密码错误"},
        )

    if not user.is_active:
        return JSONResponse(
            status_code=403,
            content={"err": "error", "message": "账户已被禁用"},
        )

    user.access_time = datetime.now(timezone.utc)
    await db.flush()

    token = create_access_token(
        data={"userId": user.id, "email": user.email, "role": user.role}
    )

    response.set_cookie(
        key="auth_token",
        value=token,
        httponly=True,
        secure=settings.node_env == "production",
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
    )

    return ApiResponse(
        data=LoginResponse(
            token=token,
            user=UserResponse(
                id=user.id,
                email=user.email,
                username=user.username,
                nickname=user.nickname,
                role=user.role,
                avatar=user.avatar,
            ),
        )
    )


@router.post("/register", response_model=ApiResponse[dict])
async def register(body: dict, db: AsyncSession = Depends(get_db)):
    email = body.get("email", "").strip().lower()
    username = body.get("username", "").strip().lower()
    nickname = body.get("nickname", "").strip()
    password = body.get("password", "")

    if not email or not username or not password:
        return JSONResponse(
            status_code=400,
            content={"err": "error", "message": "必填字段不能为空"},
        )

    # Check if email or username already exists
    existing_email = await db.execute(select(User).where(User.email == email))
    if existing_email.scalar_one_or_none():
        return JSONResponse(
            status_code=400,
            content={"err": "error", "message": "邮箱已注册"},
        )

    existing_username = await db.execute(select(User).where(User.username == username))
    if existing_username.scalar_one_or_none():
        return JSONResponse(
            status_code=400,
            content={"err": "error", "message": "用户名已存在"},
        )

    hashed_password = _hash_password(password)

    new_user = User(
        email=email,
        username=username,
        nickname=nickname or username,
        password=hashed_password,
        role="user",
        is_active=True,
    )
    db.add(new_user)
    await db.flush()

    return ApiResponse(
        data={"id": new_user.id, "email": new_user.email, "username": new_user.username}
    )


@router.get("/me", response_model=ApiResponse[UserResponse])
async def get_me(current_user: CurrentUser = Depends(get_current_user)):
    user = current_user.user_obj
    if not user:
        return JSONResponse(
            status_code=404,
            content={"err": "error", "message": "用户不存在"},
        )

    return ApiResponse(
        data=UserResponse(
            id=user.id,
            email=user.email,
            username=user.username,
            nickname=user.nickname,
            role=user.role,
            avatar=user.avatar,
        )
    )


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="auth_token")
    return {"err": "ok"}


@router.put("/password", response_model=ApiResponse[dict])
async def change_password(
    body: dict,
    current_user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    old_password = body.get("oldPassword", "")
    new_password = body.get("newPassword", "")

    if not old_password or not new_password:
        return JSONResponse(
            status_code=400,
            content={"err": "error", "message": "旧密码和新密码不能为空"},
        )

    if len(new_password) < 6:
        return JSONResponse(
            status_code=400,
            content={"err": "error", "message": "新密码至少需要6位"},
        )

    user = current_user.user_obj
    if not user or not _verify_password(old_password, user.password):
        return JSONResponse(
            status_code=400,
            content={"err": "error", "message": "旧密码错误"},
        )

    user.password = _hash_password(new_password)
    await db.flush()

    return ApiResponse(data={"message": "密码修改成功"})
