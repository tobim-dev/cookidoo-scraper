import {DOMWindow, JSDOM} from 'jsdom'
import {fetchRecipeDOM} from './fetchRecipeDOM'

export type RenderPageWithRecipeId = (recipeId: string) => Promise<DOMWindow>

export default function makeRenderPageWithRecipeId(): RenderPageWithRecipeId {
  return async function renderPageWithRecipeId(recipeId: string): Promise<DOMWindow> {
    const url = process.env.COOKIDOO_RECIPE_BASE_URL
    const response = await fetchRecipeDOM(recipeId, url)
    const dom = new JSDOM(response.body)
    return dom.window
  }
}
