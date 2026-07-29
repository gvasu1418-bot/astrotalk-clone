from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.core.dependencies import get_current_admin
from app.models.astrologer import Astrologer
from app.models.user import User
from app.schemas.astrologer import AstrologerCreate
from app.services.astrologer_service import get_astrologers
router = APIRouter()


@router.post("/astrologers/register")
def register_astrologer(
    astrologer: AstrologerCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):

    new_astrologer = Astrologer(
        name=astrologer.name,
        email=astrologer.email,
        experience=astrologer.experience,
        specialization=astrologer.specialization,
        price_per_minute=astrologer.price_per_minute,
        bio=astrologer.bio
    )

    try:
        db.add(new_astrologer)
        db.commit()
        db.refresh(new_astrologer)
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Registration failed. This email may already be registered."
        )

    return {
        "message": "Astrologer Registered Successfully",
        "id": new_astrologer.id
    }


@router.delete("/astrologers/{astrologer_id}")
def delete_astrologer(
    astrologer_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):

    astrologer = db.query(Astrologer).filter(
        Astrologer.id == astrologer_id
    ).first()

    if not astrologer:
        raise HTTPException(
            status_code=404,
            detail="Astrologer not found"
        )

    db.delete(astrologer)
    db.commit()

    return {
        "message": "Astrologer Deleted"
    }


@router.get("/astrologers/search")
def search_astrologers(
    specialization: str,
    db: Session = Depends(get_db)
):

    astrologers = db.query(Astrologer).filter(
        Astrologer.specialization.ilike(f"%{specialization}%")
    ).all()

    return [
        {
            "id": astro.id,
            "name": astro.name,
            "experience": astro.experience,
            "specialization": astro.specialization,
            "price_per_minute": astro.price_per_minute,
            "bio": astro.bio
        }
        for astro in astrologers
    ]

@router.get("/astrologers")
def get_all_astrologers(
    db: Session = Depends(get_db)
):

    astrologers = db.query(Astrologer).all()

    return [
        {
            "id": astro.id,
            "name": astro.name,
            "experience": astro.experience,
            "specialization": astro.specialization,
            "price_per_minute": astro.price_per_minute,
            "bio": astro.bio,
            "rating": astro.rating
        }

        for astro in astrologers
    ]