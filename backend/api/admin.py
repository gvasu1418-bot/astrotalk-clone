from fastapi import APIRouter

router = APIRouter(prefix="/admin")

@router.get("/dashboard")
def dashboard():

    return {
        "message": "Admin Panel"
    }