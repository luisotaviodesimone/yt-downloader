from typing import List

from pydantic import BaseModel


class DownloadVideoRequestDto(BaseModel):
    urls: List[str]
