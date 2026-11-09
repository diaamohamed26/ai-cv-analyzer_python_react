import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {
  ArrowLeft,
  Download,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Sparkles,
} from 'lucide-react'

function Analysis() {
  const [result, setResult] = useState(null)

  useEffect(() => {
    const saved = sessionStorage.getItem('cvAnalysis')

    if (saved) {
      try {
        setResult(JSON.parse(saved))
      } catch {
        sessionStorage.removeItem('cvAnalysis')
      }
    }
  }, [])

  const analysis = result?.analysis

  const exportReport = () => {
    window.print()
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-[#0b0d17] text-white">
        <Navbar />

        <div className="px-6 py-24 text-center">
          <Sparkles className="mx-auto mb-5 text-purple-400" size={40} />
          <h1 className="text-2xl font-bold">No analysis available</h1>
          <p className="mt-3 text-gray-400">
            Upload a CV to generate your AI report.
          </p>
          <Link
            to="/dashboard"
            className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-700"
          >
            Upload CV
          </Link>
        </div>
      </div>
    )
  }

  const score = Math.min(100, Math.max(0, Number(analysis.score) || 0))

  const sections = [
    {
      title: 'Strengths',
      icon: CheckCircle,
      color: 'text-green-400',
      items: analysis.strengths,
    },
    {
      title: 'Areas to Improve',
      icon: AlertCircle,
      color: 'text-orange-400',
      items: analysis.weaknesses,
    },
    {
      title: 'Recommendations',
      icon: Lightbulb,
      color: 'text-yellow-400',
      items: analysis.recommendations,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0b0d17] text-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 sm:p-8">
          <div className="mx-auto max-w-6xl">

            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <Link
                  to="/dashboard"
                  className="mb-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                >
                  <ArrowLeft size={16} />
                  Back to Dashboard
                </Link>

                <h1 className="text-3xl font-bold">CV Analysis</h1>
                <p className="mt-2 text-gray-400">
                  AI-generated report powered by Groq.
                </p>
              </div>

              <button
                onClick={exportReport}
                className="flex items-center gap-2 rounded-xl border border-gray-700 px-5 py-3 hover:bg-white/5"
              >
                <Download size={18} />
                Export Report
              </button>
            </div>

            {/* Score */}
            <section className="mb-6 rounded-2xl border border-gray-800 bg-[#141827] p-7">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-gray-400">Overall CV Score</p>
                  <h2 className="mt-3 text-5xl font-bold text-purple-400">
                    {score}
                    <span className="text-2xl text-gray-500">/100</span>
                  </h2>
                  <p className="mt-3 text-gray-300">
                    {analysis.experience_level || 'Experience level unavailable'}
                  </p>
                </div>

                <div className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-purple-500/40">
                  <span className="text-3xl font-bold">{score}%</span>
                </div>
              </div>

              <div className="mt-7 h-3 overflow-hidden rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-purple-500 transition-all"
                  style={{ width: `${score}%` }}
                />
              </div>
            </section>

            {/* Summary */}
            <section className="mb-6 rounded-2xl border border-gray-800 bg-[#141827] p-6">
              <h2 className="mb-3 text-xl font-semibold">CV Summary</h2>
              <p className="leading-7 text-gray-300">
                {analysis.summary || 'No summary available.'}
              </p>
              {result.filename && (
                <p className="mt-4 text-sm text-gray-500">
                  Analyzed file: {result.filename}
                </p>
              )}
            </section>

            {/* Skills */}
            <section className="mb-6 rounded-2xl border border-gray-800 bg-[#141827] p-6">
              <h2 className="mb-5 text-xl font-semibold">Detected Skills</h2>

              <div className="flex flex-wrap gap-3">
                {(analysis.skills || []).map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
                  >
                    {skill}
                  </span>
                ))}

                {!analysis.skills?.length && (
                  <p className="text-sm text-gray-500">No skills detected.</p>
                )}
              </div>
            </section>

            {/* AI feedback */}
            <div className="grid gap-6 md:grid-cols-2">
              {sections.map(({ title, icon: Icon, color, items }) => (
                <section
                  key={title}
                  className="rounded-2xl border border-gray-800 bg-[#141827] p-6"
                >
                  <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                    <Icon className={color} size={21} />
                    {title}
                  </h2>

                  <ul className="space-y-3">
                    {(items || []).map((item, index) => (
                      <li key={index} className="flex gap-3 text-sm leading-6 text-gray-300">
                        <span className="text-purple-400">•</span>
                        {item}
                      </li>
                    ))}

                    {!items?.length && (
                      <li className="text-sm text-gray-500">
                        No information provided.
                      </li>
                    )}
                  </ul>
                </section>
              ))}
            </div>

            {/* Keywords */}
            <section className="mt-6 rounded-2xl border border-gray-800 bg-[#141827] p-6">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold">
                <Target className="text-orange-400" />
                Missing Keywords
              </h2>

              <div className="flex flex-wrap gap-3">
                {(analysis.missing_keywords || []).map((keyword, index) => (
                  <span
                    key={`${keyword}-${index}`}
                    className="rounded-lg bg-orange-500/10 px-4 py-2 text-sm text-orange-300"
                  >
                    {keyword}
                  </span>
                ))}

                {!analysis.missing_keywords?.length && (
                  <p className="text-sm text-gray-500">
                    No missing keywords reported.
                  </p>
                )}
              </div>
            </section>

            <p className="mt-6 text-center text-xs text-gray-500">
              AI-generated feedback is advisory. Review suggestions before changing your CV.
            </p>

          </div>
        </main>
      </div>
    </div>
  )
}

export default Analysis