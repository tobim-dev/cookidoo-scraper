const scrapeRecipeInformationById = async (recipeId: string) => recipeId
const scrapeWeekplanRecipeIds = async (username: string, password: string) => [username, password]

interface Dependencies {
  scrapeRecipeInformationById: (recipeId: string) => Promise<string>
  scrapeWeekplanRecipeIds: (username: string, password: string) => Promise<string[]>
}

const makeRecipeInformationService = ({scrapeRecipeInformationById, scrapeWeekplanRecipeIds}: Dependencies) => {
  const listRecipeInformationById = async (recipeId: string) => {
    const recipeInformation = await scrapeRecipeInformationById(recipeId)
    return recipeInformation
  }

  const listRecipeInformationByWeekplan = async (username: string, password: string) => {
    const recipeIdList = await scrapeWeekplanRecipeIds(username, password)
    const recipeInformationList = await Promise.all(recipeIdList.map(recipeId => scrapeRecipeInformationById(recipeId)))
    return recipeInformationList
  }

  return {
    listRecipeInformationById,
    listRecipeInformationByWeekplan,
  }
}

const recipeInformationService = makeRecipeInformationService({scrapeRecipeInformationById, scrapeWeekplanRecipeIds})

export default recipeInformationService
