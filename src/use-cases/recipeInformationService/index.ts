import makeListRecipeInformation from './listRecipeInformation'
import makeListRecipeInformationOnWeekplan from './listRecipeInformationOnWeekPlan'
import scrapeService from '../scrapeService'

const listRecipeInformation = makeListRecipeInformation({
  scrapeRecipePage: scrapeService.scrapeRecipePage,
})
const listRecipeInformationOnWeekplan = makeListRecipeInformationOnWeekplan({
  scrapeWeekplanPage: scrapeService.scrapeWeekplanPage,
  scrapeRecipePage: scrapeService.scrapeRecipePage,
})

const recipeInformationService = Object.freeze({
  listRecipeInformation,
  listRecipeInformationOnWeekplan,
})

export default recipeInformationService
export {listRecipeInformation, listRecipeInformationOnWeekplan}
