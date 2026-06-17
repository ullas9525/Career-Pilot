from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="student") # "student" or "coordinator"
    name = Column(String, nullable=True)
    target_role = Column(String, nullable=True) # e.g. "Software Engineer"
    college_code = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    interviews = relationship("Interview", back_populates="student")

class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="in_progress") # "in_progress", "completed", "scored"
    target_role = Column(String)
    overall_score = Column(Float, nullable=True)
    feedback_summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    student = relationship("User", back_populates="interviews")
    messages = relationship("Message", back_populates="interview")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    interview_id = Column(Integer, ForeignKey("interviews.id"))
    role = Column(String) # "user" or "assistant"
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    interview = relationship("Interview", back_populates="messages")
