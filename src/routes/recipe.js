import express from 'express'
import {recipeInformation} from '../controller/recipe.controller'

function getRecipeRoutes() {
  const router = express.Router()

  router.get('/recipe', recipeInformation)
  return router
}

export {getRecipeRoutes}
