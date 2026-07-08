from pydantic import BaseModel, EmailStr


class AstrologerCreate(BaseModel):
    name: str
    email: EmailStr
    experience: int
    specialization: str
    price_per_minute: int
    bio: str