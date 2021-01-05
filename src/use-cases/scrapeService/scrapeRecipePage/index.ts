import makeScrapeRecipePage from './scrapeRecipePage'
import makeRenderPageWithRecipeId from './renderPageWithRecipeId'
import cacheService from '../../cacheService'

const scrapeRecipePage = makeScrapeRecipePage({
  makeRenderPageWithRecipeId,
  setCachedValue: cacheService.setValue,
  getCachedValue: cacheService.getValue,
})
export default scrapeRecipePage
