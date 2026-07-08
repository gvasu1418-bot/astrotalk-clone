from sqlalchemy.orm import Session

from app.models.astrologer import Astrologer


def get_astrologers(db: Session):

    return db.query(Astrologer).all()