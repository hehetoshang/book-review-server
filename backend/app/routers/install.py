import os
import bcrypt
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import get_db
from app.models import User
from app.config import settings
from app.schemas import ApiResponse

router = APIRouter(prefix="/api/install", tags=["install"])

SETUP_FLAG_FILE = ".setup_complete"


@router.get("/status", response_model=ApiResponse[dict])
async def get_setup_status(db: AsyncSession = Depends(get_db)):
    # Check if there's an admin user
    admin_result = await db.execute(
        select(func.count(User.id)).where(User.role == "admin")
    )
    admin_count = admin_result.scalar()

    is_setup = admin_count > 0 or os.path.exists(SETUP_FLAG_FILE)

    return ApiResponse(data={"is_setup": is_setup})


@router.post("/setup", response_model=ApiResponse[dict])
async def setup(body: dict, db: AsyncSession = Depends(get_db)):
    # Check if already setup
    admin_result = await db.execute(
        select(func.count(User.id)).where(User.role == "admin")
    )
    admin_count = admin_result.scalar()

    if admin_count > 0:
        return JSONResponse(status_code=400, content={"err": "error", "message": "系统已初始化"})

    email = body.get("email", "").strip().lower()
    username = body.get("username", "").strip().lower()
    nickname = body.get("nickname", "").strip()
    password = body.get("password", "")

    if not email or not username or not password:
        return JSONResponse(status_code=400, content={"err": "error", "message": "必填字段不能为空"})

    if len(password) < 6:
        return JSONResponse(status_code=400, content={"err": "error", "message": "密码至少需要6位"})

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    admin_user = User(
        email=email,
        username=username,
        nickname=nickname or username,
        password=hashed_password,
        role="admin",
        is_active=True,
    )
    db.add(admin_user)
    await db.flush()

    # Create setup flag file
    with open(SETUP_FLAG_FILE, "w") as f:
        f.write("setup complete")

    return ApiResponse(data={"message": "初始化成功", "admin_id": admin_user.id})
