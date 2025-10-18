# Setup

```shell
uv sync
```

```shell
source .venv/bin/activate
```

```shell
fastapi run --host 0.0.0.0 --port 8000 main.py
```

# Async queue

You should have a Redis instance running to run the async Celery queue

```shell
celery -A celery_app worker --loglevel=info
```
