import makeBrowser from './browser'
import makeAuthorizedRecipeScraper from './authorizedRecipeScraper'

const url = process.env.COOKIDOO_HOME_URL

const authorizedRecipeScraper = makeAuthorizedRecipeScraper(makeBrowser, url)
export default authorizedRecipeScraper
