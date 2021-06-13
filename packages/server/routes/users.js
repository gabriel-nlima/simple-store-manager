const userUrl = url => {
  return `/users/${url}`
}
export default function usersRoutes(server, opts, next) {
  server.get(userUrl('me'), async function (request, reply) {
    try {
      const { user } = await server.findUserByEmail(
        server,
        request.user.username
      )
      return reply.send(user)
    } catch (error) {
      server.log.error(error)
      return reply.notFound()
    }
  })

  server.put(userUrl('update'), async function (request, reply) {
    try {
      const user = request.body
      if (!user._id) return reply.badRequest()

      const { updated } = await server.updateUser(server, user)

      return reply.send(updated)
    } catch (error) {
      server.log.error(error)
      return reply.internalServerError()
    }
  })

  next()
}
