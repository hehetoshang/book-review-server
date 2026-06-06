import os
import secrets
from pathlib import Path

import bcrypt
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from sqlalchemy import select, func, text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

from app.database import Base
from app.models import User, App
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
async def get_setup_status():
    if os.path.exists(SETUP_FLAG_FILE):
        return ApiResponse(data={"isInstalled": True, "is_setup": True})
    return ApiResponse(data={"isInstalled": False, "is_setup": False})


def _build_db_url(db_type: str, host: str, port: int, user: str, password: str, database: str) -> str:
    """构建数据库连接 URL"""
    import urllib.parse
    encoded_password = urllib.parse.quote_plus(password)
    if db_type == "mysql":
        return f"mysql+aiomysql://{user}:{encoded_password}@{host}:{port}/{database}"
    elif db_type == "postgresql":
        return f"postgresql+asyncpg://{user}:{encoded_password}@{host}:{port}/{database}"
    elif db_type == "sqlite":
        return "sqlite+aiosqlite:///./data/chapter_comments.db"
    return ""


@router.post("/test-db")
async def test_database(body: dict):
    """测试数据库连接"""
    db_type = str(body.get("type", "")).strip().lower()
    host = str(body.get("host", "")).strip()
    port = body.get("port", 0)
    user = str(body.get("user", "")).strip()
    password = str(body.get("password", ""))
    database = str(body.get("database", "")).strip()

    if db_type not in DB_DRIVERS:
        return JSONResponse(status_code=400, content={"err": "error", "message": "不支持的数据库类型"})

    if db_type == "sqlite":
        return JSONResponse(status_code=400, content={"err": "error", "message": "SQLite 无需测试连接"})

    if not host or not database:
        return JSONResponse(status_code=400, content={"err": "error", "message": "请填写完整信息"})

    if not isinstance(port, int) or port <= 0 or port > 65535:
        return JSONResponse(status_code=400, content={"err": "error", "message": "端口号无效"})

    db_url = _build_db_url(db_type, host, port, user, password, database)

    try:
        # 创建临时引擎测试连接
        engine = create_async_engine(db_url, echo=False)
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        await engine.dispose()
        return ApiResponse(data={"message": "连接成功"})
    except Exception as e:
        return JSONResponse(status_code=400, content={"err": "error", "message": f"连接失败: {str(e)}"})


@router.post("/setup", response_model=ApiResponse[dict])
async def setup(body: dict):
    # 检查是否已安装
    if os.path.exists(SETUP_FLAG_FILE):
        return JSONResponse(status_code=400, content={"err": "error", "message": "系统已初始化"})

    email = str(body.get("email", "")).strip().lower()
    username = str(body.get("username", "")).strip().lower()
    nickname = str(body.get("nickname", "")).strip()
    password = str(body.get("password", ""))
    database_type = str(body.get("databaseType", "sqlite")).strip().lower()
    database_url = str(body.get("databaseUrl", ""))

    if not email or not username or not password:
        return JSONResponse(status_code=400, content={"err": "error", "message": "必填字段不能为空"})

    if len(password) < 6:
        return JSONResponse(status_code=400, content={"err": "error", "message": "密码至少需要6位"})

    if database_type not in DB_DRIVERS:
        return JSONResponse(status_code=400, content={"err": "error", "message": "不支持的数据库类型"})

    # 构建数据库 URL
    if database_type == "sqlite":
        # 确保数据目录存在
        data_dir = Path("data")
        data_dir.mkdir(exist_ok=True)
        database_url = "sqlite+aiosqlite:///./data/chapter_comments.db"
    elif not database_url:
        return JSONResponse(status_code=400, content={"err": "error", "message": "数据库连接信息不完整"})

    # 为目标数据库创建表
    target_engine = create_async_engine(database_url, echo=False)
    try:
        async with target_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

        # 在目标数据库中创建管理员
        target_session_factory = async_sessionmaker(
            target_engine,
            class_=AsyncSession,
            expire_on_commit=False,
        )

        async with target_session_factory() as session:
            async with session.begin():
                # 检查是否已有管理员
                admin_result = await session.execute(
                    select(func.count(User.id)).where(User.role == "admin")
                )
                admin_count = admin_result.scalar()

                if admin_count > 0:
                    return JSONResponse(status_code=400, content={"err": "error", "message": "系统已初始化"})

                hashed_password = bcrypt.hashpw(
                    password.encode("utf-8"), bcrypt.gensalt()
                ).decode("utf-8")

                admin_user = User(
                    email=email,
                    username=username,
                    nickname=nickname or username,
                    password=hashed_password,
                    role="admin",
                    is_active=True,
                )
                session.add(admin_user)
                await session.flush()
                admin_id = admin_user.id

                # 创建默认应用
                app_id_str = f"app_{secrets.token_hex(4)}"
                app_secret = secrets.token_hex(16)
                site_name = str(body.get("siteName", "默认应用")).strip() or "默认应用"
                
                default_app = App(
                    app_id=app_id_str,
                    secret=app_secret,
                    name=site_name,
                    domains="",
                    is_active=True,
                )
                session.add(default_app)
                await session.flush()

        # 生成 JWT Secret
        jwt_secret = secrets.token_urlsafe(32)

        # 写入 .env 文件
        env_content = ENV_TEMPLATE.format(
            db_type=database_type,
            db_url=database_url,
            jwt_secret=jwt_secret,
        )
        with open(ENV_FILE, "w") as f:
            f.write(env_content)

        # 写入安装标志文件
        with open(SETUP_FLAG_FILE, "w") as f:
            f.write("setup complete")

        return ApiResponse(
            data={
                "message": "初始化成功",
                "admin_id": admin_id,
                "appId": app_id_str,
                "databaseType": database_type,
                "envFile": ENV_FILE,
            }
        )
    except Exception:
        # 如果出错，清理已写入的标志文件
        if os.path.exists(SETUP_FLAG_FILE):
            os.remove(SETUP_FLAG_FILE)
        raise
    finally:
        await target_engine.dispose()