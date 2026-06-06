import uvicorn
from webserver.app.config import settings

if __name__ == "__main__":
    uvicorn.run(
        "webserver.app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.node_env == "development",
    )
