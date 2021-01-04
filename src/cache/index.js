import NodeCache from 'node-cache'
import {dayKeyGenerator} from './keyGenerator'
import makeCache from './cacheFactory'

const recipeInformationCache = makeCache({cache: new NodeCache()})
const recipeInformationListCache = makeCache({
  keyGenerator: dayKeyGenerator,
  cache: new NodeCache(),
})

const cache = Object.freeze({
  getRecipeInformationCache: () => recipeInformationCache,
  getrecipeInformationListCache: () => recipeInformationListCache,
})

export default cache
