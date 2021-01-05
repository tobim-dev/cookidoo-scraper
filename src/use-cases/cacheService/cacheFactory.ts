export type Cache = {
  setValue: (key: string, value: string) => void
  getValue: (key: string) => string
}

interface Props {
  cache: {
    set: (key: string, value: string) => void
    get: (key: string) => string | undefined
  }
  keyGenerator?: (key: string) => string
}

export default function makeCache({cache, keyGenerator}: Props): Cache {
  function setValue(key: string, value: string): void {
    const setKey = keyGenerator ? keyGenerator(key) : key
    cache.set(setKey, JSON.stringify(value))
  }

  function getValue(key: string): string {
    const setKey = keyGenerator ? keyGenerator(key) : key
    return cache.get(setKey)
  }

  return {
    setValue,
    getValue,
  }
}
