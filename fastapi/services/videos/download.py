from typing import List

import yt_dlp

from settings import Settings

settings = Settings()

def download_video_from_urls(links: List[str]):
    ydl_opts = {
        "format": "bestvideo+bestaudio/best",
        "merge_output_format": "mp4",
        "outtmpl": f"{settings.videos_path}/%(title)s.%(ext)s",
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(links)
