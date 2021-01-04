import {ListRecipeInformationOnWeekplan} from 'use-cases/listRecipeInformationOnWeekplan'

type HTTPRequest = {
  body: {
    username: string
    password: string
  }
}

export default function makeGetRecipeInformationOnWeekPlan(
  listRecipeInformationOnWeekplan: ListRecipeInformationOnWeekplan,
) {
  return async function getRecipeInformationOnWeekPlan(httpRequest: HTTPRequest) {
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
