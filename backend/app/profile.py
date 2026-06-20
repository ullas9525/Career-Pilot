import io
import json
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from app.config import settings
from app.nvidia_client import chat_completion, NEMOTRON_3_ULTRA

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
    role: str = Form("Software Engineer"),
):
    if not settings.NVIDIA_API_KEY:
        raise HTTPException(status_code=500, detail="NVIDIA_API_KEY is not configured on the backend.")

    try:
        contents = await file.read()

        try:
            import PyPDF2
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(contents))
            resume_text = ""
            for page in pdf_reader.pages:
                resume_text += page.extract_text() + "\n"
        except Exception:
            resume_text = contents.decode("utf-8", errors="ignore")

        rubric_text = get_resume_rubric()

        prompt = f"""
        You are an expert ATS (Applicant Tracking System) and senior technical recruiter.
        Analyze the following resume specifically for the target role of: {role}.
        Calculate a score strictly out of 100 based on the following mathematically derived rubric.

        You MUST calculate the score by evaluating each bucket exactly as described and adding up the points.
        Do NOT eyeball the final score. If there is no quantified impact, the max score for that bucket is 5, severely capping the final score.

        RESPONSE REQUIREMENTS:
        - Keep explanations SHORT and in BULLET POINTS so students can scan fast.
        - For every issue found, provide: what the issue is → what to change it to → why it matters.
        - Be specific and actionable. Show the exact before/after fix.

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
            "target_role_match": "<Short bullet points analyzing how well the resume fits the target role of {role}. Keep brief and scannable.>",
            "why_score_is_low": "<bullet points explaining exactly why this score wasn't higher, referencing each rubric bucket. Keep short and scannable.>",
            "fixes": [
                {{
                    "issue": "<Exact issue found in the resume>",
                    "fix": "<Exactly what to change it to — show the rewritten bullet/text>",
                    "why": "<Short reason why this fix improves the score, which bucket it impacts>"
                }}
            ]
        }}

        Resume text:
        {resume_text[:4000]}
        """

        resp_text = await chat_completion(
            messages=[{"role": "user", "content": prompt}],
            model=NEMOTRON_3_ULTRA,
            temperature=0.2,
            response_format={"type": "json_object"},
        )

        return json.loads(resp_text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
