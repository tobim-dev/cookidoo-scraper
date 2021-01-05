const generateMidnightInValidKey = (key: string): string => {
  return key + new Date().toLocaleDateString()
}
export {generateMidnightInValidKey}
