from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.connection import get_db
from app.models.review import Review

router = APIRouter()

@router.get("/astrologers/{astrologer_id}/rating")
def average_rating(
    astrologer_id: int,
    db: Session = Depends(get_db)
):

    avg_rating = db.query(
        func.avg(Review.rating)
    ).filter(
        Review.astrologer_id == astrologer_id
    ).scalar()

    return {
        "astrologer_id": astrologer_id,
        "average_rating": avg_rating
    }