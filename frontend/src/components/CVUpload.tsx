import { useRef, useState } from 'react'
import {
  Upload,
  FileText,
  X,
  Sparkles,
  LoaderCircle,
} from 'lucide-react'

function CVUpload({ onAnalyze, loading = false }) {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const selectFile = (selectedFile) => {
    setError('')

    if (!selectedFile) return

    const extension = selectedFile.name.split('.').pop()?.toLowerCase()

    if (!['pdf', 'docx'].includes(extension)) {
      setError('Please upload a PDF or DOCX file.')
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must not exceed 10 MB.')
      return
    }

    setFile(selectedFile)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    selectFile(event.dataTransfer.files?.[0])
  }

  const handleSubmit = () => {
    if (!file || loading) return
    onAnalyze?.(file)
  }

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#141827] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Upload your CV
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Upload your resume to receive an AI-powered assessment.
        </p>
      </div>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !loading && inputRef.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-gray-700 bg-[#0b0d17] p-8 text-center transition hover:border-purple-500"
      >
        <Upload className="mx-auto mb-4 text-purple-400" size={36} />

        <p className="font-medium text-white">
          Drag and drop your CV here
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Or click to browse PDF or DOCX
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          disabled={loading}
          onChange={(event) => {
            selectFile(event.target.files?.[0])
            event.target.value = ''
          }}
        />
      </div>

      {file && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-700 bg-[#0b0d17] p-4">
          <div className="flex min-w-0 items-center gap-3">
            <FileText className="shrink-0 text-purple-400" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={() => setFile(null)}
            disabled={loading}
            className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
            aria-label="Remove selected file"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-400">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!file || loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <>
            <LoaderCircle className="animate-spin" size={19} />
            Analyzing with Groq...
          </>
        ) : (
          <>
            <Sparkles size={19} />
            Analyze CV
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-gray-500">
        Maximum file size: 10 MB
      </p>
    </div>
  )
}

export default CVUpload