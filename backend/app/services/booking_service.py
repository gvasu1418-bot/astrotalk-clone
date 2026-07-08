from sqlalchemy.orm import Session

from app.models.booking import Booking


def create_booking(db, booking):

    new_booking = Booking(
        user_id=booking.user_id,
        astrologer_id=booking.astrologer_id
    )

    db.add(new_booking)

    db.commit()

    db.refresh(new_booking)

    return new_booking