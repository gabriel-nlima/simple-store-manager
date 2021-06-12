import { loginSchema, registerSchema } from '../schemas/user.js'

/**
 * Rotas de autenticação
 */
export default function authRoutes(fastify, opts, next) {
  fastify.post(
    '/login',
    { schema: loginSchema },
    async function (request, reply) {
      const { db } = fastify.mongo
      const { email, password } = request.body
      try {
        const col = await db.collection(fastify.collections.USERS)
        const user = await col.findOne({ email })

        if (!user) return reply.notFound()

        if (user.password === password) {
          delete user.password
          return reply.send(user)
        }
        return reply.badRequest()
      } catch (error) {
        fastify.log.error(error, 'login')
        reply.internalServerError()
      }
    }
  )

  fastify.post(
    '/register',
    { schema: registerSchema },
    async function (request, reply) {
      const user = { ...request.body }
      const { db } = fastify.mongo

      if (!user.password) return reply.badRequest()
      try {
        const col = await db.collection(fastify.collections.USERS)
        const created = await fastify.insert(col, user)
        delete created.password

        return reply.send(created)
      } catch (error) {
        fastify.log.error(error, 'register')
        return reply.internalServerError()
      }
    }
  )

  next()
}
