import NodeCache from 'node-cache'
import dayKeyGenerator from './keyGenerator'
import makeCache from './cacheFactory'

const cache = new NodeCache()

const recipeInformationCache = makeCache(cache)
const recipeInformationListCache = makeCache(cache, dayKeyGenerator)

export {recipeInformationCache, recipeInformationListCache}
