import type {HTTPResponse, HTTPRequest} from 'controller'
import type {RecipeInformation} from 'entities/recipeInformation'
interface Props {
  listRecipeInformation: (recipeId: string) => Promise<RecipeInformation>
}

export default function makeGetRecipeInformation({listRecipeInformation}: Props) {
  return async function getRecipeInformation(httpRequest: HTTPRequest): Promise<HTTPResponse> {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const recipeInformation = await listRecipeInformation(httpRequest.query.recipeId)
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
