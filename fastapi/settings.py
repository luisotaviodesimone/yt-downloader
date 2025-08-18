from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "YouTube Downloader"
    videos_path: str = "videos"
    model_config = SettingsConfigDict(env_file=".env")

