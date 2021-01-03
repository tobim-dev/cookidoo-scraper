import express from 'express'
import {getRecipeRoutes} from './recipe'
import {getWeekPlanRoutes} from './weekplan'

function getRoutes() {
  const router = express.Router()
  router.use('/', getRecipeRoutes())
  router.use('/', getWeekPlanRoutes())
  // any additional routes would go here
  return router
}
export {getRoutes}
