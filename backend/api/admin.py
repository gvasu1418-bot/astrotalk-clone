
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.core.dependencies import get_current_admin

from app.models.user import User
from app.models.astrologer import Astrologer
from app.models.booking import Booking
from app.models.wallet import Wallet


router = APIRouter(prefix="/admin")


@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):

    total_users = db.query(User).count()

    total_astrologers = db.query(Astrologer).count()

    total_bookings = db.query(Booking).count()

    wallets = db.query(Wallet).all()

    total_revenue = sum(wallet.balance for wallet in wallets)

    return {

    "total_users": total_users,

    "total_astrologers": total_astrologers,

    "total_bookings": total_bookings,

    "total_revenue": total_revenue,

    "recent_users": [

        {

            "id": user.id,

            "name": user.name,

            "email": user.email

        }

        for user in db.query(User)
                      .order_by(User.id.desc())
                      .limit(5)
                      .all()

    ],

    "recent_bookings": [

        {

            "id": booking.id,

            "user_id": booking.user_id,

            "astrologer_id": booking.astrologer_id

        }

        for booking in db.query(Booking)
                         .order_by(Booking.id.desc())
                         .limit(5)
                         .all()

    ]

}