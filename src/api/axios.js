import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
})

// unwrap the { status, data } envelope from the Go API
api.interceptors.response.use((res) => res.data?.data ?? res.data)

export default api