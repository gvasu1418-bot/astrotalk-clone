from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.astrologer import Astrologer
from app.schemas.astrologer import AstrologerCreate
from app.services.astrologer_service import get_astrologers
router = APIRouter()


@router.post("/astrologers/register")
def register_astrologer(
    astrologer: AstrologerCreate,
    db: Session = Depends(get_db)
):

    new_astrologer = Astrologer(
        name=astrologer.name,
        email=astrologer.email,
        experience=astrologer.experience,
        specialization=astrologer.specialization,
        price_per_minute=astrologer.price_per_minute,
        bio=astrologer.bio
    )

    db.add(new_astrologer)
    db.commit()
    db.refresh(new_astrologer)

    return {
        "message": "Astrologer Registered Successfully",
        "id": new_astrologer.id
    }
    
@router.get("/astrologers/search")
def search_astrologers(
    specialization: str,
    db: Session = Depends(get_db)
):
    astrologers = db.query(Astrologer).filter(
        Astrologer.specialization.ilike(f"%{specialization}%")
    ).all()

    return astrologers