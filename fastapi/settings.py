from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "YouTube Downloader"
    videos_path: str = "videos"
