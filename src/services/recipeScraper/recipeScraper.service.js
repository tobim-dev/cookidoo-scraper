import scrapeRecipeInformation from './recipeScraper'

const recipeScraperService = {
  async getRecipeInformation(recipeId, baseURL) {
    try {
      return scrapeRecipeInformation(recipeId, baseURL)
    } catch (err) {
      console.log('There was an error scraping the recipe information: ', err)
    }
  },
}

export default recipeScraperService
