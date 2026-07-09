from sqlalchemy import Column, Integer, String
from app.database.base import Base
from sqlalchemy.orm import relationship
from sqlalchemy import String


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    
    bookings = relationship("Booking",back_populates="user")
    reviews = relationship("Review",back_populates="user")

    # role = Column(String(20),default="user")