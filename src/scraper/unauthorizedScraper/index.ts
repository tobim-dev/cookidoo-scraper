import makeRecipeScraper from './recipeScraper'
import makeRenderer from './renderer'

const recipeScraper = makeRecipeScraper(makeRenderer)
export default recipeScraper
