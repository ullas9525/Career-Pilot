import json
from datetime import datetime

from openai import OpenAI

from app.config import settings

ROLE_KEYWORDS = {
    "backend-engineer": {
        "core": [["Python", "Java", "Go", "Node.js"], "REST API", ["SQL", "PostgreSQL"], "Git", "Data structures", "Algorithms"],
        "secondary": [["Docker", "Kubernetes"], ["Redis", "Memcached"], ["Kafka", "RabbitMQ"], ["AWS", "GCP", "Azure"], "Microservices"],
    },
    "frontend-engineer": {
        "core": [["JavaScript", "TypeScript"], ["React", "Vue", "Angular"], "HTML", "CSS", "Responsive design", "Git", ["Redux", "Context API", "Zustand"]],
        "secondary": ["Accessibility", "Performance optimization", ["Jest", "Cypress", "React Testing Library"], ["Webpack", "Vite"], "Figma"],
    },
    "fullstack-engineer": {
        "core": [["React", "Vue.js", "Angular"], ["Node.js", "Express", "Django", "FastAPI"], "REST API", ["SQL", "PostgreSQL", "MongoDB", "NoSQL"], "Git", "HTML", "CSS", ["JavaScript", "TypeScript"]],
        "secondary": ["Docker", "CI/CD", ["AWS", "Azure", "GCP"], ["JWT", "OAuth"], ["Jest", "Mocha", "PyTest"], "GraphQL"],
    },
    "product-manager": {
        "core": ["Product roadmapping", "User research", "Data-driven decision making", "Stakeholder communication", ["A/B testing", "Experimentation"]],
        "secondary": ["SQL", "Figma", ["Agile", "Scrum"], ["Mixpanel", "Amplitude", "GA"], "Market analysis"],
    },
    "data-scientist": {
        "core": ["Python", "Data preprocessing", ["scikit-learn", "TensorFlow", "PyTorch"], "Statistics", ["Pandas", "NumPy"], "Model evaluation"],
        "secondary": ["SQL", ["Matplotlib", "Seaborn", "Tableau"], "MLOps", ["NLP", "Computer Vision"], "Jupyter"],
    },
    "data-engineer": {
        "core": ["SQL", "Python", ["ETL", "Data pipeline"], ["Snowflake", "BigQuery", "Redshift"], "Git"],
        "secondary": [["Apache Airflow", "Spark"], ["AWS", "GCP", "Azure"], "Data modeling", ["Kafka", "Kinesis"], "Docker"],
    },
    "devops-engineer": {
        "core": ["Docker", "Kubernetes", "CI/CD", ["AWS", "GCP", "Azure"], "Linux", "Git", ["Terraform", "Ansible"]],
        "secondary": ["Monitoring", ["Prometheus", "Grafana", "ELK"], "Helm", "Shell scripting", "Python", ["Jenkins", "GitHub Actions", "GitLab CI"]],
    },
    "mobile-developer": {
        "core": [["Kotlin", "Swift", "Java", "Objective-C"], ["Android", "iOS", "React Native", "Flutter"], "REST API", "Git"],
        "secondary": ["Firebase", ["SQLite", "Realm", "CoreData"], ["Unit testing", "UI testing"], "App store", ["Material Design", "SwiftUI"]],
    },
    "qa-engineer": {
        "core": ["Test automation", ["Selenium", "Cypress", "Playwright"], ["Jest", "PyTest", "JUnit"], "API testing", "SQL", "Git"],
        "secondary": ["CI/CD", "Docker", ["Performance testing", "JMeter"], ["Security testing", "OWASP"], "Test planning", "Bug tracking"],
    },
}

