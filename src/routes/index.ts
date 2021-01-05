import express, {Router} from 'express'
import makeCallback from '../utils/express-callback'
import recipeInformationController from '../controller/recipeInformationController'

function getRoutes(): Router {
  const router = express.Router()
  router.get('/recipe', makeCallback(recipeInformationController.getRecipeInformation))
  router.post('/weekplan', makeCallback(recipeInformationController.getRecipeInformationOnWeekPlan))
  // any additional routes would go here
  return router
}

export {getRoutes}
