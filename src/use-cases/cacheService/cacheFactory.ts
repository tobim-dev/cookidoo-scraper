import NodeCache from 'node-cache'
import {KeyGenerator} from './keyGenerator'

export type Cache = {
  setValue: (key: string, value: string) => void
  getValue: (key: string) => string
}

export default function makeCache(cache: NodeCache, keyGenerator?: KeyGenerator): Cache {
  function setValue(key: string, value: string): void {
    const setKey = keyGenerator ? keyGenerator.generateKey(key) : key
    cache.set(setKey, JSON.stringify(value))
  }

  function getValue(key: string): string {
    const setKey = keyGenerator ? keyGenerator.generateKey(key) : key
    return cache.get(setKey)
  }

  return {
    setValue,
    getValue,
  }
}
