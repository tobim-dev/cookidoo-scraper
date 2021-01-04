import {startBrowser} from './browser'
import makeAuthorizedRecipeScraper from './authorizedRecipeScraper'

export async function makeBrowser() {
  const browserInstance = await startBrowser()
  return browserInstance
}

const url = process.env.COOKIDOO_HOME_URL

const authorizedRecipeScraper = makeAuthorizedRecipeScraper({makeBrowser, url})
export default authorizedRecipeScraper
