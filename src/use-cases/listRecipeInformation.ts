import {recipeInformation} from '../entities/recipeInformation'

export default function makeListRecipeInformation({recipeScraper, cache}) {
  return async function listRecipeInformation({
    recipeId,
  }: {
    recipeId: string
  }): Promise<recipeInformation> {
    if (!recipeId) {
      throw new Error('You must supply a recipe id.')
    }

    const isValidId = new RegExp(/^(?:r)(?:.*)$/gm)

    if (!isValidId.test(recipeId)) {
      throw new Error('You must supply a valid recipe id.')
    }

    if (cache.getValue(recipeId)) {
      return cache.getValue(recipeId)
    }

    const recipeInformationScrapeResult = await recipeScraper.scrapeRecipeInformationById(
      {
        recipeId,
      },
    )

    cache.setValue(recipeId, recipeInformationScrapeResult)

    return recipeInformationScrapeResult as recipeInformation
  }
}
