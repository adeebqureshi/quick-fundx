from app.core.security import hash_token


def test_hash_token_stable() -> None:
    assert hash_token("abc123") == hash_token("abc123")
    assert hash_token("a") != hash_token("b")
