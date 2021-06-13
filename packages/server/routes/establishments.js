const establishmentUrl = url => {
  return `/establishments/${url}`
}

export default function establishmentRoutes(server, opts, next) {
  server.get(establishmentUrl('load/:id'), async function (request, reply) {
    try {
      const { id } = request.params
      if (!id) return reply.badRequest()

      const { establishment } = await server.getEstablishment(server, id)
      return reply.send(establishment)
    } catch (error) {
      server.log.error(error)
      return reply.notFound()
    }
  })

  server.get(establishmentUrl('find'), async function (request, reply) {
    try {
      const { srchStr } = request.query

      let query = {}
      if (srchStr || srchStr !== '') {
        query = { $text: { $search: srchStr, $language: 'none' } }
      }

      const { establishments } = await server.findEstablishments(server, query)
      return reply.send(establishments)
    } catch (error) {
      server.log.error(error)
      return reply.internalServerError()
    }
  })

  server.post(establishmentUrl('create'), async function (request, reply) {
    try {
      const data = request.body

      const { created } = await server.createEstablishment(server, data)

      return reply.send(created)
    } catch (error) {
      server.log.error(error)
      return reply.internalServerError()
    }
  })

  server.put(establishmentUrl('update'), async function (request, reply) {
    try {
      const data = request.body

      const { updated } = await server.updateEstablishment(server, data)

      return reply.send(updated)
    } catch (error) {
      server.log.error(error)
      return reply.internalServerError()
    }
  })

  server.delete(establishmentUrl(':id'), async function (request, reply) {
    try {
      const { id } = request.params

      const { ok } = await server.deleteEstablishment(server, id)

      return reply.send(ok)
    } catch (error) {
      server.log.error(error)
      return reply.internalServerError()
    }
  })

  next()
}
