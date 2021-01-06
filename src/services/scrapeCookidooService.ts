import type {JSDOM} from 'jsdom'
import renderService from './renderService'

interface Dependencies {
  renderPage: (url: string, authCookie?: string) => Promise<JSDOM>
  getAuthentificationCookie: (username: string, password: string, url: string) => Promise<string>
}

const makeScrapeCookidooService = ({renderPage, getAuthentificationCookie}: Dependencies) => {
  const selectBy = (selector: string, dom: JSDOM): Element => {
    return dom.window.document.querySelector(selector)
  }

  const selectAllBy = (selector: string, dom: JSDOM) => {
    return dom.window.document.querySelectorAll(selector)
  }

  const getNumbersFromInnerHTML = (htmlElement: Element): string[] => {
    return htmlElement.innerHTML.split(' ').filter(Number)
  }

  const scrapeWeekplanRecipeIds = async (username: string, password: string) => {
    const url = 'https://cookidoo.de/foundation/de-DE'
    const cookieValue = await getAuthentificationCookie(username, password, url)
    const renderedPage = await renderPage(`https://cookidoo.de/planning/de-DE/timeline/2021-01-06`, cookieValue)

    const recipeLinks = selectAllBy('a', renderedPage)

    const recipeIds = [...((recipeLinks as unknown) as HTMLLinkElement[])].map(el => el.href.split('/').pop())

    return recipeIds
  }

  const scrapeRecipeInformationById = async (recipeId: string) => {
    const renderedPage = await renderPage(`https://cookidoo.de/recipes/recipe/de-DE/${recipeId}`)

    const recipeTitle = selectBy('h1', renderedPage)
    const naehrwerte = selectBy('#nutritions-desktop > div > dl > dd:nth-child(4)', renderedPage)
    const protein = selectBy('#nutritions-desktop > div > dl > dd:nth-child(6)', renderedPage)
    const carbs = selectBy('#nutritions-desktop > div > dl > dd:nth-child(8)', renderedPage)
    const fat = selectBy('#nutritions-desktop > div > dl > dd:nth-child(10)', renderedPage)
    const numberOfPortions = selectBy('#rc-icon-quantity-icon-text', renderedPage)

    return {
      name: recipeTitle.innerHTML,
      energy: {
        kJ: getNumbersFromInnerHTML(naehrwerte)[0],
        kcal: getNumbersFromInnerHTML(naehrwerte)[1],
      },
      protein: getNumbersFromInnerHTML(protein)[0],
      carbs: getNumbersFromInnerHTML(carbs)[0],
      fat: getNumbersFromInnerHTML(fat)[0],
      numberOfPortions: getNumbersFromInnerHTML(numberOfPortions)[0],
      recipeId: recipeId,
    }
  }

  const scrapeCollectionRecipeIds = (username: string, password: string) => {
    return {} // ToDo: Implement
  }

  return {scrapeWeekplanRecipeIds, scrapeRecipeInformationById, scrapeCollectionRecipeIds}
}

const {renderPage, getAuthentificationCookie} = renderService

const scrapeCookidooService = makeScrapeCookidooService({renderPage, getAuthentificationCookie})

export default scrapeCookidooService
