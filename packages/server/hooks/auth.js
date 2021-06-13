import { TOKEN_INVALID } from '../consts.js'

export default function tokenValidator(server) {
  server.addHook('preValidation', async (request, reply) => {
    await request.jwtVerify()

    try {
      const { username } = request.user
      console.log(request.user)
      if (username) {
        const { user } = await server.findUserByEmail(server, username)

        if (!user) {
          server.log.warn(`E-mail ${username} not found.`)
          return reply.unauthorized(TOKEN_INVALID)
        }
      }
    } catch (error) {
      server.log.error(error, 'Token validation error.')
      return reply.unauthorized(TOKEN_INVALID)
    }
  })
}
