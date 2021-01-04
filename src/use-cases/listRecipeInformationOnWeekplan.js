export default function makeListRecipeInformationOnWeekplan({
  authorizedRecipeScraper,
  recipeScraper,
  cache,
}) {
  return async function listRecipeInformationOnWeekplan({userData} = {}) {
    if (!userData.username) {
      throw new Error('You must provide a valid username')
    }

    if (!userData.password) {
      throw new Error('You must provide a valid password')
    }

    if (cache.getValue(userData.username)) {
      return cache.getValue(userData.username)
    }

    const recipeIdList = await authorizedRecipeScraper.scrapeRecipeIdsOnWeekplan(
      {
        userData,
      },
    )

    const recipeInformationList = await Promise.all(
      recipeIdList.map(recipeId =>
        recipeScraper.scrapeRecipeInformationById({
          recipeId,
        }),
      ),
    )

    cache.setValue(userData.username, recipeInformationList)

    return recipeInformationList
  }
}
