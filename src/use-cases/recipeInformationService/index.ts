import makeListRecipeInformation from './listRecipeInformation'
import makeListRecipeInformationOnWeekplan from './listRecipeInformationOnWeekPlan'
import scrapeRecipePage from '../scrapeService/scrapeRecipePage'
import scrapeWeekplanPage from '../scrapeService/scrapeWeekplanPage'

const listRecipeInformation = makeListRecipeInformation({
  scrapeRecipePage,
})
const listRecipeInformationOnWeekplan = makeListRecipeInformationOnWeekplan({
  scrapeWeekplanPage,
  scrapeRecipePage,
})

const recipeInformationService = Object.freeze({
  listRecipeInformation,
  listRecipeInformationOnWeekplan,
})

export default recipeInformationService
export {listRecipeInformation, listRecipeInformationOnWeekplan}
