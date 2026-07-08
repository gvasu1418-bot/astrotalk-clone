from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.connection import engine

from app.models.user import User
from backend.alembic.api.user import router as user_router

from app.models.astrologer import Astrologer

from backend.alembic.api.astrologer import router as astrologer_router

from app.models.booking import Booking

from backend.alembic.api.booking import router as booking_router

from app.models.wallet import Wallet

from backend.alembic.api.wallet import router as wallet_router

from app.models.review import Review

from backend.alembic.api.review import router as review_router

from backend.alembic.api.stats import router as stats_router

from backend.alembic.api.admin import router as admin_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(astrologer_router)
app.include_router(booking_router)


@app.get("/")
def home():
    return {
        "message": "AstroTalk Backend Running"
    }
    
# Base.metadata.create_all(bind=engine)

app.include_router(wallet_router) 
app.include_router(review_router)
app.include_router(stats_router)
app.include_router(admin_router)
