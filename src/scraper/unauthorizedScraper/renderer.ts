import {JSDOM} from 'jsdom'
import {fetchRecipeDOM} from './fetchRecipeDOM'

export type Renderer = {
  renderSiteWithRecipeId: (recipeId: string) => Promise<JSDOM>
}

export default function makeRenderer(): Renderer {
  async function renderSiteWithRecipeId(recipeId: string) {
    const url = process.env.COOKIDOO_RECIPE_BASE_URL
    const response = await fetchRecipeDOM(recipeId, url)
    const dom = new JSDOM(response.body)
    return dom
  }
  return {
    renderSiteWithRecipeId,
  }
}
