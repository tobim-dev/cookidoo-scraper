import NodeCache from 'node-cache'

const makeCacheService = () => {
  const cache = new NodeCache()

  const setCachedValue = (key: string, value: string) => {
    cache.set(key, value)
  }

  const getCachedValue = (key: string) => {
    return cache.get(key) as string | undefined
  }

  return {
    setCachedValue,
    getCachedValue,
  }
}

const cacheService = makeCacheService()
export default cacheService
