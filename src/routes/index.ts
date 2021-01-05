import recipeInformationController from 'controller/recipeInformationController'
import express, {Router} from 'express'

const {getRecipeInformationById, getRecipeInformationByWeekplan} = recipeInformationController

function getRoutes(): Router {
  const router = express.Router()
  router.get('/recipe/:recipeId', getRecipeInformationById)
  router.get('/recipes/weekplan', getRecipeInformationByWeekplan)
  // any additional routes would go here
  return router
}

export {getRoutes}
