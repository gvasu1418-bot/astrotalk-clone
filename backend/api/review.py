from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.core.dependencies import get_current_user

from app.models.review import Review
from app.schemas.review import ReviewCreate

router = APIRouter()


@router.post("/reviews")
def create_review(
    review: ReviewCreate,
    current_user_id=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if review.rating < 1 or review.rating > 5:
        raise HTTPException(
            status_code=400,
            detail="Rating must be between 1 and 5"
        )

    new_review = Review(
        user_id=current_user_id,
        astrologer_id=review.astrologer_id,
        rating=review.rating,
        comment=review.comment
    )

    db.add(new_review)
    db.commit()

    return {
        "message": "Review Added"
    }


@router.get("/reviews/{astrologer_id}")
def get_reviews(
    astrologer_id: int,
    db: Session = Depends(get_db)
):

    reviews = db.query(Review).filter(
        Review.astrologer_id == astrologer_id
    ).all()

    return reviews