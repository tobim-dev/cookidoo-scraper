import makeRecipeInformationController from '../controller/recipeInformationController'
import makeRecipeInformationService from '../services/recipeInformationService'
import express, {Router} from 'express'
import makeScrapeCookidooService from '../services/scrapeCookidooService'
import makeCacheService from '../services/cacheService'
import makeRenderService from '../services/renderService'

const {renderPage, getAuthentificationCookie} = makeRenderService()
const {setCachedValue, getCachedValue} = makeCacheService()
const {scrapeRecipeInformationById, scrapeWeekplanRecipeIds} = makeScrapeCookidooService({
  setCachedValue,
  getCachedValue,
  renderPage,
  getAuthentificationCookie,
})
const {listRecipeInformationById, listRecipeInformationByWeekplan} = makeRecipeInformationService({
  scrapeRecipeInformationById,
  scrapeWeekplanRecipeIds,
})
const {getRecipeInformationById, getRecipeInformationByWeekplan} = makeRecipeInformationController({
  listRecipeInformationById,
  listRecipeInformationByWeekplan,
})

function getRoutes(): Router {
  const router = express.Router()
  router.get('/recipe/:recipeId', getRecipeInformationById)
  router.get('/recipes/weekplan', getRecipeInformationByWeekplan) // need to login
  router.get('/recipes/watchlist') // need to login
  router.get('/recipes/customlist') // need to login
  router.get('/recipes/collection/:collectionId') // need to login

  // any additional routes would go here
  return router
}

export {getRoutes}
