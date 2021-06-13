import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import authApi, { AuthResponse } from '../api/authApi'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../api/client'
import usersApi from '../api/usersApi'
import useLocalStorage from '../hooks/useLocalStorage'
import { User } from '../types'
import message from 'antd/es/message'

interface AuthState {
  authenticaded: boolean
  login: (username: string, password: string) => Promise<void>
  register: (newUser: User) => Promise<void>
  logout: () => void
  user?: User
}

const AuthContext = React.createContext<AuthState | undefined>(undefined)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>()
  const [authenticaded, setAuthenticaded] = useState(false)
  const setAccessToken = useLocalStorage<string | null>(
    ACCESS_TOKEN_KEY,
    null
  )[1]
  const setRefreshToken = useLocalStorage<string | null>(
    REFRESH_TOKEN_KEY,
    null
  )[1]

  useEffect(() => {
    // ao iniciar, verifica se esta logado e obtem o usuário
    const verify = async () => {
      try {
        const me = await usersApi.me()
        // se deu certo é pq os tokens já estão no localstorage
        if (me) {
          setAuthenticaded(true)
          setUser(me)
        }
      } catch (error) {
        setAuthenticaded(false)
        setUser(undefined)
      }
    }
    verify()
  }, [])

  // useCallback para evitar re-renders
  const authenticateUser = useCallback(
    (data: AuthResponse) => {
      setUser(data.user)
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
      setAuthenticaded(true)
    },
    [setAccessToken, setRefreshToken]
  )

  const login = useCallback(
    async (username: string, password: string) => {
      if (username !== '' && password !== '') {
        try {
          const data = await authApi.login(username, password)
          if (data) {
            authenticateUser(data)
          }
        } catch (error) {
          message.error('Credenciais inválidas.')
        }
      }
    },
    [authenticateUser]
  )

  const register = useCallback(
    async (newUser: User) => {
      try {
        const data = await authApi.register(newUser)
        if (data) {
          authenticateUser(data)
        }
      } catch (error) {
        message.error('Erro ao registrar usuário.')
      }
    },
    [authenticateUser]
  )

  const logout = useCallback(() => {
    setAuthenticaded(false)
    setUser(undefined)
    setAccessToken(null)
    setRefreshToken(null)
  }, [setAccessToken, setRefreshToken])

  return (
    <AuthContext.Provider
      value={{ user, authenticaded, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext')
  }
  return context
}
export { AuthProvider, useAuth }
