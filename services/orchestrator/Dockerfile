FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc curl \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml /app/pyproject.toml

RUN pip install --no-cache-dir -U pip && pip install --no-cache-dir \
    fastapi==0.115.0 uvicorn[standard]==0.30.6 pydantic==2.8.2 \
    sqlalchemy==2.0.32 psycopg[binary]==3.2.1 docker==7.1.0 pyjwt==2.9.0

COPY app /app/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]