from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "YouTube Downloader"
    videos_path: str = "videos"
    base_path: str = "/api/v1"

    model_config = SettingsConfigDict(env_file=".env")

