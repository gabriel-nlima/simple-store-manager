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

  next()
}
