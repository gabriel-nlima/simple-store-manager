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
  updateMe: async (fields: { [x: string]: any }) => {
    try {
      const { data } = await api.put<User | undefined>(`${USERS_URL}/me`, {
        fields,
      })
      return data
    } catch (error) {
      throw error
    }
  },
}

export default usersApi
