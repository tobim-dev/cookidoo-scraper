module.exports = {
  listRecipeInformationById: jest.fn(async (recipeId: string) => 'Test'),
  listRecipeInformationByWeekplan: jest.fn(async (username: string, password: string) => ['Test', ['Test']]),
}
