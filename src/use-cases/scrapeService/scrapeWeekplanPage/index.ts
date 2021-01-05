import makeBrowser from './browser'
import makeScrapeWeekplanPage from './scrapeWeekplanPage'
import cacheService from '../../cacheService'

const url = process.env.COOKIDOO_HOME_URL

const scrapeWeekplanPage = makeScrapeWeekplanPage({
  makeBrowser,
  url,
  setCachedValue: cacheService.setValueDayValid,
  getCachedValue: cacheService.getValueDayValid,
})
export default scrapeWeekplanPage
