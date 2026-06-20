import json
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app import models, schemas
from app.database import get_db
from app.nvidia_client import (
    chat_completion,
    NEMOTRON_3_NANO_OMNI,
    NEMOTRON_3_ULTRA,
)

router = APIRouter(prefix="/api/interviews", tags=["Interviews"])

RUBRIC_PATH = "e:/Muddu Items/Career Pilot/docs/CareerPilot_Role_and_Score_Rubrics.md"


def get_rubric():
    try:
        with open(RUBRIC_PATH, "r", encoding="utf-8") as f:
            return f.read()
    except Exception:
        return "Rubric not found."


@router.post("/start")
async def start_interview(
    data: schemas.InterviewStart,
    db: AsyncSession = Depends(get_db),
    x_api_key: str = Header(...),
):
    if not x_api_key:
        raise HTTPException(status_code=401, detail="Missing NVIDIA API Key.")

    interview = models.Interview(target_role=data.role, status="in_progress")
    db.add(interview)
    await db.commit()
    await db.refresh(interview)

    prompt = f"""
    You are an expert technical interviewer for a {data.role} role.
    Start the interview by introducing yourself briefly and asking the very first technical question.
    Keep it professional, engaging, and concise. Do NOT provide the answer.
    """

    try:
        ai_response = await chat_completion(
            messages=[{"role": "user", "content": prompt}],
            model=NEMOTRON_3_NANO_OMNI,
            temperature=0.7,
            api_key=x_api_key,
        )

        msg = models.Message(interview_id=interview.id, role="assistant", content=ai_response)
        db.add(msg)
        await db.commit()

        return {"interview_id": interview.id, "message": ai_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"NVIDIA API Error: {str(e)}")


@router.post("/chat")
async def chat_interview(
    data: schemas.InterviewChat,
    db: AsyncSession = Depends(get_db),
    x_api_key: str = Header(...),
):
    if not x_api_key:
        raise HTTPException(status_code=401, detail="Missing NVIDIA API Key.")

    result = await db.execute(select(models.Interview).where(models.Interview.id == data.interview_id))
    interview = result.scalars().first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found.")

    user_msg = models.Message(interview_id=interview.id, role="user", content=data.message)
    db.add(user_msg)
    await db.commit()

    msg_result = await db.execute(
        select(models.Message)
        .where(models.Message.interview_id == interview.id)
        .order_by(models.Message.id)
    )
    history = msg_result.scalars().all()

    messages = [
        {"role": "system", "content": f"You are a strict but fair technical interviewer for a {interview.target_role} role. Ask exactly one follow-up question based on their answer. Do not give away the answer easily."}
    ]
    for m in history:
        messages.append({"role": m.role, "content": m.content})

    if len(history) >= 6:
        rubric_text = get_rubric()
        score_prompt = f"""
        The interview is now concluded. Based on the following interview transcript, evaluate the candidate strictly using the 0-10 rubrics provided below.

        RUBRICS:
        {rubric_text[:4000]}

        Evaluate the candidate out of 100 overall score.
        Return ONLY a JSON object:
        {{
            "score": <0-100 integer>,
            "feedback_summary": "<Your detailed feedback covering Technical Depth, Problem Solving, and Communication>",
            "message": "Thank you for the interview! Here is your final feedback: ..."
        }}
        """
        messages.append({"role": "user", "content": score_prompt})

        try:
            resp_text = await chat_completion(
                messages=messages,
                model=NEMOTRON_3_ULTRA,
                temperature=0.2,
                response_format={"type": "json_object"},
                api_key=x_api_key,
            )
            resp = json.loads(resp_text)

            interview.status = "scored"
            interview.overall_score = resp["score"]
            interview.feedback_summary = resp["feedback_summary"]

            ai_msg = models.Message(interview_id=interview.id, role="assistant", content=resp["message"])
            db.add(ai_msg)
            await db.commit()

            return {"message": resp["message"], "status": "completed", "score": resp["score"], "feedback": resp["feedback_summary"]}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"NVIDIA API Error: {str(e)}")

    else:
        try:
            ai_response = await chat_completion(
                messages=messages,
                model=NEMOTRON_3_NANO_OMNI,
                temperature=0.7,
                api_key=x_api_key,
            )

            ai_msg = models.Message(interview_id=interview.id, role="assistant", content=ai_response)
            db.add(ai_msg)
            await db.commit()

            return {"message": ai_response, "status": "in_progress"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"NVIDIA API Error: {str(e)}")
