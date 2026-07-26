from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import create_access_token, verify_password
from app.crud.user_crud import create_user, get_user_by_email
from app.schemas.auth import AuthResponse, LoginRequest, SignupRequest

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup", response_model=AuthResponse)
def signup(body: SignupRequest, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, body.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    user = create_user(db, email=body.email, password=body.password, is_coordinator=body.is_coordinator)
    token = create_access_token({"sub": str(user.id), "email": user.email, "is_coordinator": user.is_coordinator})

    return AuthResponse(
        access_token=token,
        user_id=str(user.id),
        email=user.email,
        is_coordinator=user.is_coordinator,
    )


@router.post("/login", response_model=AuthResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, body.email)
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token({"sub": str(user.id), "email": user.email, "is_coordinator": user.is_coordinator})

    return AuthResponse(
        access_token=token,
        user_id=str(user.id),
        email=user.email,
        is_coordinator=user.is_coordinator,
    )

