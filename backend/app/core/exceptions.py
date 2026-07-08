from fastapi import HTTPException


def not_found(message):

    raise HTTPException(
        status_code=404,
        detail=message
    )