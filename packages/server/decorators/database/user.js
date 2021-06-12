export async function findUserByEmail(server, email) {
  const { db } = server.mongo
  const col = await db.collection(server.collections.USERS)
  const user = await col.findOne({ email })

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

export default function userDecorators(server) {
  server.decorate('createUser', createUser)
  server.decorate('findUserByEmail', findUserByEmail)
}