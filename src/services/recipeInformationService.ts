import RecipeInformation from 'models/RecipeInformation'
import makeRecipeIdListStub from 'tests/stubs/recipeIdListStub'
import makeRecipeInformationStub from 'tests/stubs/recipeInformationStub'

const scrapeRecipeInformationById = async (recipeId: string) => makeRecipeInformationStub()
const scrapeWeekplanRecipeIds = async (username: string, password: string) => makeRecipeIdListStub()

interface Dependencies {
  scrapeRecipeInformationById: (recipeId: string) => Promise<RecipeInformation>
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