RUBRIC_TEMPLATE = """
You are an expert, highly critical resume scorer. Grade this resume BRUTALLY. Do not be lenient. Be extremely strict with your scoring and do not hesitate to give a low score if the resume lacks quantifiable metrics, strong keywords, or professional formatting. 
Score this resume for the target role: {target_role}

Use ONLY this rubric (dimensions and weights are fixed):

1. Quantified Impact (30 points)
   - 0-5: No quantified outcomes
   - 6-12: 1 vague quantified outcome
   - 13-20: 2-3 quantified outcomes, inconsistent
   - 21-26: Most projects have metrics
   - 27-30: Every major bullet has specific metrics

2. Keyword/Skill Coverage (25 points)
   Core keywords: {core_keywords}
   Secondary keywords: {secondary_keywords}
   - Count an OR group as ONE requirement satisfied if ANY of its items are found.
   - Do NOT recommend alternative technologies if the user already has one from the same OR group.
   - 0-5: Almost no keywords
   - 6-12: Surface-level only
   - 13-18: ~Half present
   - 19-23: Most present
   - 24-25: Strong coverage

3. Project Description Quality (20 points)
   - 0-5: Vague phrases
   - 6-10: Action only, no result
   - 11-15: Action + partial result
   - 16-18: Clear problem->action->result in most entries
   - 19-20: Full structure in every entry

4. Formatting & Structure (15 points)
   - 0-4: Unreadable, likely breaks ATS
   - 5-9: Mostly readable, inconsistent
   - 10-13: Clean, minor issues only
   - 14-15: Fully consistent and scannable

5. Summary/Positioning (10 points)
   - 0-2: No summary or filler
   - 3-5: Names interest area not tailored
   - 6-8: Tailored to target role
   - 9-10: Sharp, differentiated pitch

EXPERIENCE CONTEXT:
Graduation year: {graduation_year} (Use this to determine experience level band: 1st-2nd year, pre-final year, final year/graduating, etc. Current year is {current_year}).

RESUME TO SCORE:
{resume_text}

Return JSON only (no markdown). The JSON MUST EXACTLY MATCH this schema:
{{
    "target_role": "{target_role}",
    "total_score": <sum of the 5 dimension scores>,
    "experience_level": "<brief string like 'final year student'>",
    "experience_context": "<one sentence explaining if the score is competitive for this level>",
    "quantified_impact": {{
        "score": <0-30>, "max_score": 30, "points_lost": <30-score>,
        "evidence": "<quote actual metrics from resume or state absence>",
        "explanation": "<why points were lost based on evidence>"
    }},
    "keyword_coverage": {{
        "score": <0-25>, "max_score": 25, "points_lost": <25-score>,
        "evidence": "<describe matched vs missing skills>",
        "matched_core": ["<keyword1>", ...],
        "missing_core": ["<keyword1>", ...],
        "matched_secondary": ["<keyword1>", ...],
        "missing_secondary": ["<keyword1>", ...],
        "core_requirements_satisfied": <int>,
        "core_requirements_total": <int>,
        "explanation": "<why points were lost based on evidence>"
    }},
    "project_quality": {{
        "score": <0-20>, "max_score": 20, "points_lost": <20-score>,
        "evidence": "<quote specific project structures>",
        "explanation": "<why points were lost based on evidence>"
    }},
    "formatting": {{
        "score": <0-15>, "max_score": 15, "points_lost": <15-score>,
        "evidence": "<describe specific formatting traits found>",
        "explanation": "<why points were lost based on evidence>"
    }},
    "summary_positioning": {{
        "score": <0-10>, "max_score": 10, "points_lost": <10-score>,
        "evidence": "<quote summary if present>",
        "explanation": "<why points were lost based on evidence>"
    }},
    "top_actions": [
        {{ "improvement": "<Specific actionable advice>", "improves_dimension": "<dimension name>" }}
    ]
}}
"""


