import express from 'express'
import {recipeInformationInWeek} from '../controller/weekplan.controller'

function getWeekPlanRoutes() {
  const router = express.Router()
  router.post('/weekplan', recipeInformationInWeek)
  return router
}

export {getWeekPlanRoutes}
