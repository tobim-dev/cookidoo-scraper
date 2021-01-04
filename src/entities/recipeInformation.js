export default function buildMakeRecipeInformation() {
  return function makeRecipeInformation({
    name,
    energy,
    protein,
    carbs,
    fat,
    numberOfPortions,
    recipeId,
  } = {}) {
    if (!name) {
      throw new Error('Recipe Information must have name')
    }

    if (!energy.kcal) {
      throw new Error(
        'Recipe Information must have energy with kcal information',
      )
    }

    if (!energy.kJ) {
      throw new Error('Recipe Information must have energy with kJ information')
    }

    if (!protein) {
      throw new Error('Recipe Information must have protein information')
    }

    if (!carbs) {
      throw new Error('Recipe Information must have carbs information')
    }

    if (!fat) {
      throw new Error('Recipe Information must have fat information')
    }

    if (!numberOfPortions) {
      throw new Error(
        'Recipe Information must have numberOfPortions information',
      )
    }

    if (!recipeId) {
      throw new Error('Recipe Information must have a valid recipe Id')
    }

    return Object.freeze({
      getName: () => name,
      getEnergy: () => energy,
      getKcal: () => energy.kcal,
      getKJ: () => energy.kJ,
      getProtein: () => protein,
      getCarbs: () => carbs,
      getFat: () => fat,
      getNumberOfPortions: () => numberOfPortions,
      getRecipeId: () => recipeId,
    })
  }
}
