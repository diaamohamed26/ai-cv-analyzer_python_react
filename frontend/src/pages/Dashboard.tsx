import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import CVUpload from '../components/CVUpload'
import StatCard from '../components/StatCard'
import { analyzeCV, checkBackend } from '../services/api'
import {
  FileText,
  Activity,
  Sparkles,
  Server,
  AlertCircle,
} from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [backendOnline, setBackendOnline] = useState(false)
  const [error, setError] = useState('')
  const [lastResult, setLastResult] = useState(null)

  useEffect(() => {
    checkBackend()
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false))

    const saved = sessionStorage.getItem('cvAnalysis')

    if (saved) {
      try {
        setLastResult(JSON.parse(saved))
      } catch {
        sessionStorage.removeItem('cvAnalysis')
      }
    }
  }, [])

  const handleAnalyze = async (file) => {
    try {
      setLoading(true)
      setError('')

      const response = await analyzeCV(file)

      if (!response.success || !response.analysis) {
        throw new Error('The backend returned an invalid analysis.')
      }

      sessionStorage.setItem('cvAnalysis', JSON.stringify(response))
      setLastResult(response)

      navigate('/analysis')
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Could not analyze the CV. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0d17] text-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 sm:p-8">
          <div className="mx-auto max-w-6xl">

            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mt-2 text-gray-400">
                  Upload and analyze your resume with Groq AI.
                </p>
              </div>

              <div className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
                backendOnline
                  ? 'border-green-500/20 bg-green-500/10 text-green-400'
                  : 'border-red-500/20 bg-red-500/10 text-red-400'
              }`}>
                <span className={`h-2 w-2 rounded-full ${
                  backendOnline ? 'bg-green-400' : 'bg-red-400'
                }`} />
                {backendOnline ? 'Backend Connected' : 'Backend Offline'}
              </div>
            </div>

            <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <StatCard
                title="Backend Status"
                value={backendOnline ? 'Online' : 'Offline'}
                description="FastAPI health check"
                icon={Server}
              />

              <StatCard
                title="Last CV Score"
                value={lastResult?.analysis?.score != null
                  ? `${lastResult.analysis.score}/100`
                  : '—'}
                description="From your latest analysis"
                icon={Activity}
              />

              <StatCard
                title="Last Analyzed CV"
                value={lastResult?.filename ? 'Available' : 'None'}
                description={lastResult?.filename || 'Upload your first CV'}
                icon={FileText}
              />
            </div>

            {!backendOnline && (
              <div className="mb-6 flex gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                <AlertCircle className="shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Backend is not responding.</p>
                  <p className="mt-1 text-red-300/80">
                    Start your FastAPI server at http://127.0.0.1:8000.
                  </p>
                </div>
              </div>
            )}

            <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
              <CVUpload
                onAnalyze={handleAnalyze}
                loading={loading}
              />

              <div className="rounded-2xl border border-gray-800 bg-[#141827] p-6">
                <Sparkles className="mb-4 text-purple-400" size={27} />

                <h2 className="text-lg font-semibold">
                  AI Analysis
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Groq evaluates your CV and provides a score,
                  skills, strengths, weaknesses, and recommendations.
                </p>

                <div className="mt-6 space-y-3 text-sm text-gray-300">
                  <p>✓ CV content extraction</p>
                  <p>✓ Skills identification</p>
                  <p>✓ Strengths and weaknesses</p>
                  <p>✓ Improvement recommendations</p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            {lastResult && (
              <div className="mt-8 rounded-2xl border border-gray-800 bg-[#141827] p-6">
                <h2 className="font-semibold">Previous analysis</h2>
                <p className="mt-2 text-sm text-gray-400">
                  {lastResult.filename}
                </p>
                <button
                  onClick={() => navigate('/analysis')}
                  className="mt-4 rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold hover:bg-purple-700"
                >
                  View Results
                </button>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard