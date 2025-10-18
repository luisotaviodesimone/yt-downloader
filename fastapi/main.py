from celery.result import AsyncResult
from starlette.responses import JSONResponse

from celery_app import celery_app
from dtos.DownloadVideoRequestDto import DownloadVideoRequestDto
from dtos.GetVideosResponseDto import GetVideosResponseDto
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.videos import get_videos
from services.videos.download import download_video_from_urls
from settings import Settings

settings = Settings()

app = FastAPI(root_path=settings.base_path)

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/download")
def download_video(dto: DownloadVideoRequestDto):
    # download_video_from_urls(dto.urls)
    # return JSONResponse({"message": "Download started"})
    task = download_video_from_urls.delay(dto.urls)
    return JSONResponse({"task_id": task.id, "message": "Download enqueued."})


@app.get("/download/{task_id}")
def get_download_status(task_id: str):
    result = AsyncResult(task_id, app=celery_app)
    if result.state == "PENDING":
        return {"status": "pending"}
    elif result.state == "PROGRESS":
        return {"status": "in_progress"}
    elif result.state == "SUCCESS":
        return {"status": "completed"}
    else:
        return {"status": "failed", "error": str(result.info)}


@app.get("/videos")
async def get_videos_title() -> GetVideosResponseDto:
    videos = get_videos.get_videos_titles()
    return GetVideosResponseDto(video_titles=videos)
