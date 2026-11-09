import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  Sparkles,
  FileText,
  BrainCircuit,
  Target,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'CV Parsing',
    description: 'Extract information from PDF and DOCX resumes.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Analysis',
    description: 'Use Groq AI to evaluate skills, experience, and CV quality.',
  },
  {
    icon: Target,
    title: 'Smart Recommendations',
    description: 'Discover weaknesses and get practical improvement tips.',
  },
]

function Home() {
  return (
    <div className="min-h-screen bg-[#0b0d17] text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 py-24 lg:py-32">
          <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              <Sparkles size={16} />
              AI-powered CV intelligence
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Make your CV
              <span className="block text-purple-400">
                stand out.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-400">
              Analyze your resume with AI. Discover your strengths,
              identify missing skills, and get recommendations to
              improve your career opportunities.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-7 py-4 font-semibold hover:bg-purple-700"
              >
                Analyze My CV
                <ArrowRight size={19} />
              </Link>

              <a
                href="#features"
                className="rounded-xl border border-gray-700 px-7 py-4 font-semibold text-gray-300 hover:bg-white/5"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                PDF and DOCX support
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Groq AI analysis
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Actionable feedback
              </span>
            </div>
          </div>
        </section>

        <section id="features" className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                Features
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Everything you need to improve your CV
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-gray-800 bg-[#141827] p-7"
                >
                  <div className="mb-5 w-fit rounded-xl bg-purple-500/10 p-3 text-purple-400">
                    <Icon size={27} />
                  </div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-3xl border border-purple-500/20 bg-purple-500/5 px-7 py-14 text-center">
            <h2 className="text-3xl font-bold">
              Ready to improve your CV?
            </h2>
            <p className="mt-4 text-gray-400">
              Upload your resume and get started with AI analysis.
            </p>
            <Link
              to="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-7 py-3 font-semibold hover:bg-purple-700"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 px-6 py-7 text-center text-sm text-gray-500">
        AI CV Analyzer · Powered by FastAPI and Groq
      </footer>
    </div>
  )
}

export default Home