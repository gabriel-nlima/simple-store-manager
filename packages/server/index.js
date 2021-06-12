import Fastify from 'fastify'
import fastifyHelmet from 'fastify-helmet'
import fastifyJWT from 'fastify-jwt'
import fastifyMongodb from 'fastify-mongodb'
import fastifySensible from 'fastify-sensible'
import { userBodySchema } from './schemas/user.js'
import {
  COLLECTIONS,
  create,
  update,
  stringToId,
  initIndexes,
} from './database/base.js'
import authRoutes from './routes/auth.js'

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

server.decorate('insert', create)
server.decorate('update', update)
server.decorate('collections', COLLECTIONS)
server.decorate('stringToId', stringToId)

server.register(
  function (instance, opts, next) {
    instance.decorate('userEmail', '')
    instance.register(authRoutes)

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
