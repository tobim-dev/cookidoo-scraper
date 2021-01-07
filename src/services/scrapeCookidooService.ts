import type {JSDOM} from 'jsdom'
import config from '../config'

type renderOptions = {
  authCookie?: string
  headerValues?: any
}
interface Dependencies {
  renderPage: (url: string, {authCookie, headerValues}?: renderOptions) => Promise<JSDOM>
  getAuthentificationCookie: (username: string, password: string, url: string) => Promise<string>
  getCachedValue: (key: string) => string | undefined
  setCachedValue: (key: string, value: string) => void
}

const makeScrapeCookidooService = ({
  renderPage,
  getAuthentificationCookie,
  getCachedValue,
  setCachedValue,
}: Dependencies) => {
  const formatDate = (date: Date) => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const selectBy = (selector: string, dom: JSDOM): Element => {
    return dom.window.document.querySelector(selector)
  }

  const selectAllBy = (selector: string, dom: JSDOM) => {
    return dom.window.document.querySelectorAll(selector)
  }

  const getNumbersFromInnerHTML = (htmlElement: Element): string[] => {
    return htmlElement?.innerHTML.split(' ').filter(Number)
  }

  const scrapeWeekplanRecipeIds = async (username: string, password: string) => {
    const cookieValue = getCachedValue(`${username}-authCookie`)
      ? getCachedValue(`${username}-authCookie`)
      : await getAuthentificationCookie(username, password, config.urls.base)

    setCachedValue(`${username}-authCookie`, cookieValue)

    const todayDate = formatDate(new Date())

    let renderedPage = await renderPage(`${config.urls.timeline}${todayDate}`, {
      authCookie: cookieValue,
      headerValues: {
        'X-Requested-With': 'xmlhttprequest',
      },
    })

    if (!renderedPage) {
      const newCookieValue = await getAuthentificationCookie(username, password, config.urls.base)
      renderedPage = await renderPage(`${config.urls.timeline}${todayDate}`, {
        authCookie: newCookieValue,
        headerValues: {
          'X-Requested-With': 'xmlhttprequest',
        },
      })
      setCachedValue(`${username}-authCookie`, newCookieValue)
    }

    const recipeLinks = selectAllBy('a', renderedPage)

    const recipeIds = [...((recipeLinks as unknown) as HTMLLinkElement[])].map(el => el.href.split('/').pop())

    return recipeIds
  }

  const scrapeRecipeInformationById = async (recipeId: string) => {
    const renderedPage = await renderPage(`${config.urls.recipe}${recipeId}`)

    const recipeTitle = selectBy('h1', renderedPage)
    const naehrwerte = selectBy('#nutritions-desktop > div > dl > dd:nth-child(4)', renderedPage)
    const protein = selectBy('#nutritions-desktop > div > dl > dd:nth-child(6)', renderedPage)
    const carbs = selectBy('#nutritions-desktop > div > dl > dd:nth-child(8)', renderedPage)
    const fat = selectBy('#nutritions-desktop > div > dl > dd:nth-child(10)', renderedPage)
    const numberOfPortions = selectBy('#rc-icon-quantity-icon-text', renderedPage)

    return {
      name: recipeTitle ? recipeTitle.innerHTML : '',
      energy: {
        kJ: naehrwerte ? getNumbersFromInnerHTML(naehrwerte)[0] : '',
        kcal: naehrwerte ? getNumbersFromInnerHTML(naehrwerte)[1] : '',
      },
      protein: protein ? getNumbersFromInnerHTML(protein)[0] : '',
      carbs: carbs ? getNumbersFromInnerHTML(carbs)[0] : '',
      fat: fat ? getNumbersFromInnerHTML(fat)[0] : '',
      numberOfPortions: numberOfPortions ? getNumbersFromInnerHTML(numberOfPortions)[0] : '',
      recipeId: recipeId,
    }
  }

  const scrapeCollectionRecipeIds = (username: string, password: string) => {
    return {} // ToDo: Implement
  }

  return {scrapeWeekplanRecipeIds, scrapeRecipeInformationById, scrapeCollectionRecipeIds}
}

export default makeScrapeCookidooService
