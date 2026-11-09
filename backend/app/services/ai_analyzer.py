import json
from groq import Groq

from app.config import GROQ_API_KEY, GROQ_MODEL


def analyze_cv(cv_text: str) -> dict:

    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is missing from .env")

    client = Groq(api_key=GROQ_API_KEY)

    prompt = f"""
Analyze this CV as a professional recruitment specialist.

CV:
{cv_text[:25000]}

Return valid JSON with this structure:

{{
    "score": 85,
    "summary": "CV summary",
    "experience_level": "Mid-Level",
    "skills": ["Python", "React"],
    "strengths": ["Strong technical skills"],
    "weaknesses": ["Missing measurable achievements"],
    "recommendations": ["Add measurable results"],
    "missing_keywords": ["FastAPI", "Docker"]
}}

Rules:
- Score must be between 0 and 100.
- Do not invent skills or experience.
- Give useful and practical recommendations.
- Return JSON only.
"""

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are an expert CV analyzer. Return valid JSON only."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2,
        response_format={"type": "json_object"},
    )

    content = response.choices[0].message.content

    if not content:
        raise ValueError("Groq returned an empty response.")

    result = json.loads(content)

    result["score"] = max(0, min(100, int(result.get("score", 0))))

    return result