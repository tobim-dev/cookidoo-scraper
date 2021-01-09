import makeListRecipeInformation from './listRecipeInformation'
import makeScrapeRecipeInformation from './scrapeRecipeInformation'
import cache from '../../helpers/cache'
import renderer from '../../helpers/renderer'

const scrapeRecipeInformation = makeScrapeRecipeInformation({
  renderPage: renderer.renderPage,
  getAuthentificationCookie: renderer.getAuthentificationCookie,
  setCachedValue: cache.setCachedValue,
  getCachedValue: cache.getCachedValue,
})

const recipeInformationService = makeListRecipeInformation({
  scrapeRecipeInformationById: scrapeRecipeInformation.scrapeRecipeInformationById,
  scrapeWeekplanRecipeIds: scrapeRecipeInformation.scrapeWeekplanRecipeIds,
})

export default recipeInformationService
