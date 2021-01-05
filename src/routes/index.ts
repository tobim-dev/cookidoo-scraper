import express, {Router} from 'express'
import makeCallback from '../utils/express-callback'
import {getRecipeInformation, getRecipeInformationOnWeekPlan} from '../controller'

function getRoutes(): Router {
  const router = express.Router()
  router.get('/recipe', makeCallback(getRecipeInformation))
  router.post('/weekplan', makeCallback(getRecipeInformationOnWeekPlan))
  // any additional routes would go here
  return router
}

export {getRoutes}
