from typing import List

import yt_dlp

from settings import settings
from celery_app import celery_app

@celery_app.task(name="download_video_from_urls")
def download_video_from_urls(links: List[str]):
    ydl_opts = {
        "format": "bestvideo+bestaudio/best",
        "merge_output_format": "mp4",
        "outtmpl": f"{settings.videos_path}/%(title)s.%(ext)s",
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(links)
