from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dtos.DownloadVideoDto import DownloadVideoDto
from yt_downloads import download_youtube_videos

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
def download_video(dto: DownloadVideoDto):
    download_youtube_videos.download(dto.urls)
    return {"message": f"Video from {dto.urls} was downloaded."}
