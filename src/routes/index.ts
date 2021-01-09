import express, {Router} from 'express'
import recipeInformationController from '../controller/recipeInformationController'

function getRoutes(): Router {
  const router = express.Router()
  router.get('/recipe/:recipeId', recipeInformationController.getRecipeInformationById)
  router.get('/recipes/weekplan', recipeInformationController.getRecipeInformationByWeekplan) // need to login
  router.get('/recipes/watchlist') // need to login
  router.get('/recipes/customlist') // need to login
  router.get('/recipes/collection/:collectionId') // need to login

  // any additional routes would go here
  return router
}

export {getRoutes}
