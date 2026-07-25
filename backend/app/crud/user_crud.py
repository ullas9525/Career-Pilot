from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import hash_password


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, email: str, password: str, is_coordinator: bool = False) -> User:
    user = User(
        email=email,
        password_hash=hash_password(password),
        is_coordinator=is_coordinator,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
