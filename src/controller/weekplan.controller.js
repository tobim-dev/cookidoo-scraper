import {generateUserId} from './utils/generateUserId'
import weekplanScraperService from '../services/weekplanScraper/weekplanScraper.service'
import recipeScraperService from '../services/recipeScraper/recipeScraper.service'
import NodeCache from 'node-cache'

const myCache = new NodeCache()

const getRecipeInformationForRecipeIdList = async (recipeIdList, baseUrl) => {
  return Promise.all(
    recipeIdList.map(recipeId =>
      recipeScraperService.getRecipeInformation(recipeId, baseUrl),
    ),
  )
}

async function recipeInformationInWeek(req, res) {
  //Check for username and password in body
  if (!req.body.username && !req.body.password) {
    return res
      .status(400)
      .send('Please provide your Cookidoo® username and password')
  }

  const userData = {
    username: req.body.username,
    password: req.body.password,
  }

  // Check for nocache param
  const useCache = req.query.nocache !== ''
  const url = process.env.COOKIDOO_HOME_URL
  const recipeBaseUrl = process.env.COOKIDOO_RECIPE_BASE_URL

  let result
  let cachedResult

  if (useCache) cachedResult = myCache.get(generateUserId(userData.username))

  if (!cachedResult) {
    const weekplanRecipeIDs = await weekplanScraperService.getWeekplanRecipeIds(
      userData,
      url,
    )
    result = await getRecipeInformationForRecipeIdList(
      weekplanRecipeIDs,
      recipeBaseUrl,
    )
  } else {
    console.log('Using cached result')
    result = cachedResult
  }

  if (!result) {
    return res.status(500).send('Error scraping the Cookidoo website')
  }

  if (useCache) myCache.set(generateUserId(userData.username), result, 86400)

  res.send(result)
}

export {recipeInformationInWeek}
