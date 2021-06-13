import axios from 'axios'
import { start, done } from './progress'

export const ACCESS_TOKEN_KEY = '@_sges/accessToken'
export const REFRESH_TOKEN_KEY = '@_sges/refreshToken'

export const baseURL =
  process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/'

const api = axios.create({
  baseURL: `${baseURL}api`,
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    start()
    return config
  },
  err => {
    done()
    return Promise.reject(err)
  }
)

api.interceptors.response.use(
  response => {
    done()
    return response
  },
  error => {
    // remove o token em caso de erro de acesso
    // o router vai notar a ausencia do token e redirecionar para login
    if (error.response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
    done()
    return Promise.reject(error)
  }
)

export default api
