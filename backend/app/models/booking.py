from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.base import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    astrologer_id = Column(
        Integer,
        ForeignKey("astrologers.id")
    )

    status = Column(
        String,
        default="pending"
    )