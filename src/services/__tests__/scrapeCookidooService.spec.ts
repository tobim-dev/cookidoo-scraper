import {JSDOM} from 'jsdom'
import makeScrapeCookidooService from '../scrapeCookidooService'

describe('scrapeService', () => {
  const renderPage = async () => new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)
  const getAuthentificationCookie = async () => 'CookieValue'
  const getCachedValue = () => 'CookieValue'
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const setCachedValue = () => {}

  it('scrape weekplan recipe ids', async () => {
    const scrapeCookidooService = makeScrapeCookidooService({
      renderPage,
      getAuthentificationCookie,
      getCachedValue,
      setCachedValue,
    })

    const expectedRecipeInformation = {
      carbs: '',
      energy: {
        kJ: '',
        kcal: '',
      },
      fat: '',
      name: '',
      numberOfPortions: '',
      protein: '',
      recipeId: 'r44243',
    }

    const recipeInformation = await scrapeCookidooService.scrapeRecipeInformationById('r44243')

    expect(recipeInformation).toEqual(expectedRecipeInformation)
  })
  it('scrape recipe information by id', async () => {
    const scrapeCookidooService = makeScrapeCookidooService({
      renderPage,
      getAuthentificationCookie,
      getCachedValue,
      setCachedValue,
    })

    const recipeIdList = await scrapeCookidooService.scrapeWeekplanRecipeIds('Test', 'Test')

    expect(recipeIdList).toEqual([])
  })
})
