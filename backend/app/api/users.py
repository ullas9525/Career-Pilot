from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import io
import PyPDF2
import docx

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.crud.user_crud import update_user_profile, update_user_resume
from app.models.user import User
from app.schemas.user import ResumeAnalysisResponse, UserProfile, UserResponse
from app.services.resume_service import analyze_resume

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me", response_model=UserResponse)
def get_me(user: User = Depends(get_current_user)):
    return user


@router.put("/profile", response_model=UserResponse)
def update_profile(body: UserProfile, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return update_user_profile(db, user, body)


@router.post("/resume/upload")
async def upload_resume(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        content = await file.read()
        filename = file.filename.lower()
        resume_text = ""

        if filename.endswith(".pdf"):
            pdf = PyPDF2.PdfReader(io.BytesIO(content))
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    resume_text += text + "\n"
        elif filename.endswith(".docx"):
            doc = docx.Document(io.BytesIO(content))
            for para in doc.paragraphs:
                resume_text += para.text + "\n"
        else:
            # Fallback for txt or other formats
            resume_text = content.decode("utf-8", errors="ignore")

        # Clean any null bytes that might still exist
        resume_text = resume_text.replace('\x00', '')

        if not resume_text.strip():
            raise ValueError("Could not extract any text from the document.")

        result = analyze_resume(resume_text, user.target_role, user.graduation_year)

        update_user_resume(db, user, resume_text, result["total_score"])

        return ResumeAnalysisResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume upload failed: {str(e)}")
