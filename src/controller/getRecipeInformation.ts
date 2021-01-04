import {ListRecipeInformation} from 'use-cases/listRecipeInformation'

type HTTPRequest = {
  query: {
    recipeId: string
  }
}

export default function makeGetRecipeInformation(
  listRecipeInformation: ListRecipeInformation,
) {
  return async function getRecipeInformation(httpRequest: HTTPRequest) {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const recipeInformation = await listRecipeInformation(
        httpRequest.query.recipeId,
      )
      return {
        headers,
        statusCode: 200,
        body: recipeInformation,
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
