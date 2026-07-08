from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.core.dependencies import get_current_user

from app.models.booking import Booking

from app.schemas.booking import BookingCreate

from app.models.wallet import Wallet
from app.models.astrologer import Astrologer
from fastapi import HTTPException


router = APIRouter()

@router.post("/bookings")
def create_booking(
    booking: BookingCreate,
    current_user_id=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    astrologer = db.query(Astrologer).filter(
        Astrologer.id == booking.astrologer_id
    ).first()

    if not astrologer:
        raise HTTPException(
            status_code=404,
            detail="Astrologer not found"
        )

    wallet = db.query(Wallet).filter(
        Wallet.user_id == current_user_id
    ).first()

    if not wallet:
        raise HTTPException(
            status_code=404,
            detail="Wallet not found"
        )

    booking_cost = astrologer.price_per_minute

    if wallet.balance < booking_cost:
        raise HTTPException(
            status_code=400,
            detail="Insufficient Balance"
        )

    wallet.balance -= booking_cost

    new_booking = Booking(
        user_id=current_user_id,
        astrologer_id=booking.astrologer_id
    )

    db.add(new_booking)

    db.commit()

    db.refresh(new_booking)

    return {
        "message": "Booking Created",
        "booking_id": new_booking.id,
        "remaining_balance": wallet.balance
    }