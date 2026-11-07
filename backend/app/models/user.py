from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text

from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="student")
    name = Column(String, nullable=True)
    college_code = Column(String, nullable=True)
    phone = Column(String(50), default="")
    college = Column(String(255), default="")
    graduation_year = Column(Integer, nullable=True)
    target_role = Column(String(100), default="")
    linkedin_url = Column(String(500), default="")
    github_url = Column(String(500), default="")
    resume_score = Column(Integer, nullable=True)
    resume_data = Column(Text, default="")
    profile_completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    @property
    def full_name(self) -> str:
        return self.name or ""

    @full_name.setter
    def full_name(self, value: str) -> None:
        self.name = value

    @property
    def is_coordinator(self) -> bool:
        return self.role == "coordinator"

    @is_coordinator.setter
    def is_coordinator(self, value: bool) -> None:
        self.role = "coordinator" if value else "student"
