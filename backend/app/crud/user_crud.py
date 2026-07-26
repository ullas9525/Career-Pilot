from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import hash_password
from app.schemas.user import UserProfile


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, email: str, password: str, is_coordinator: bool = False) -> User:
    user = User(
        email=email,
        hashed_password=hash_password(password) if password else "",
        is_coordinator=is_coordinator,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user_profile(db: Session, user: User, profile: UserProfile) -> User:
    user.full_name = profile.full_name
    user.phone = profile.phone or ""
    user.college = profile.college
    user.graduation_year = profile.graduation_year
    user.target_role = profile.target_role
    user.linkedin_url = profile.linkedin_url or ""
    user.github_url = profile.github_url or ""
    user.profile_completed = True
    db.commit()
    db.refresh(user)
    return user


def update_user_resume(db: Session, user: User, resume_text: str, score: int) -> User:
    user.resume_data = resume_text
    user.resume_score = score
    db.commit()
    db.refresh(user)
    return user
