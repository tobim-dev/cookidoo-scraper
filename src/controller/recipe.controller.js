import recipeScraperService from '../services/recipeScraper/recipeScraper.service'
import NodeCache from 'node-cache'

const myCache = new NodeCache()

async function recipeInformation(req, res) {
  if (!req.query.recipeId) {
    return res.status(400).send('Please provide a Recipie ID')
  }
  const recipeId = req.query.recipeId
  const baseURL = process.env.COOKIDOO_RECIPE_BASE_URL
  console.log(baseURL)

  const cachedResult = myCache.get(recipeId)

  let result
  if (!cachedResult) {
    result = await recipeScraperService.getRecipeInformation(recipeId, baseURL)
  } else {
    result = cachedResult
  }

  if (!result) return res.status(500).send('Error scraping the recipe')

  myCache.set(recipeId, result, 86400)

  res.send(result)
}

export {recipeInformation}
