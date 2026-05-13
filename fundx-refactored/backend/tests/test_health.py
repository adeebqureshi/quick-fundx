from starlette.testclient import TestClient


def test_health_ok() -> None:
    from app.main import app

    client = TestClient(app)
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


def test_register_validation_error() -> None:
    from app.main import app

    client = TestClient(app)
    r = client.post(
        "/api/v1/auth/register",
        json={"phone": "bad", "full_name": ""},
    )
    assert r.status_code == 422
    body = r.json()
    assert body.get("success") is False
    assert body.get("error", {}).get("code") == "VALIDATION_ERROR"
