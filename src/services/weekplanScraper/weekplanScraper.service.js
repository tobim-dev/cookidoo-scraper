import {startBrowser} from '../utils/browser'
import {scrapeRecipiesInWeekplan} from './weekplanScraper'

const weekplanScraperService = {
  async getWeekplanRecipeIds(userData, url) {
    const browserInstance = startBrowser()
    try {
      const browser = await browserInstance
      return await scrapeRecipiesInWeekplan(browser, userData, url)
    } catch (err) {
      console.log('Could not resolve the browser instance => ', err)
    }
  },
}

export default weekplanScraperService
