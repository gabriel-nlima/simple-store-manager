export default function tokenValidator(server) {
  server.addHook('preValidation', async (request, reply) => {
    console.log(request.user)
    await request.jwtVerify()

    try {
      const { username } = request.user
      if (username) {
        const { user } = await server.findUserByEmail(server, username)

        if (!user) {
          server.log.warn(`E-mail ${username} not found.`)
          return reply.notFound()
        }
      }
    } catch (error) {
      server.log.error(error, 'Token validation error.')
      return reply.unauthorized()
    }
  })
}
