export default function makeCache({keyGenerator, cache}) {
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
