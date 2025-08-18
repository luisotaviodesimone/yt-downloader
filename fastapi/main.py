from dtos.DownloadVideoRequestDto import DownloadVideoRequestDto
from dtos.GetVideosResponseDto import GetVideosResponseDto
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.videos import get_videos
from services.videos.download import download_video_from_urls

app = FastAPI()

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
    download_video_from_urls(dto.urls)
    return {"message": f"Video from {dto.urls} was downloaded."}


@app.get("/videos")
async def get_videos_title() -> GetVideosResponseDto:
    videos = get_videos.get_videos_titles()
    return GetVideosResponseDto(video_titles=videos)
