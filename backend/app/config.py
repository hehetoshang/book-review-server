from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    jwt_secret: str = "your-jwt-secret-change-in-production"
    jwt_expires_in: str = "7d"
    proxy_token_ttl: int = 300
    rate_limit_per_minute: int = 5
    node_env: str = "development"

    database_url: str = "sqlite:///./dev.db"

    cors_origins: List[str] = ["*"]
    cors_allow_credentials: bool = True

    host: str = "0.0.0.0"
    port: int = 8000

    @property
    def jwt_expires_seconds(self) -> int:
        """Parse jwt_expires_in to seconds. Supports formats like '7d', '24h', '3600'."""
        expires = self.jwt_expires_in
        if expires.endswith("d"):
            return int(expires[:-1]) * 24 * 60 * 60
        elif expires.endswith("h"):
            return int(expires[:-1]) * 60 * 60
        elif expires.endswith("m"):
            return int(expires[:-1]) * 60
        else:
            return int(expires)

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
