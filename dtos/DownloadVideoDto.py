
from typing import List
from pydantic import BaseModel


class DownloadVideoDto(BaseModel):
    urls: List[str]

