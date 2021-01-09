import NodeCache from 'node-cache'

const makeCache = () => {
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

const cache = makeCache()

export default cache
