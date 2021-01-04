import makeGetRecipeInformation from './getRecipeInformation'
import {listRecipeInformation, listRecipeInformationOnWeekplan} from '../use-cases'
import makeGetRecipeInformationOnWeekPlan from './getRecipeInformationOnWeelplan'

const getRecipeInformation = makeGetRecipeInformation(listRecipeInformation)
const getRecipeInformationOnWeekPlan = makeGetRecipeInformationOnWeekPlan(listRecipeInformationOnWeekplan)

const recipeInformationController = Object.freeze({
  getRecipeInformation,
  getRecipeInformationOnWeekPlan,
})

export default recipeInformationController
export {getRecipeInformation, getRecipeInformationOnWeekPlan}
