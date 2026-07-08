from pydantic import BaseModel


class BookingCreate(BaseModel):
    astrologer_id: int