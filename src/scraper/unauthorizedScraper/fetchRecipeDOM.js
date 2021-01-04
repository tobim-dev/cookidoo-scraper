import got from 'got'

export const fetchRecipeDOM = async (recipeId, baseURL) => {
  const url = baseURL + recipeId
  try {
    const response = await got(url)
    return response
  } catch (error) {
    throw new Error(`Could not scrape page with ${recipeId}`)
  }
}
