import Fastify from 'fastify'
import fastifyHelmet from 'fastify-helmet'
import fastifyJWT from 'fastify-jwt'
import fastifyMongodb from 'fastify-mongodb'
import fastifySensible from 'fastify-sensible'
import fastifyStatic from 'fastify-static'
import fastifyCors from 'fastify-cors'
import path from 'path'
import crypto from 'crypto'
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

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
server.register(fastifyHelmet, {
  contentSecurityPolicy: false,
})
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
    // api decorators
    authDecorators(instance)
    userDecorators(instance)
    establishmentDecorators(instance)

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

// arquivos da build de produção do frontend
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
})
server.get('*', function (req, reply) {
  reply.sendFile('index.html')
})

const start = async () => {
  try {
    await server.listen(8080, '0.0.0.0')
    await initIndexes(server.mongo.db)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
