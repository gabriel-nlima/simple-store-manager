import { loginSchema, registerSchema } from '../schemas/user.js'

/**
 * Rotas de autenticação
 */
export default function authRoutes(server, opts, next) {
  server.post(
    '/login',
    { schema: loginSchema },
    async function (request, reply) {
      const { email, password } = request.body
      try {
        const { user } = await server.findUserByEmail(server, email)

        if (!user) return reply.notFound()

        const isEqual = await server.comparePasswords(password, user.password)
        if (isEqual) {
          delete user.password
          const tokens = await server.generateTokens(server, user.email)
          return reply.send({ user, ...tokens })
        }

        return reply.badRequest()
      } catch (error) {
        server.log.error(error, 'login')
        reply.internalServerError()
      }
    }
  )

  server.post(
    '/register',
    { schema: registerSchema },
    async function (request, reply) {
      const user = { ...request.body }
      if (!user.password) return reply.badRequest()

      try {
        const { created } = await server.createUser(server, user)
        const tokens = await server.generateTokens(server, created.email)

        return reply.send({ user: created, ...tokens })
      } catch (error) {
        server.log.error(error, 'register')
        return reply.internalServerError()
      }
    }
  )
  // TODO Refresh

  next()
}
