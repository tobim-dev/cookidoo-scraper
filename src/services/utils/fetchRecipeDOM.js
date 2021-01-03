import got from 'got'

export const fetchRecipeDOM = async (recipeId, baseURL) => {
  const url = baseURL + recipeId
  return await got(url)
}
