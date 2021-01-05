import makeScrapeRecipePage from './scrapeRecipePage'
import makeRenderPageWithRecipeId from './renderPageWithRecipeId'
import {recipeInformationCache} from '../../cache'

const scrapeRecipePage = makeScrapeRecipePage({
  makeRenderPageWithRecipeId,
  setCachedValue: recipeInformationCache.setValue,
  getCachedValue: recipeInformationCache.getValue,
})
export default scrapeRecipePage
