from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.jwt import verify_token
from app.database.connection import get_db
from app.models.user import User

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials
    payload = verify_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid Token")

    return payload["user_id"]


def get_current_admin(
    current_user_id=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == current_user_id).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid Token")

    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin Access Required")

    return user