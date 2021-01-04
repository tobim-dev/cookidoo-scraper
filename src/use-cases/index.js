import makeListRecipeInformation from './listRecipeInformation'
import recipeScraper from '../scraper/unauthorizedScraper'
import makeListRecipeInformationOnWeekplan from './listRecipeInformationOnWeekPlan'
import authorizedRecipeScraper from '../scraper/authorizedScraper'
import {cache, cacheWithGenerator} from '../utils/cache'

const listRecipeInformation = makeListRecipeInformation({recipeScraper, cache})
const listRecipeInformationOnWeekplan = makeListRecipeInformationOnWeekplan({
  authorizedRecipeScraper,
  recipeScraper,
  cache: cacheWithGenerator,
})

const recipeInformationService = Object.freeze({
  listRecipeInformation,
  listRecipeInformationOnWeekplan,
})

export default recipeInformationService
export {listRecipeInformation, listRecipeInformationOnWeekplan}
