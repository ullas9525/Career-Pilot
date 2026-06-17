from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
import io
import json
from groq import AsyncGroq
from app.config import settings

router = APIRouter(prefix="/api/profile", tags=["Profile"])

@router.post("/resume-upload")
async def upload_resume(file: UploadFile = File(...)):
    if not settings.GROQ_API_KEY or settings.GROQ_API_KEY == "your_admin_key_here":
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured on the backend.")

    try:
        # Read the file contents
        contents = await file.read()
        
        # In a production app, we would parse the PDF using PyPDF2
        # For now, if it's text or we assume it's a raw dump, we decode it.
        # Let's handle simple parsing for demo purposes
        try:
            import PyPDF2
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
            resume_text = ""
            for page in pdf_reader.pages:
                resume_text += page.extract_text() + "\n"
        except Exception:
            # Fallback for plain text
            resume_text = contents.decode('utf-8', errors='ignore')

        # Use the backend ENV API key for Groq
        client = AsyncGroq(api_key=settings.GROQ_API_KEY)

        prompt = f"""
        You are an expert ATS (Applicant Tracking System) and career coach.
        Analyze the following resume and return ONLY a JSON object with this exact structure:
        {{
            "score": 85,
            "keywords_missing": ["React", "FastAPI"],
            "impact_feedback": "Strong use of metrics in the experience section.",
            "format_feedback": "Good single-column layout."
        }}
        
        Resume text:
        {resume_text[:4000]}
        """

        completion = await client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-8b-8192",
            temperature=0.2,
            response_format={"type": "json_object"}
        )

        response_text = completion.choices[0].message.content
        return json.loads(response_text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
