from sqlalchemy import Column, Integer, String, ForeignKey

from app.database.base import Base
from sqlalchemy.orm import relationship

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    astrologer_id = Column(
        Integer,
        ForeignKey("astrologers.id")
    )

    rating = Column(Integer)

    comment = Column(String(500))
    
    user = relationship(
    "User",
    back_populates="reviews"
)

astrologer = relationship(
    "Astrologer",
    back_populates="reviews"
)