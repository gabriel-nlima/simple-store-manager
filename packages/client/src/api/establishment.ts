import { Establishment } from '../types'
import { query } from './apiUtils'
import api from './client'

export const ESTABLISHMENT_URL = '/establishments'
const establishmentApi = {
  load: async (id: string) => {
    try {
      const { data } = await api.get<Establishment | undefined>(
        `${ESTABLISHMENT_URL}/load/${id}`
      )
      return data
    } catch (error) {
      throw error
    }
  },
  search: async (srchStr?: string) => {
    try {
      const { data } = await api.get<Establishment[]>(
        query(`${ESTABLISHMENT_URL}/find`, { srchStr })
      )

      return data
    } catch (error) {
      throw error
    }
  },
  create: async (establishment: Establishment) => {
    try {
      const { data } = await api.post<Establishment | undefined>(
        `${ESTABLISHMENT_URL}/create`,
        establishment
      )
      return data
    } catch (error) {
      throw error
    }
  },
  update: async (establishment: Establishment) => {
    try {
      const { data } = await api.put<Establishment | undefined>(
        `${ESTABLISHMENT_URL}/update`,
        establishment
      )
      return data
    } catch (error) {
      throw error
    }
  },
  delete: async (id: string) => {
    try {
      const { data } = await api.delete<boolean>(`${ESTABLISHMENT_URL}/${id}`)
      return data
    } catch (error) {
      throw error
    }
  },
}

export default establishmentApi
