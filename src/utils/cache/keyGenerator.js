const dayKeyGenerator = {
  generateKey(key) {
    return key + new Date().toLocaleDateString()
  },
}

export default {dayKeyGenerator}
