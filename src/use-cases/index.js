import makeListRecipeInformation from './listRecipeInformation'
import recipeScraper from '../scraper/unauthorizedScraper'
import makeListRecipeInformationOnWeekplan from './listRecipeInformationOnWeekPlan'
import authorizedRecipeScraper from '../scraper/authorizedScraper'
import cache from '../utils/cache'

const listRecipeInformation = makeListRecipeInformation({
  recipeScraper,
  cache: cache.getRecipeInformationCache(),
})
const listRecipeInformationOnWeekplan = makeListRecipeInformationOnWeekplan({
  authorizedRecipeScraper,
  recipeScraper,
  cache: cache.getrecipeInformationListCache(),
})

const recipeInformationService = Object.freeze({
  listRecipeInformation,
  listRecipeInformationOnWeekplan,
})

export default recipeInformationService
export {listRecipeInformation, listRecipeInformationOnWeekplan}
