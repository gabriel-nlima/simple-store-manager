import Fastify from 'fastify'
import fastifyHelmet from 'fastify-helmet'
import fastifyJWT from 'fastify-jwt'
import fastifyMongodb from 'fastify-mongodb'
import fastifySensible from 'fastify-sensible'
import fastifyCors from 'fastify-cors'
import { userBodySchema } from './schemas/user.js'
import databaseDecorators, { initIndexes } from './decorators/database/base.js'
import { jwtCustomMessages } from './consts.js'
import authRoutes from './routes/auth.js'
import authDecorators from './decorators/auth.js'
import userDecorators from './decorators/database/user.js'
import establishmentDecorators from './decorators/database/establishment.js'
import tokenValidator from './hooks/auth.js'
import usersRoutes from './routes/users.js'
import establishmentRoutes from './routes/establishments.js'

const server = Fastify({
  logger: {
    level: 'info',
    prettyPrint: true,
  },
})

// shared schemas
server.addSchema(userBodySchema)

// plugins
server.register(fastifySensible)
server.register(fastifyHelmet)
server.register(fastifyCors)
server.register(fastifyJWT, {
  secret: 'sgessecret@2021',
  messages: jwtCustomMessages,
})
server.register(fastifyMongodb, {
  forceClose: true,
  useNewUrlParser: true,
  database: '_sges',
  url: 'mongodb://localhost:27017/_sges',
  useUnifiedTopology: true,
})

databaseDecorators(server)

server.register(
  function (instance, opts, next) {
    // api decoratos
    authDecorators(instance)
    userDecorators(instance)
    establishmentDecorators(instance)
    // instance.get('/t', async (req, reply) => {
    //   const a = await instance.mongo.db.collection('aa').find({})
    //   a.for
    //   reply.badGateway()
    //   reply.unauthorized()
    // })

    // api routes
    instance.register(authRoutes)

    // secure api routes
    instance.register(function (secureInstance, secureOpts, sNext) {
      // validator hook
      tokenValidator(secureInstance)

      // secured routes
      secureInstance.register(usersRoutes)
      secureInstance.register(establishmentRoutes)
      sNext()
    })

    next()
  },
  { prefix: '/api' }
)

const start = async () => {
  try {
    await server.listen(8080)
    await initIndexes(server.mongo.db)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
