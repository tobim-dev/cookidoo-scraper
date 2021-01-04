import {Cache} from 'cache/cacheFactory'
import {AuthorizedRecipeScraper} from 'scraper/authorizedScraper/authorizedRecipeScraper'
import {RecipeScraper} from 'scraper/unauthorizedScraper/recipeScraper'
import {recipeInformation} from '../entities/recipeInformation'

export type UserData = {
  username: string
  password: string
}

export type ListRecipeInformationOnWeekplan = (
  userData: UserData,
) => Promise<recipeInformation[]>

export default function makeListRecipeInformationOnWeekplan(
  authorizedRecipeScraper: AuthorizedRecipeScraper,
  recipeScraper: RecipeScraper,
  cache: Cache,
): ListRecipeInformationOnWeekplan {
  return async function listRecipeInformationOnWeekplan(userData: UserData) {
    if (!userData.username) {
      throw new Error('You must provide a valid username')
    }

    if (!userData.password) {
      throw new Error('You must provide a valid password')
    }

    if (cache.getValue(userData.username)) {
      return JSON.parse(
        cache.getValue(userData.username),
      ) as recipeInformation[]
    }

    const recipeIdList = await authorizedRecipeScraper.scrapeRecipeIdsOnWeekplan(
      userData,
    )

    const recipeInformationList = await Promise.all(
      recipeIdList.map(recipeId =>
        recipeScraper.scrapeRecipeInformationById(recipeId),
      ),
    )

    cache.setValue(userData.username, JSON.stringify(recipeInformationList))

    return recipeInformationList
  }
}
