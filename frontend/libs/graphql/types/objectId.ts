import { ObjectId } from '.'

export const isValidObjectId = (objectId: string): ObjectId => {
  const objectIdExp = /^[0-9a-fA-F]{24}$/

  const isValidObjectId = objectIdExp.test(objectId)
  if (!isValidObjectId) throw Error(`ObjectId is not`)
  return objectId
}
