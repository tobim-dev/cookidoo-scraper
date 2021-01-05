import makeGetRecipeInformation from './getRecipeInformation'
import {listRecipeInformation, listRecipeInformationOnWeekplan} from '../../use-cases/recipeInformationService'
import makeGetRecipeInformationOnWeekPlan from './getRecipeInformationOnWeekplan'
import {RecipeInformation} from 'entities/recipeInformation'

type Body = RecipeInformation | RecipeInformation[]

export type HTTPResponse = {
  headers: {
    'Content-Type': string
  }
  statusCode: number
  body:
    | Body
    | {
        error: string
      }
}

export type HTTPRequest = {
  body: {
    username: string
    password: string
  }
  query: {
    recipeId: string
  }
}

const getRecipeInformation = makeGetRecipeInformation({listRecipeInformation})
const getRecipeInformationOnWeekPlan = makeGetRecipeInformationOnWeekPlan({listRecipeInformationOnWeekplan})

const recipeInformationController = Object.freeze({
  getRecipeInformation,
  getRecipeInformationOnWeekPlan,
})

export default recipeInformationController
export {getRecipeInformation, getRecipeInformationOnWeekPlan}
