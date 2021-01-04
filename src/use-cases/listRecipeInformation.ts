import {Cache} from 'cache/cacheFactory'
import {RecipeScraper} from 'scraper/unauthorizedScraper/recipeScraper'
import {recipeInformation} from '../entities/recipeInformation'

export type ListRecipeInformation = (
  recipeId: string,
) => Promise<recipeInformation>

export default function makeListRecipeInformation(
  recipeScraper: RecipeScraper,
  cache: Cache,
): ListRecipeInformation {
  return async function listRecipeInformation(
    recipeId,
  ): Promise<recipeInformation> {
    if (!recipeId) {
      throw new Error('You must supply a recipe id.')
    }

    const isValidId = new RegExp(/^(?:r)(?:.*)$/gm)

    if (!isValidId.test(recipeId)) {
      throw new Error('You must supply a valid recipe id.')
    }

    if (cache.getValue(recipeId)) {
      return JSON.parse(cache.getValue(recipeId))
    }

    const recipeInformationScrapeResult = await recipeScraper.scrapeRecipeInformationById(
      recipeId,
    )

    cache.setValue(recipeId, JSON.stringify(recipeInformationScrapeResult))

    return recipeInformationScrapeResult as recipeInformation
  }
}
