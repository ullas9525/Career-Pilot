from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
import io
import json
from groq import AsyncGroq
from app.config import settings

router = APIRouter(prefix="/api/profile", tags=["Profile"])

RUBRICS_PATH = "e:/Muddu Items/Career Pilot/docs/Resume_Rubrics.md"

def get_resume_rubric():
    try:
        with open(RUBRICS_PATH, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return "Rubric not found."

@router.post("/resume-upload")
async def upload_resume(
    file: UploadFile = File(...), 
    role: str = Form("Software Engineer")
):
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

        rubric_text = get_resume_rubric()

        prompt = f"""
        You are an expert ATS (Applicant Tracking System) and senior technical recruiter.
        Analyze the following resume specifically for the target role of: {role}.
        Calculate a score strictly out of 100 based on the following mathematically derived rubric.
        
        You MUST calculate the score by evaluating each bucket exactly as described and adding up the points. 
        Do NOT eyeball the final score. If there is no quantified impact, the max score for that bucket is 5, severely capping the final score.
        
        RESUME SCORING RUBRICS:
        {rubric_text}

        Return ONLY a valid JSON object matching this structure:
        {{
            "score": <integer from 0 to 100>,
            "sub_scores": [
                {{"category": "Quantified Impact", "score": <int>, "max": 30, "reason": "<brief reason>"}},
                {{"category": "Keyword Coverage", "score": <int>, "max": 25, "reason": "<brief reason>"}},
                {{"category": "Project Quality", "score": <int>, "max": 20, "reason": "<brief reason>"}},
                {{"category": "Formatting", "score": <int>, "max": 15, "reason": "<brief reason>"}},
                {{"category": "Summary", "score": <int>, "max": 10, "reason": "<brief reason>"}}
            ],
            "target_role_match": "<Detailed analysis of how well the resume fits the target role of {role}. Provide deep, infinite feedback.>",
            "score_explanation": "<Detailed breakdown of exactly why this score was given instead of a higher score, referencing the rubric buckets. Provide deep, infinite feedback.>",
            "improvement_suggestions": [
                "<Specific, actionable improvement suggestion 1>",
                "<Specific, actionable improvement suggestion 2>",
                "<Specific, actionable improvement suggestion 3>"
            ]
        }}
        
        Resume text:
        {resume_text[:4000]}
        """

        completion = await client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            temperature=0.2,
            response_format={"type": "json_object"}
        )

        response_text = completion.choices[0].message.content
        return json.loads(response_text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
