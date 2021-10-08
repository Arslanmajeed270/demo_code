import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = () => {
  return {
    getItem: (): Promise<string> => {
      return Promise.resolve(``)
    },
    setItem: (key: string, item: string): Promise<string> => {
      return Promise.resolve(item)
    },
    removeItem: (): Promise<string> => {
      return Promise.resolve(``)
    },
  }
}
const storage =
  typeof window !== `undefined`
    ? createWebStorage(`local`)
    : createNoopStorage()
export default storage
