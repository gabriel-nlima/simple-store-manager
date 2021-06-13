export async function findUserByEmail(server, email, removePassword = true) {
  const { db } = server.mongo

  const projection = removePassword ? { password: 0 } : undefined

  const col = await db.collection(server.collections.USERS)
  const user = await col.findOne({ email }, { projection })

  // retorna a collection para fazer outras operações no banco
  return { user, col }
}

export async function createUser(server, data) {
  const { db } = server.mongo
  const col = await db.collection(server.collections.USERS)

  // hash the password
  const password = await server.hashPassword(data.password)

  const created = await server.insert(col, { ...data, password })
  delete created.password

  return { created, col }
}

export async function updateUser(server, data) {
  const { db } = server.mongo
  const col = await db.collection(server.collections.USERS)

  if (!data._id || data._id === '') return { updated: null, col }

  const updated = await server.update(col, { ...data })
  delete updated.password

  return { updated, col }
}

export default function userDecorators(server) {
  server.decorate('createUser', createUser)
  server.decorate('findUserByEmail', findUserByEmail)
  server.decorate('updateUser', updateUser)
}
