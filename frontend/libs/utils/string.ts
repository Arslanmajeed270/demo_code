export const stringToColor = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = `#`
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += (`00` + value.toString(16)).substr(-2)
  }
  return colour
}

export const stringToBoolean = (value: string) => {
  return value === `false` ||
    value === `null` ||
    value === `NaN` ||
    value === `undefined` ||
    value === `0`
    ? false
    : !!value
}

export const generateRandomString = (length: number): string => {
  let result = ``
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const generateUniqueKeyWithPostFix = (
  key: string,
  postFix: number,
  arr: string[],
): string => {
  let findKey = key
  if (postFix > 0) {
    findKey = key + `_${postFix}`
  }
  const index = arr.findIndex((_key) => _key === findKey)
  if (index > -1) {
    return generateUniqueKeyWithPostFix(key, ++postFix, arr)
  }
  return findKey
}
