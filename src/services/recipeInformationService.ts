import RecipeInformation from '../models/RecipeInformation'
import scrapeCookidooService from './scrapeCookidooService'

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

const {scrapeRecipeInformationById, scrapeWeekplanRecipeIds} = scrapeCookidooService
const recipeInformationService = makeRecipeInformationService({scrapeRecipeInformationById, scrapeWeekplanRecipeIds})

export default recipeInformationService
