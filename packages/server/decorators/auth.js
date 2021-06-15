import bcrypt from 'bcryptjs'

export async function hashPassword(password) {
  if (password !== undefined && password.length > 0) {
    const hashed = await bcrypt.hash(password, 10)
    return hashed
  }
  return undefined
}

export async function comparePasswords(original, hashed) {
  if (original !== undefined && hashed !== undefined) {
    return await bcrypt.compare(original, hashed)
  }
  return false
}

export async function generateTokens(server, email) {
  const accessToken = await server.jwt.sign(
    { username: email },
    { expiresIn: '4h' }
  )
  const refreshToken = await server.jwt.sign(
    { username: email, refresh: true },
    { expiresIn: '8h' }
  )
  return { accessToken, refreshToken }
}

export default function authDecorators(server) {
  server.decorate('hashPassword', hashPassword)
  server.decorate('comparePasswords', comparePasswords)
  server.decorate('generateTokens', generateTokens)
}
