export const COLLECTIONS = {
  USERS: 'users',
  ESTABLISHMENT: 'establishment',
}

export function stringToId(id) {
  return new ObjectID(id)
}

export function idToString(id) {
  return id.toHexString()
}

export function beforeCreate(document) {
  return { ...document, createdAt: Date.now(), updatedAt: Date.now() }
}

export function beforeUpdate(document) {
  return { ...document, updatedAt: Date.now() }
}

export async function create(collection, document) {
  const result = await collection.insertOne(beforeCreate(document))
  return result.ops[0]
}

export async function update(collection, document) {
  const result = await collection.findOneAndUpdate(
    { _id: stringToId(document._id) },
    { $set: beforeUpdate(document) },
    { ignoreUndefined: true, returnDocument: 'after' }
  )
  return result.value
}

export async function initIndexes(db) {
  await db.createIndex(
    COLLECTIONS.USERS,
    { email: 1 },
    { unique: true, background: true }
  )
}

export default function databaseDecorators(server) {
  server.decorate('insert', create)
  server.decorate('update', update)
  server.decorate('collections', COLLECTIONS)
  server.decorate('stringToId', stringToId)
}
