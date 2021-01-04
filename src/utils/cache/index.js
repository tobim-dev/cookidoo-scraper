import NodeCache from 'node-cache'

function makeCache({keyGenerator} = {}) {
  const cache = new NodeCache()

  function setValue(key, value) {
    const setKey = keyGenerator ? keyGenerator.generateKey(key) : key
    cache.set(setKey, JSON.stringify(value))
  }

  function getValue(key) {
    const setKey = keyGenerator ? keyGenerator.generateKey(key) : key
    return cache.get(setKey)
  }

  return {
    setValue,
    getValue,
  }
}

const dayKeyGenerator = {
  generateKey(key) {
    return key + new Date().toLocaleDateString()
  },
}

const cache = makeCache()
const cacheWithGenerator = makeCache({keyGenerator: dayKeyGenerator})

export {cache, cacheWithGenerator}
