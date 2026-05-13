"""Pytest configuration — set required env before importing the application."""

from __future__ import annotations

import os

os.environ.setdefault(
    "DATABASE_URL",
    "postgresql+asyncpg://qfx_user:qfx_dev_pass@127.0.0.1:5432/quickfundx_dev",
)
os.environ.setdefault(
    "JWT_ACCESS_SECRET",
    "test_jwt_access_secret_minimum_32_characters",
)
os.environ.setdefault(
    "JWT_REFRESH_SECRET",
    "test_jwt_refresh_secret_minimum_32_characters",
)
os.environ.setdefault("REDIS_URL", "redis://:redis_dev_pass@127.0.0.1:6379/0")
os.environ.setdefault("TESTING", "true")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:5173")

from app.core.config import get_settings

get_settings.cache_clear()
