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
    // anexa o token de acesso em todas as requisições dessa instância do axios
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    start() // inicia a barra de progresso
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
    // requisições causaram erros e na próxima navegação redireciona para login
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
