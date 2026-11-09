from io import BytesIO
from pathlib import Path

from docx import Document
from pypdf import PdfReader


def extract_cv_text(filename: str, file_content: bytes) -> str:
    extension = Path(filename).suffix.lower()

    if extension == ".pdf":
        reader = PdfReader(BytesIO(file_content))

        if reader.is_encrypted:
            raise ValueError("PDF is password protected.")

        text = "\n".join(
            page.extract_text() or ""
            for page in reader.pages
        )

    elif extension == ".docx":
        document = Document(BytesIO(file_content))

        text_parts = [
            paragraph.text
            for paragraph in document.paragraphs
        ]

        for table in document.tables:
            for row in table.rows:
                text_parts.append(
                    " | ".join(cell.text for cell in row.cells)
                )

        text = "\n".join(text_parts)

    else:
        raise ValueError("Only PDF and DOCX files are supported.")

    if not text.strip():
        raise ValueError("No readable CV text found.")

    return text.strip()
