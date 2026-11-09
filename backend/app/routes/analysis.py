from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile
from groq import APIConnectionError, APIStatusError, RateLimitError

from app.config import ALLOWED_EXTENSIONS, MAX_FILE_SIZE
from app.services.cv_parser import extract_cv_text
from app.services.ai_analyzer import analyze_cv

router = APIRouter(prefix="/api/analysis", tags=["CV Analysis"])


@router.post("/analyze")
async def analyze_uploaded_cv(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="Please select a CV file.")

    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported."
        )

    try:
        file_content = await file.read(MAX_FILE_SIZE + 1)

        if not file_content:
            raise HTTPException(status_code=400, detail="The file is empty.")

        if len(file_content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="Maximum file size is 10 MB."
            )

        cv_text = extract_cv_text(file.filename, file_content)
        analysis = analyze_cv(cv_text)

        return {
            "success": True,
            "filename": file.filename,
            "analysis": analysis
        }

    except HTTPException:
        raise

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    except RateLimitError:
        raise HTTPException(
            status_code=429,
            detail="Groq rate limit reached. Please try again later."
        )

    except APIConnectionError:
        raise HTTPException(
            status_code=503,
            detail="Could not connect to Groq. Please try again."
        )

    except APIStatusError as error:
        raise HTTPException(
            status_code=502,
            detail=f"Groq API error: {error.status_code}"
        )

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="CV analysis failed. Check the backend logs."
        )

    finally:
        await file.close()