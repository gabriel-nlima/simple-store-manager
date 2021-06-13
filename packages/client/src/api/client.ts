import axios from 'axios'
import { start, done } from './progress'

export const ACCESS_TOKEN_KEY = '@_sges/accessToken'
export const REFRESH_TOKEN_KEY = '@_sges/refreshToken'

// auth messages
export const MISSING_AUTH = 'MISSING_AUTH'
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED'
export const REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED'
export const TOKEN_INVALID = 'TOKEN_INVALID'

const authMessages = [
  MISSING_AUTH,
  TOKEN_EXPIRED,
  REFRESH_TOKEN_EXPIRED,
  TOKEN_INVALID,
]

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
    console.log(error.response)
    // remove o token em caso de erro de acesso
    // o router vai notar a ausencia do token e redirecionar para login
    if (
      error.response.status === 401 &&
      authMessages.findIndex(v => v.startsWith(error.response.data.message))
    ) {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
    done()
    return Promise.reject(error)
  }
)

export default api
