from pydantic import BaseModel


class ReviewCreate(BaseModel):
    astrologer_id: int
    rating: int
    comment: str