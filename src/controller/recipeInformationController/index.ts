import makeRecipeInformationController from './recipeInformationController'
import recipeInformationService from '../../services/recipeInformationService'

const recipeInformationController = makeRecipeInformationController({
  listRecipeInformationById: recipeInformationService.listRecipeInformationById,
  listRecipeInformationByWeekplan: recipeInformationService.listRecipeInformationByWeekplan,
})

export default recipeInformationController
