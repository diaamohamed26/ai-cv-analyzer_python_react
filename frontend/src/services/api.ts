import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  timeout: 120000,
})

export const checkBackend = async () => {
  const response = await api.get('/health')
  return response.data
}

export const analyzeCV = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/analysis/analyze', formData)
  return response.data
}

export default api