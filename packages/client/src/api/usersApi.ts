import { User } from '../types'
import api from './client'

export const USERS_URL = '/users'
const usersApi = {
  me: async () => {
    try {
      const { data } = await api.get<User | undefined>(`${USERS_URL}/me`)
      return data
    } catch (error) {
      throw error
    }
  },
  updateUser: async (user: User) => {
    // TODO
  },
}

export default usersApi
