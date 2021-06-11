const fastify = require('fastify')({
  logger: true,
})

fastify.register(require('fastify-sensible'))
fastify.register(require('fastify-helmet'))
fastify.register(require('fastify-jwt'), {
  secret: 'sgessecret@2021',
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await fastify.listen(8080)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
