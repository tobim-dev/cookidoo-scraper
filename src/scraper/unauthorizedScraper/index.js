import {JSDOM} from 'jsdom'
import {fetchRecipeDOM} from './fetchRecipeDOM'
import makeRecipeScraper from './recipeScraper'

export function makeScraper() {
  async function renderSiteWithRecipeId({recipeId} = {}) {
    const url = process.env.COOKIDOO_RECIPE_BASE_URL
    const response = await fetchRecipeDOM(recipeId, url)
    const dom = new JSDOM(response.body)
    return dom
  }

  return Object.freeze({
    renderSiteWithRecipeId,
  })
}

const recipeScraper = makeRecipeScraper({makeScraper})
export default recipeScraper
