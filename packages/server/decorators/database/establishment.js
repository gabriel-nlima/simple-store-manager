export async function getEstablishment(server, _id) {
  const { db } = server.mongo
  const col = await db.collection(server.collections.ESTABLISHMENT)

  const establishment = await col.findOne({ _id: server.stringToId(_id) })

  return { establishment, col }
}

export async function findEstablishments(server, query) {
  const { db } = server.mongo
  const col = await db.collection(server.collections.ESTABLISHMENT)

  const projection = {
    phone: 0,
    type: 0,
  }

  const establishments = []
  const cursor = await col.find(query, {
    projection,
    sort: { name: 1 }, // ordena em ordem alfabetica pelo nome e relevância da pesquisa
  })

  await cursor.forEach(i => {
    establishments.push(i)
  })

  await cursor.close()

  return { establishments, col }
}

export async function createEstablishment(server, data) {
  const { db } = server.mongo
  const col = await db.collection(server.collections.ESTABLISHMENT)

  const created = await server.insert(col, data)

  return { created, col }
}

export async function updateEstablishment(server, data) {
  const { db } = server.mongo
  const col = await db.collection(server.collections.ESTABLISHMENT)

  const updated = await server.update(col, data)

  return { updated, col }
}

export async function deleteEstablishment(server, _id) {
  const { db } = server.mongo
  const col = await db.collection(server.collections.ESTABLISHMENT)

  const { result } = await col.deleteOne({ _id: server.stringToId(_id) })

  return { ok: result.ok, col }
}

export default function establishmentDecorators(server) {
  server.decorate('getEstablishment', getEstablishment)
  server.decorate('findEstablishments', findEstablishments)
  server.decorate('createEstablishment', createEstablishment)
  server.decorate('updateEstablishment', updateEstablishment)
  server.decorate('deleteEstablishment', deleteEstablishment)
}
