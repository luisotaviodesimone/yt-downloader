from typing import List

from pydantic import BaseModel


class GetVideosResponseDto(BaseModel):
    video_titles: List[str]
