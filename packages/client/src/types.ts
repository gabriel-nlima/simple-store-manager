export interface Base {
  _id?: string
  updatedAt?: number
  createdAt?: number
}

export interface User extends Base {
  email: string
  name: string
  password?: string
}

export interface UserWithTokens extends User {
  accessToken: string
  refreshToken: string
}

export interface Establishment extends Base {
  name: string
  local: string
  phone?: string
  type?: string
}
