/**
 * Rotas de autenticação
 */
export default function authRoutes(server, opts, next) {
  server.post('/login', async function (request, reply) {
    const { username, password } = request.body
    try {
      const { user } = await server.findUserByEmail(server, username, false)

      if (!user) return reply.notFound()

      const isEqual = await server.comparePasswords(password, user.password)
      if (isEqual) {
        const tokens = await server.generateTokens(server, user.email)
        return reply.send({
          user: { ...user, password: undefined },
          ...tokens,
        })
      }

      return reply.badRequest()
    } catch (error) {
      server.log.error(error, 'login')
      reply.internalServerError()
    }
  })

  server.post('/register', async function (request, reply) {
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
  })
  // TODO Refresh

  next()
}
