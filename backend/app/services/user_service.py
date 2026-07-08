from sqlalchemy.orm import Session

from app.models.user import User

from app.core.security import hash_password


def register_user(db: Session, user):

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user