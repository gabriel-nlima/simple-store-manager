import Fastify from 'fastify'
import fastifyHelmet from 'fastify-helmet'
import fastifyJWT from 'fastify-jwt'
import fastifyMongodb from 'fastify-mongodb'
import fastifySensible from 'fastify-sensible'
import { userBodySchema } from './schemas/user.js'
import databaseDecorators, {
  COLLECTIONS,
  create,
  update,
  stringToId,
  initIndexes,
} from './decorators/database/base.js'
import authRoutes from './routes/auth.js'
import authDecorators from './decorators/auth.js'
import userDecorators from './decorators/database/user.js'
import tokenValidator from './hooks/auth.js'

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
server.register(fastifyJWT, {
  secret: 'sgessecret@2021',
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

    // api routes
    instance.register(authRoutes)

    // secure api routes
    instance.register(function (secureInstance, secureOpts, sNext) {
      // validator hook
      tokenValidator(secureInstance)

      // secured routes
      // TODO others routes
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
