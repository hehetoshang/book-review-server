import os
from pathlib import Path
from pydantic_settings import BaseSettings
from typing import List

# 项目根目录（backend/ 目录的上级）
BACKEND_DIR = Path(__file__).resolve().parent.parent
PROJECT_ROOT = BACKEND_DIR.parent
DATA_DIR = PROJECT_ROOT / "data"


class Settings(BaseSettings):
    jwt_secret: str = "your-jwt-secret-change-in-production"
    jwt_expires_in: str = "7d"
    proxy_token_ttl: int = 300
    rate_limit_per_minute: int = 5
    node_env: str = "development"

    database_type: str = "sqlite"  # sqlite, mysql, postgresql
    database_url: str = ""

    cors_origins: List[str] = ["*"]
    cors_allow_credentials: bool = True

    host: str = "0.0.0.0"
    port: int = 8000

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # 如果 database_url 未设置，根据 database_type 生成默认值
        if not self.database_url:
            if self.database_type == "sqlite":
                DATA_DIR.mkdir(exist_ok=True)
                db_path = DATA_DIR / "chapter_comments.db"
                self.database_url = f"sqlite+aiosqlite:///{db_path}"
            elif self.database_type == "mysql":
                self.database_url = "mysql+aiomysql://root:password@localhost:3306/chapter_comments"
            elif self.database_type == "postgresql":
                self.database_url = "postgresql+asyncpg://postgres:password@localhost:5432/chapter_comments"

    @property
    def jwt_expires_seconds(self) -> int:
        """Parse jwt_expires_in to seconds. Supports formats like '7d', '24h', '3600'."""
        try:
            expires = self.jwt_expires_in
            if expires.endswith("d"):
                return int(expires[:-1]) * 24 * 60 * 60
            elif expires.endswith("h"):
                return int(expires[:-1]) * 60 * 60
            elif expires.endswith("m"):
                return int(expires[:-1]) * 60
            else:
                return int(expires)
        except (ValueError, AttributeError):
            return 7 * 24 * 60 * 60  # Default: 7 days

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
