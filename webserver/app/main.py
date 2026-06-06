import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager

from webserver.app.config import settings
from webserver.app.database import engine, Base
from webserver.app.routers.install import SETUP_FLAG_FILE


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 只有在已安装的情况下，才尝试创建表，避免在安装前自动生成 SQLite db
    if os.path.exists(SETUP_FLAG_FILE):
        try:
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
        except Exception:
            pass
    yield
    await engine.dispose()


app = FastAPI(
    title="Chapter Comments Platform API",
    version="1.0.0",
    lifespan=lifespan,
)

@app.middleware("http")
async def check_install_middleware(request: Request, call_next):
    # 允许的路径，不需要检查安装状态
    allowed_paths = [
        "/api/install/status",
        "/api/install/setup",
        "/api/install/test-db",
        "/health",
        "/docs",
        "/openapi.json"
    ]
    
    path = request.url.path
    if path.startswith("/api/") and path not in allowed_paths:
        if not os.path.exists(SETUP_FLAG_FILE):
            return JSONResponse(
                status_code=403,
                content={"err": "error", "message": "System not installed"}
            )
            
    response = await call_next(request)
    return response

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=settings.cors_allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from webserver.app.routers import auth, admin, platform, user, install

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(platform.router)
app.include_router(user.router)
app.include_router(install.router)


# Global error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"err": "error", "message": "Internal Server Error"},
    )


# Health check
@app.get("/health")
async def health_check():
    return {"status": "ok"}
