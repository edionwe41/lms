from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.core.security import verify_password, create_access_token
from app.crud import user_crud
from app.schemas.user_schema import LoginRequestSchema

router = APIRouter()


@router.post("/login")
def login_for_access_token(
    payload: LoginRequestSchema,
    db: Session = Depends(get_db)
):
    # Find user
    user = user_crud.get_user_by_username(db, payload.username)

    # Invalid username / password
    if not user or not verify_password(payload.password, user.hashed_password):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Incorrect username or password"},
        )

    # Create JWT token
    access_token = create_access_token(
        subject=user.username,
        role=user.role
    )

    # Return JSON response (Axios friendly)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user.username,
        "role": user.role,
    }
