from typing import Any

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse


def success_json(
    data: Any = None,
    *,
    message: str | None = None,
    pagination: dict[str, Any] | None = None,
    meta: dict[str, Any] | None = None,
    status_code: int = 200,
) -> JSONResponse:
    body: dict[str, Any] = {"success": True, "data": jsonable_encoder(data)}
    if message is not None:
        body["message"] = message
    if pagination is not None:
        body["pagination"] = pagination
    if meta is not None:
        body["meta"] = meta
    return JSONResponse(status_code=status_code, content=body)


def error_json(
    *,
    code: str,
    message: str,
    fields: dict[str, list[str]] | None = None,
    status_code: int = 400,
) -> JSONResponse:
    err: dict[str, Any] = {"code": code, "message": message}
    if fields:
        err["fields"] = fields
    return JSONResponse(
        status_code=status_code,
        content={"success": False, "error": err},
    )
