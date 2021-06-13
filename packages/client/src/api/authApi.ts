import { User } from '../types'
import api from './client'

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

const authApi = {
  login: async (username: string, password: string) => {
    try {
      const response = await api.post<AuthResponse | undefined>('/login', {
        username,
        password,
      })
      console.log(response)
      return response.data
    } catch (error) {
      throw error
    }
  },
  register: async (user: User) => {
    try {
      const response = await api.post<AuthResponse | undefined>(
        '/register',
        user
      )
      console.log(response)
      return response.data
    } catch (error) {
      throw error
    }
  },
  refresh: async () => {}, // TODO
}

export default authApi
