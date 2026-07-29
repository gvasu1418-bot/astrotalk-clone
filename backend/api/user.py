from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import traceback


from app.database.connection import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.core.security import hash_password, verify_password
from app.core.jwt import create_access_token
from app.core.dependencies import get_current_user
from app.models.wallet import Wallet



router = APIRouter()


@router.get("/test")
def test():
    return {"message": "User API Working"}

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        new_user = User(
            name=user.name,
            email=user.email,
            password=hash_password(user.password)
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        wallet = Wallet(
            user_id=new_user.id,
            balance=500
        )

        db.add(wallet)
        db.commit()

        return {
            "message": "User Registered Successfully",
            "id": new_user.id
        }

    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):

    print("========== LOGIN ==========")
    print("Email Received:", user.email)

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    print("DB User:", db_user)

    if db_user:
        print("DB Email:", db_user.email)
        print("DB Password:", db_user.password)
        print("Password Match:", verify_password(user.password, db_user.password))

    if not db_user:
        return {"message": "Invalid Email or Password"}

    if not verify_password(user.password, db_user.password):
        return {"message": "Invalid Email or Password"}

    access_token = create_access_token(
        {"user_id": db_user.id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/profile")
def profile(
    current_user_id=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == current_user_id
    ).first()

    if not user:
        return {"message": "User Not Found"}

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }