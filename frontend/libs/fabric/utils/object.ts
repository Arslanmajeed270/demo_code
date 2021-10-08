export const nestedObjectKeysWithDot = (obj: any, propStr = ``): string[] => {
  if (obj === null || obj === undefined) return [propStr]
  const arrayToTraverse = Object.entries(obj)
  if (arrayToTraverse.length === 0) return [propStr]
  return arrayToTraverse.flatMap<string>(([key, val]): string[] => {
    const nestedPropStr = (propStr ? propStr + `.` : ``) + key
    if (typeof val === `object`)
      return nestedObjectKeysWithDot(
        val as Record<string, unknown>,
        nestedPropStr,
      )
    return [nestedPropStr]
  })
}
