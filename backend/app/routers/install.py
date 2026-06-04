import os
import asyncio
import bcrypt
from pathlib import Path
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy import select, func

from app.database import get_db
from app.models import User
from app.config import settings, DATA_DIR
from app.schemas import ApiResponse

router = APIRouter(prefix="/api/install", tags=["install"])

SETUP_FLAG_FILE = ".setup_complete"
ENV_FILE = ".env"

# 数据库类型对应的驱动映射
DB_DRIVERS = {
    "sqlite": "sqlite+aiosqlite",
    "mysql": "mysql+aiomysql",
    "postgresql": "postgresql+asyncpg",
}

ENV_TEMPLATE = """# 数据库配置
DATABASE_TYPE="{db_type}"
DATABASE_URL="{db_url}"

# JWT 配置
JWT_SECRET="{jwt_secret}"
JWT_EXPIRES_IN="7d"

# 服务器配置
NODE_ENV="production"
HOST="0.0.0.0"
PORT=8000

# CORS 配置（多个域名用逗号分隔）
CORS_ORIGINS="*"
"""


@router.get("/status", response_model=ApiResponse[dict])
async def get_setup_status(db: AsyncSession = Depends(get_db)):
    # Check if there's an admin user
    admin_result = await db.execute(
        select(func.count(User.id)).where(User.role == "admin")
    )
    admin_count = admin_result.scalar()

    is_setup = admin_count > 0 or os.path.exists(SETUP_FLAG_FILE)

    return ApiResponse(data={"is_setup": is_setup})


@router.post("/test-db")
async def test_database(body: dict):
    """测试数据库连接"""
    db_type = body.get("type", "").strip().lower()
    host = body.get("host", "").strip()
    port = body.get("port", 0)
    user = body.get("user", "").strip()
    password = body.get("password", "")
    database = body.get("database", "").strip()

    if db_type not in DB_DRIVERS:
        return JSONResponse(status_code=400, content={"err": "error", "message": "不支持的数据库类型"})

    if not host or not database:
        return JSONResponse(status_code=400, content={"err": "error", "message": "请填写完整信息"})

    # 构建数据库 URL
    if db_type == "mysql":
        db_url = f"mysql+aiomysql://{user}:{password}@{host}:{port}/{database}"
    elif db_type == "postgresql":
        db_url = f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{database}"
    else:
        return JSONResponse(status_code=400, content={"err": "error", "message": "SQLite 无需测试连接"})

    try:
        # 创建临时引擎测试连接
        engine = create_async_engine(db_url, echo=False)
        async with engine.connect() as conn:
            await conn.execute(func.now())
        await engine.dispose()
        return ApiResponse(data={"message": "连接成功"})
    except Exception as e:
        return JSONResponse(status_code=400, content={"err": "error", "message": f"连接失败: {str(e)}"})


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
    database_type = body.get("databaseType", "sqlite").strip().lower()
    database_url = body.get("databaseUrl", "")

    if not email or not username or not password:
        return JSONResponse(status_code=400, content={"err": "error", "message": "必填字段不能为空"})

    if len(password) < 6:
        return JSONResponse(status_code=400, content={"err": "error", "message": "密码至少需要6位"})

    if database_type not in DB_DRIVERS:
        return JSONResponse(status_code=400, content={"err": "error", "message": "不支持的数据库类型"})

    # 如果使用 SQLite，确保数据目录存在（使用绝对路径）
    if database_type == "sqlite":
        DATA_DIR.mkdir(exist_ok=True)
        database_url = f"sqlite+aiosqlite:///{DATA_DIR / 'chapter_comments.db'}"

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

    # 生成 JWT Secret
    import secrets
    jwt_secret = secrets.token_urlsafe(32)

    # 写入 .env 文件
    env_content = ENV_TEMPLATE.format(
        db_type=database_type,
        db_url=database_url,
        jwt_secret=jwt_secret,
    )
    with open(ENV_FILE, "w") as f:
        f.write(env_content)

    # Create setup flag file
    with open(SETUP_FLAG_FILE, "w") as f:
        f.write("setup complete")

    return ApiResponse(
        data={
            "message": "初始化成功",
            "admin_id": admin_user.id,
            "databaseType": database_type,
            "envFile": ENV_FILE,
        }
    )
