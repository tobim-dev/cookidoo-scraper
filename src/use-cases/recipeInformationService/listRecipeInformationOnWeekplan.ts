import {UserData} from 'entities/userData'
import {RecipeInformation} from '../../entities/recipeInformation'

interface Props {
  scrapeWeekplanPage: (userData: UserData) => Promise<string[]>
  scrapeRecipePage: (recipeId: string) => Promise<RecipeInformation>
}

export type ListRecipeInformationOnWeekplan = (userData: UserData) => Promise<RecipeInformation[]>

export default function makeListRecipeInformationOnWeekplan({
  scrapeWeekplanPage,
  scrapeRecipePage,
}: Props): ListRecipeInformationOnWeekplan {
  return async function listRecipeInformationOnWeekplan(userData: UserData): Promise<RecipeInformation[]> {
    if (!userData.username) {
      throw new Error('You must provide a valid username')
    }

    if (!userData.password) {
      throw new Error('You must provide a valid password')
    }

    const recipeIdList = await scrapeWeekplanPage(userData)

    const recipeInformationList = await Promise.all(recipeIdList.map(recipeId => scrapeRecipePage(recipeId)))

    return recipeInformationList
  }
}
