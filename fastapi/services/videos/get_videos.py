# List all videos in the videos directory
from pathlib import Path
from typing import List

from fastapi import HTTPException
from settings import Settings

settings = Settings()


def get_videos_titles() -> List[str]:
    videos_path = Path(settings.videos_path)

    if not videos_path.exists():
        raise HTTPException(status_code=404, detail="Videos directory does not exist")

    try:
        video_files = list(videos_path.glob("*.mp4"))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error accessing videos directory: {str(e)}")


    if not video_files:
        raise HTTPException(status_code=404, detail="No videos found")
    return [video_file.name for video_file in video_files if video_file.is_file()]

def get_videos_with_sizes() -> List[dict]:
    videos_path = Path(settings.videos_path)

    if not videos_path.exists():
        raise HTTPException(status_code=404, detail="Videos directory does not exist")

    video_files = list(videos_path.glob("*.mp4"))

    if not video_files:
        raise HTTPException(status_code=404, detail="No videos found")

    return [
        {"name": video_file.name, "size": video_file.stat().st_size}
        for video_file in video_files if video_file.is_file()
    ]
