from typing import Any

import jwt
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.database import engine
from app.core.responses import error_json


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="QuickFundX API",
        version="1.0.0",
        docs_url=f"{settings.api_v1_prefix}/docs",
        openapi_url=f"{settings.api_v1_prefix}/openapi.json",
        redoc_url=f"{settings.api_v1_prefix}/redoc",
    )

    limiter = Limiter(key_func=get_remote_address, default_limits=[])
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore[arg-type]
    app.add_middleware(SlowAPIMiddleware)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list(),
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(_: Request, exc: StarletteHTTPException) -> JSONResponse:
        detail = exc.detail
        if isinstance(detail, dict) and "code" in detail:
            return error_json(
                code=str(detail.get("code", "HTTP_ERROR")),
                message=str(detail.get("message", "Request failed")),
                fields=detail.get("fields") if isinstance(detail.get("fields"), dict) else None,
                status_code=exc.status_code,
            )
        if isinstance(detail, str):
            return error_json(code="HTTP_ERROR", message=detail, status_code=exc.status_code)
        return error_json(code="HTTP_ERROR", message="Request failed", status_code=exc.status_code)

    @app.exception_handler(RequestValidationError)
    async def validation_handler(_: Request, exc: RequestValidationError) -> JSONResponse:
        fields: dict[str, list[str]] = {}
        for err in exc.errors():
            loc = ".".join(str(x) for x in err.get("loc", ()) if x != "body")
            key = loc or "body"
            fields.setdefault(key, []).append(err.get("msg", "Invalid value"))
        return error_json(
            code="VALIDATION_ERROR",
            message="Request validation failed",
            fields=fields,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    @app.exception_handler(SQLAlchemyError)
    async def sqlalchemy_handler(_: Request, __: SQLAlchemyError) -> JSONResponse:
        return error_json(
            code="DATABASE_ERROR",
            message="A database error occurred",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    @app.exception_handler(jwt.PyJWTError)
    async def jwt_handler(_: Request, __: jwt.PyJWTError) -> JSONResponse:
        return error_json(
            code="INVALID_TOKEN",
            message="Token is invalid or expired",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )

    @app.get("/health", tags=["ops"])
    async def health() -> dict[str, Any]:
        return {"status": "ok"}

    @app.get("/ready", tags=["ops"])
    async def ready() -> JSONResponse:
        errors: list[str] = []
        try:
            async with engine.connect() as conn:
                await conn.execute(text("SELECT 1"))
        except Exception:
            errors.append("database_unavailable")
        try:
            import redis.asyncio as redis

            client = redis.from_url(settings.redis_url, decode_responses=True)
            await client.ping()
            await client.aclose()
        except Exception:
            errors.append("redis_unavailable")
        if errors:
            return JSONResponse(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                content={"success": False, "error": {"code": "NOT_READY", "message": ",".join(errors)}},
            )
        return JSONResponse(content={"success": True, "data": {"status": "ready"}})

    app.include_router(api_router, prefix=settings.api_v1_prefix)

    return app


app = create_app()
