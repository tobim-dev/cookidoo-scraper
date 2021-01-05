import recipeInformationController from 'controller/recipeInformationController'
import express, {Router} from 'express'

const {getRecipeInformationById, getRecipeInformationByWeekplan} = recipeInformationController

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
