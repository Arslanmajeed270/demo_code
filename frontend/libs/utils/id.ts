import { generateRandomString } from '.'

export const generateId = (length: number): string => {
  return generateRandomString(length)
}
