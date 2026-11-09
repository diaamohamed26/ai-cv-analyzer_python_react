# AI CV Analyzer 🚀

An AI-powered CV analysis platform built with **React, TypeScript, Python, FastAPI, and Groq AI**. Upload your CV and receive intelligent feedback, professional insights, skill evaluation, and actionable recommendations to improve your resume.

## 📸 Screenshots

### Home Page
![Home Page](photos%20of%20website/home.png)

### Dashboard
![Dashboard](photos%20of%20website/dashboard.png)

### CV Analysis
![Analysis](photos%20of%20website/analysis.png)

## ✨ Features

- **CV Upload:** Upload resumes in PDF and DOCX formats.
- **AI-Powered Analysis:** Analyze CV content using Groq AI.
- **CV Scoring:** Get an overall CV score out of 100.
- **Skills Evaluation:** Identify technical and professional skills.
- **Strengths & Weaknesses:** Understand your CV's strong and weak points.
- **Smart Recommendations:** Receive actionable suggestions to improve your resume.
- **Missing Keywords:** Discover relevant keywords that could strengthen your CV.
- **Experience Level:** Get an estimated professional experience level.
- **Interactive Dashboard:** View analysis results in a modern interface.
- **Report Export:** Print or save your analysis report.

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript / JavaScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic
- PyPDF
- python-docx
- Python Multipart

### AI Integration
- Groq API
- LLM-powered CV analysis
- Structured JSON responses

## 📁 Project Structure

```text
ai-cv-analyzer/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   └── analysis.py
│   │   ├── services/
│   │   │   ├── ai_analyzer.py
│   │   │   └── cv_parser.py
│   │   ├── config.py
│   │   └── main.py
│   ├── .env.example
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── photos of website/
│   ├── home.png
│   ├── dashboard.png
│   └── analysis.png
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites

- Python 3.10+
- Node.js and npm
- A Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/diaamohamed26/ai-cv-analyzer_python_react.git

cd ai-cv-analyzer_python_react
```

### 2. Set up the backend

```bash
cd backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt
```

Create your environment file:

```bash
cp .env.example .env
```

Configure `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-120b
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

Backend URL: http://127.0.0.1:8000

API Documentation: http://127.0.0.1:8000/docs

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend

npm install
```

Create the frontend environment file:

```bash
cp .env.example .env
```

Configure `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend URL: http://localhost:5173

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/api/health` | Backend health check |
| POST | `/api/analysis/analyze` | Upload and analyze a CV |

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Your Groq API key |
| `GROQ_MODEL` | Groq model identifier |
| `VITE_API_URL` | Backend API base URL |

**Important:** Never commit your actual `.env` files or API keys to GitHub. Use `.env.example` as a template.

## 🚀 Future Improvements

- Job description matching
- ATS compatibility scoring
- CV history and database storage
- User authentication
- Multiple CV comparison
- PDF report generation
- OCR support for scanned PDF documents

## 👨‍💻 Author

**Diaa Mohamed**

- GitHub: [@diaamohamed26](https://github.com/diaamohamed26)
- LinkedIn: [Diaa Mohamed](https://linkedin.com/in/diaa-mohamed-a50460125)

---

⭐ If you find this project useful, consider giving it a star!
