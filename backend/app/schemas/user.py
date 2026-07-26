from datetime import datetime

from pydantic import BaseModel


class UserProfile(BaseModel):
    full_name: str
    phone: str | None = None
    college: str
    graduation_year: int | None = None
    target_role: str
    linkedin_url: str | None = None
    github_url: str | None = None


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    college: str
    graduation_year: int | None = None
    target_role: str
    linkedin_url: str
    github_url: str
    resume_score: int | None = None
    profile_completed: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ResumeDimension(BaseModel):
    score: int
    max_score: int
    points_lost: int
    evidence: str
    explanation: str


class KeywordCoverage(ResumeDimension):
    matched_core: list[str]
    missing_core: list[str]
    matched_secondary: list[str]
    missing_secondary: list[str]
    core_requirements_satisfied: int
    core_requirements_total: int


class ActionItem(BaseModel):
    improvement: str
    improves_dimension: str


class ResumeAnalysisResponse(BaseModel):
    target_role: str
    total_score: int
    experience_level: str
    experience_context: str
    quantified_impact: ResumeDimension
    keyword_coverage: KeywordCoverage
    project_quality: ResumeDimension
    formatting: ResumeDimension
    summary_positioning: ResumeDimension
    top_actions: list[ActionItem]
