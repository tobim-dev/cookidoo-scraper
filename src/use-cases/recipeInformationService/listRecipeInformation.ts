import {RecipeInformation} from '../../entities/recipeInformation'

export type ListRecipeInformation = (recipeId: string) => Promise<RecipeInformation>

interface Props {
  scrapeRecipePage: (recipeId: string) => Promise<RecipeInformation>
}

export default function makeListRecipeInformation({scrapeRecipePage}: Props): ListRecipeInformation {
  return async function listRecipeInformation(recipeId): Promise<RecipeInformation> {
    if (!recipeId) {
      throw new Error('You must supply a recipe id.')
    }

    const isValidId = new RegExp(/^(?:r)(?:.*)$/gm)

    if (!isValidId.test(recipeId)) {
      throw new Error('You must supply a valid recipe id.')
    }

    const recipeInformationScrapeResult = await scrapeRecipePage(recipeId)

    return recipeInformationScrapeResult as RecipeInformation
  }
}
