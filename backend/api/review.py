from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.core.dependencies import get_current_user

from app.models.review import Review
from app.models.astrologer import Astrologer
from app.schemas.review import ReviewCreate

router = APIRouter()


@router.post("/reviews")
def create_review(
    review: ReviewCreate,
    current_user_id=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    astrologer = db.query(Astrologer).filter(
        Astrologer.id == review.astrologer_id
    ).first()

    if not astrologer:
        raise HTTPException(
            status_code=404,
            detail="Astrologer Not Found"
        )

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
    db.refresh(new_review)

    return {
        "message": "Review Added Successfully",
        "review_id": new_review.id
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