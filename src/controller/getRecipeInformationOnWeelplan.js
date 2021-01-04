export default function makeGetRecipeInformationOnWeekPlan({
  listRecipeInformationOnWeekplan,
}) {
  return async function getRecipeInformationOnWeekPlan(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    }
    try {
      const recipeInformationList = await listRecipeInformationOnWeekplan({
        userData: {
          username: httpRequest.body.username,
          password: httpRequest.body.password,
        },
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
