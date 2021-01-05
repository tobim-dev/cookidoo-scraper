import {HTTPResponse, HTTPRequest} from 'controller'
import {RecipeInformation} from 'entities/recipeInformation'
import {UserData} from 'entities/userData'

interface Props {
  listRecipeInformationOnWeekplan: (userData: UserData) => Promise<RecipeInformation[]>
}

export default function makeGetRecipeInformationOnWeekPlan({listRecipeInformationOnWeekplan}: Props) {
  return async function getRecipeInformationOnWeekPlan(httpRequest: HTTPRequest): Promise<HTTPResponse> {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const recipeInformationList = await listRecipeInformationOnWeekplan({
        username: httpRequest.body.username,
        password: httpRequest.body.password,
      })
      return {
        headers,
        statusCode: 200,
        body: recipeInformationList,
      }
    } catch (e) {
      // TODO: Error logging
      console.log(e)
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      }
    }
  }
}
