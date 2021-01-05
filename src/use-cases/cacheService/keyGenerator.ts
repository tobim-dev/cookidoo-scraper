export type KeyGenerator = {
  generateKey(key: string): string
}

const dayKeyGenerator: KeyGenerator = {
  generateKey(key: string) {
    return key + new Date().toLocaleDateString()
  },
}

export default dayKeyGenerator
