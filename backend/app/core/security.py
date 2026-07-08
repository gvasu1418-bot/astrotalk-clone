from passlib.context import CryptContext
from app.core.settings import SECRET_KEY
from app.core.settings import ALGORITHM
from app.core.settings import ACCESS_TOKEN_EXPIRE_MINUTES


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )