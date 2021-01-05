import scrapeRecipePage from './scrapeRecipePage'
import scrapeWeekplanPage from './scrapeRecipePage'

const scrapeService = Object.freeze({
  scrapeRecipePage,
  scrapeWeekplanPage,
})

export default scrapeService
export {scrapeRecipePage, scrapeWeekplanPage}
