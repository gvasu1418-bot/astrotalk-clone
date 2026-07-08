from sqlalchemy import Column, Integer, String, Text

from app.database.base import Base

from sqlalchemy.orm import relationship

class Astrologer(Base):
    __tablename__ = "astrologers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, nullable=False)

    experience = Column(Integer)

    specialization = Column(String(100))

    price_per_minute = Column(Integer)

    rating = Column(Integer, default=5)

    bio = Column(Text)
    
    bookings = relationship(
    "Booking",
    back_populates="astrologer"
)

reviews = relationship(
    "Review",
    back_populates="astrologer"
)