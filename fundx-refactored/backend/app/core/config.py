from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    environment: str = Field(default="development", alias="ENVIRONMENT")
    debug: bool = Field(default=False, alias="DEBUG")
    api_v1_prefix: str = Field(default="/api/v1", alias="API_V1_PREFIX")

    database_url: str = Field(..., alias="DATABASE_URL")
    redis_url: str = Field(default="redis://localhost:6379/0", alias="REDIS_URL")

    jwt_access_secret: str = Field(..., alias="JWT_ACCESS_SECRET", min_length=32)
    jwt_refresh_secret: str = Field(..., alias="JWT_REFRESH_SECRET", min_length=32)
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    jwt_access_expire_minutes: int = Field(default=15, alias="JWT_ACCESS_EXPIRE_MINUTES")
    jwt_refresh_expire_days: int = Field(default=7, alias="JWT_REFRESH_EXPIRE_DAYS")

    cors_origins: str = Field(
        default="http://localhost:5173",
        alias="CORS_ORIGINS",
        description="Comma-separated list of allowed origins",
    )

    rate_limit_public: int = Field(default=100, alias="RATE_LIMIT_PUBLIC")
    rate_limit_auth: int = Field(default=500, alias="RATE_LIMIT_AUTH")
    rate_limit_admin: int = Field(default=2000, alias="RATE_LIMIT_ADMIN")

    msg91_authkey: str | None = Field(default=None, alias="MSG91_AUTHKEY")
    razorpay_key_id: str | None = Field(default=None, alias="RAZORPAY_KEY_ID")
    razorpay_key_secret: str | None = Field(default=None, alias="RAZORPAY_KEY_SECRET")
    aws_access_key_id: str | None = Field(default=None, alias="AWS_ACCESS_KEY_ID")
    aws_secret_access_key: str | None = Field(default=None, alias="AWS_SECRET_ACCESS_KEY")
    aws_region: str = Field(default="ap-south-1", alias="AWS_REGION")
    s3_bucket_kyc: str | None = Field(default=None, alias="S3_BUCKET_KYC")
    kyc_local_storage_path: str = Field(default="./data/kyc_uploads", alias="KYC_LOCAL_STORAGE_PATH")
    testing: bool = Field(default=False, alias="TESTING")

    @field_validator("cors_origins", mode="before")
    @classmethod
    def split_origins(cls, v: str | list[str]) -> str:
        if isinstance(v, list):
            return ",".join(v)
        return v

    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