def _call_llm_with_fallback(prompt: str) -> str:
    errors = []
    
    # 1. NVIDIA
    if settings.NVIDIA_API_KEY:
        try:
            client = OpenAI(
                api_key=settings.NVIDIA_API_KEY,
                base_url=settings.NVIDIA_BASE_URL,
                timeout=15, max_retries=0
            )
            response = client.chat.completions.create(
                model="deepseek-ai/deepseek-v4-flash",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1, max_tokens=2000
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            errors.append(f"NVIDIA failed: {e}")

    # 2. OpenRouter
    if settings.OPENROUTER_API_KEY:
        try:
            client = OpenAI(
                api_key=settings.OPENROUTER_API_KEY,
                base_url="https://openrouter.ai/api/v1",
                timeout=15, max_retries=0
            )
            response = client.chat.completions.create(
                model="meta-llama/llama-3.1-8b-instruct:free",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1, max_tokens=2000
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            errors.append(f"OpenRouter failed: {e}")

    # 3. Groq
    if settings.GROQ_API_KEY:
        try:
            client = OpenAI(
                api_key=settings.GROQ_API_KEY,
                base_url="https://api.groq.com/openai/v1",
                timeout=15, max_retries=0
            )
            response = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1, max_tokens=2000
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            errors.append(f"Groq failed: {e}")

    raise Exception(f"All LLM providers failed: {'; '.join(errors)}")


def _keyword_score(resume_lower: str, keywords: dict) -> dict:
    text = resume_lower
    def check_kw(kw):
        if isinstance(kw, list):
            for k in kw:
                if k.lower() in text:
                    return k, True
            return " OR ".join(kw), False
        else:
            return kw, kw.lower() in text

    matched_core = []
    missing_core = []
    for kw in keywords["core"]:
        name, found = check_kw(kw)
        if found: matched_core.append(name)
        else: missing_core.append(name)

    matched_sec = []
    missing_sec = []
    for kw in keywords["secondary"]:
        name, found = check_kw(kw)
        if found: matched_sec.append(name)
        else: missing_sec.append(name)

    total_core = len(keywords["core"])
    total_sec = len(keywords["secondary"])
    core_found = len(matched_core)
    sec_found = len(matched_sec)
    
    pct = (core_found + sec_found) / (total_core + total_sec) if (total_core + total_sec) > 0 else 0
    kw_score = round(pct * 25)

    return {
        "score": kw_score,
        "max_score": 25,
        "points_lost": 25 - kw_score,
        "matched_core": matched_core,
        "missing_core": missing_core,
        "matched_secondary": matched_sec,
        "missing_secondary": missing_sec,
        "core_requirements_satisfied": core_found,
        "core_requirements_total": total_core,
        "evidence": f"Found {core_found} core and {sec_found} secondary keywords.",
        "explanation": "Add the missing skills listed below to your resume to increase your keyword match rate." if kw_score < 25 else "Great job! All required keywords are matched."
    }


def _count_numbers(text: str) -> int:
    import re
    return len(re.findall(r'\d+', text))


def _has_section(text: str, name: str) -> bool:
    return name.lower() in text.lower()


def _local_analysis(resume_text: str, target_role: str, graduation_year: int) -> dict:
    """Keyword and structure based analysis when NVIDIA API is unavailable."""
    resume_lower = resume_text.lower()
    keywords = ROLE_KEYWORDS.get(target_role, ROLE_KEYWORDS["fullstack-engineer"])

    kw_result = _keyword_score(resume_lower, keywords)

    num_count = _count_numbers(resume_text)
    impact_score = min(30, num_count * 3)

    has_summary = _has_section(resume_text, "summary") or _has_section(resume_text, "objective") or _has_section(resume_text, "profile")
    has_experience = _has_section(resume_text, "experience") or _has_section(resume_text, "work")
    has_education = _has_section(resume_text, "education")
    has_projects = _has_section(resume_text, "project")
    has_skills = _has_section(resume_text, "skill")

    sections_present = sum([has_summary, has_experience, has_education, has_projects, has_skills])
    formatting_score = min(15, sections_present * 3)

    lines = resume_text.strip().split('\n')
    lines_with_content = [l for l in lines if len(l.strip()) > 30]
    total_lines = len([l for l in lines if l.strip()])
    quality_score = min(20, round(len(lines_with_content) / max(total_lines, 1) * 20)) if total_lines > 0 else 0

    positioning_score = 5 if has_summary else 2

    total = impact_score + kw_result["score"] + quality_score + formatting_score + positioning_score

    top_actions = []
    if num_count < 5:
        top_actions.append({"improvement": "Add quantified achievements (%, $, time saved)", "improves_dimension": "Quantified Impact"})
    if not has_summary:
        top_actions.append({"improvement": "Add a professional summary tailored to target role", "improves_dimension": "Summary/Positioning"})
    if len(kw_result["missing_core"]) > 0:
        top_actions.append({"improvement": f"Add missing core skills if you have them: {kw_result['missing_core'][0]}", "improves_dimension": "Keyword Coverage"})

    return {
        "target_role": target_role.replace("-", " ").title(),
        "total_score": total,
        "experience_level": "Unknown",
        "experience_context": f"Graduation year {graduation_year}.",
        "quantified_impact": {
            "score": impact_score, "max_score": 30, "points_lost": 30 - impact_score,
            "evidence": f"Found {num_count} numbers/metrics in the resume.", 
            "explanation": "Add more quantified outcomes (e.g., %, $, time saved) to your bullet points to maximize impact." if impact_score < 30 else "Great job including numbers to quantify your impact!"
        },
        "keyword_coverage": kw_result,
        "project_quality": {
            "score": quality_score, "max_score": 20, "points_lost": 20 - quality_score,
            "evidence": "Analyzed bullet point length and detail.", 
            "explanation": "Ensure every project bullet point clearly explains the problem, your action, and the result." if quality_score < 20 else "Bullet points are detailed and structured well."
        },
        "formatting": {
            "score": formatting_score, "max_score": 15, "points_lost": 15 - formatting_score,
            "evidence": f"Found {sections_present}/5 key sections (Summary, Experience, Education, Projects, Skills).", 
            "explanation": "Include clear headers for all standard resume sections to ensure ATS readability." if formatting_score < 15 else "Excellent section structure and formatting."
        },
        "summary_positioning": {
            "score": positioning_score, "max_score": 10, "points_lost": 10 - positioning_score,
            "evidence": "Summary section detected." if has_summary else "No summary section detected.", 
            "explanation": "Tailor your professional summary specifically to the target role to score maximum points." if positioning_score < 10 else "Strong, focused summary section."
        },
        "top_actions": top_actions
    }


def analyze_resume(resume_text: str, target_role: str, graduation_year: int = None) -> dict:
    if not (settings.NVIDIA_API_KEY or settings.OPENROUTER_API_KEY or settings.GROQ_API_KEY):
        return _local_analysis(resume_text, target_role, graduation_year)

    keywords = ROLE_KEYWORDS.get(target_role, ROLE_KEYWORDS["fullstack-engineer"])
    
    def _format_kw(kw):
        return " OR ".join(kw) if isinstance(kw, list) else kw

    core_str = ", ".join([_format_kw(k) for k in keywords["core"]])
    secondary_str = ", ".join([_format_kw(k) for k in keywords["secondary"]])

    prompt = RUBRIC_TEMPLATE.format(
        target_role=target_role.replace("-", " ").title(),
        core_keywords=core_str,
        secondary_keywords=secondary_str,
        graduation_year=graduation_year or "Unknown",
        current_year=datetime.now().year,
        resume_text=resume_text[:8000],
    )

    try:
        content = _call_llm_with_fallback(prompt)
        
        if content.startswith("```json"):
            content = content[7:]
        if content.startswith("```"):
            content = content[3:]
        if content.endswith("```"):
            content = content[:-3]
        result = json.loads(content.strip())

        # Enforce sum mathematically
        total = (
            result.get("quantified_impact", {}).get("score", 0)
            + result.get("keyword_coverage", {}).get("score", 0)
            + result.get("project_quality", {}).get("score", 0)
            + result.get("formatting", {}).get("score", 0)
            + result.get("summary_positioning", {}).get("score", 0)
        )
        result["total_score"] = total
        
        # Ensure the correct structure is returned even if the LLM hallucinated
        return result
    except Exception as e:
        import traceback
        with open("llm_error.txt", "w") as f:
            f.write(traceback.format_exc())
        return _local_analysis(resume_text, target_role, graduation_year)
