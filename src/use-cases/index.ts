import makeListRecipeInformation from './listRecipeInformation'
import recipeScraper from '../scraper/unauthorizedScraper'
import makeListRecipeInformationOnWeekplan from './listRecipeInformationOnWeekPlan'
import authorizedRecipeScraper from '../scraper/authorizedScraper'
import {recipeInformationCache, recipeInformationListCache} from '../cache'

const listRecipeInformation = makeListRecipeInformation(
  recipeScraper,
  recipeInformationCache,
)
const listRecipeInformationOnWeekplan = makeListRecipeInformationOnWeekplan(
  authorizedRecipeScraper,
  recipeScraper,
  recipeInformationListCache,
)

const recipeInformationService = Object.freeze({
  listRecipeInformation,
  listRecipeInformationOnWeekplan,
})

export default recipeInformationService
export {listRecipeInformation, listRecipeInformationOnWeekplan}
