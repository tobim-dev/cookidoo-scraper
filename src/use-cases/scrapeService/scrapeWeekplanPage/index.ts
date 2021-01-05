import {recipeInformationListCache} from '../../cacheService'
import makeBrowser from './browser'
import makeScrapeWeekplanPage from './scrapeWeekplanPage'

const url = process.env.COOKIDOO_HOME_URL

const scrapeWeekplanPage = makeScrapeWeekplanPage({
  makeBrowser,
  url,
  setCachedValue: recipeInformationListCache.setValue,
  getCachedValue: recipeInformationListCache.getValue,
})
export default scrapeWeekplanPage
