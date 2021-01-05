import type {RecipeInformation} from 'entities/recipeInformation'
import type {DOMWindow} from 'jsdom'

export type ScrapeRecipePage = (recipeId: string) => Promise<RecipeInformation>

interface Props {
  makeRenderPageWithRecipeId: () => (recipeId: string) => Promise<DOMWindow>
  setCachedValue: (key: string, value: string) => void
  getCachedValue: (key: string) => string | undefined
}

export default function makeScrapeRecipePage({
  makeRenderPageWithRecipeId,
  setCachedValue,
  getCachedValue,
}: Props): ScrapeRecipePage {
  const selectBy = (selector: string, window: DOMWindow): Element => {
    return window.document.querySelector(selector)
  }

  const getNumbersFromInnerHTML = (htmlElement: Element): string[] => {
    return htmlElement.innerHTML.split(' ').filter(Number)
  }

  return async function scrapeRecipePage(recipeId: string): Promise<RecipeInformation> {
    if (getCachedValue(recipeId)) {
      return JSON.parse(getCachedValue(recipeId))
    }

    const renderWebPageWithRecipeId = makeRenderPageWithRecipeId()
    const window = await renderWebPageWithRecipeId(recipeId)

    const recipeTitle = selectBy('h1', window)
    const naehrwerte = selectBy('#nutritions-desktop > div > dl > dd:nth-child(4)', window)
    const protein = selectBy('#nutritions-desktop > div > dl > dd:nth-child(6)', window)
    const carbs = selectBy('#nutritions-desktop > div > dl > dd:nth-child(8)', window)
    const fat = selectBy('#nutritions-desktop > div > dl > dd:nth-child(10)', window)
    const numberOfPortions = selectBy('#rc-icon-quantity-icon-text', window)

    const recipeInformation = {
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

    setCachedValue(recipeId, JSON.stringify(recipeInformation))

    return recipeInformation
  }
}
