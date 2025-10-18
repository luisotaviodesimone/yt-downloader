from celery import Celery
from settings import settings

celery_app = Celery(
    "yt_downloader",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
    include=["services.videos.download"]
)

celery_app.conf.update(
    result_expires=3600,
)