from typing import List

import yt_dlp


def download(links: List[str]):
    ydl_opts = {
        "format": "bestvideo+bestaudio/best",
        "merge_output_format": "mp4",
        # "outtmpl": f"videos/{course}/{trail}/%(title)s.%(ext)s",
        "outtmpl": f"videos/%(title)s.%(ext)s",
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download(links)
