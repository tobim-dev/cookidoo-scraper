export default function makeGetRecipeInformation({listRecipeInformation}) {
  return async function getRecipeInformation(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const recipeInformation = await listRecipeInformation({
        recipeId: httpRequest.query.recipeId,
      })
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
