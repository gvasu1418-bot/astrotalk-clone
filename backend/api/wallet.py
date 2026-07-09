from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.core.dependencies import get_current_user

from app.models.wallet import Wallet

from app.schemas.wallet import AddMoney

router = APIRouter()

@router.post("/wallet/create")
def create_wallet(
    current_user_id=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    wallet = Wallet(
        user_id=current_user_id
    )

    db.add(wallet)

    db.commit()

    return {
        "message": "Wallet Created"
    }
    
@router.post("/wallet/add-money")
def add_money(
    data: AddMoney,
    current_user_id=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    wallet = db.query(Wallet).filter(
        Wallet.user_id == current_user_id
    ).first()

    wallet.balance += data.amount

    db.commit()

    return {
        "balance": wallet.balance
    }

@router.get("/wallet/balance")
def get_balance(
    current_user_id=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    wallet = db.query(Wallet).filter(
        Wallet.user_id == current_user_id
    ).first()

    return {
        "balance": wallet.balance
    }
    
