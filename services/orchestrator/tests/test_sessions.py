from fastapi.testclient import TestClient
from app.main import app


def test_login_returns_token():
    c = TestClient(app)
    r = c.post("/api/login", json={"username": "tommy"})
    assert r.status_code == 200
    assert "token" in r.json()