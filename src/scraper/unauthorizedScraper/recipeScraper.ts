import {recipeInformation} from 'entities/recipeInformation'
import {JSDOM} from 'jsdom'
import {Renderer} from './renderer'

export type RecipeScraper = {
  scrapeRecipeInformationById: (recipeId: string) => Promise<recipeInformation>
}

export default function makeRecipeScraper(
  makeRenderer: () => Renderer,
): RecipeScraper {
  const selectBy = (selector: string, dom: JSDOM) => {
    return dom.window.document.querySelector(selector)
  }

  const getNumbersFromInnerHTML = (htmlElement: Element) => {
    return htmlElement.innerHTML.split(' ').filter(Number)
  }

  async function scrapeRecipeInformationById(recipeId: string) {
    const renderer = makeRenderer()
    const dom = await renderer.renderSiteWithRecipeId(recipeId)

    const recipeTitle = selectBy('h1', dom)
    const naehrwerte = selectBy(
      '#nutritions-desktop > div > dl > dd:nth-child(4)',
      dom,
    )
    const protein = selectBy(
      '#nutritions-desktop > div > dl > dd:nth-child(6)',
      dom,
    )
    const carbs = selectBy(
      '#nutritions-desktop > div > dl > dd:nth-child(8)',
      dom,
    )
    const fat = selectBy(
      '#nutritions-desktop > div > dl > dd:nth-child(10)',
      dom,
    )
    const numberOfPortions = selectBy('#rc-icon-quantity-icon-text', dom)

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
    } as recipeInformation
  }

  return Object.freeze({
    scrapeRecipeInformationById,
  })
}
