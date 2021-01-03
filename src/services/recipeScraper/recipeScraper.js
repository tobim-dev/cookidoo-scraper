import {JSDOM} from 'jsdom'
import {fetchRecipeDOM} from '../utils/fetchRecipeDOM'

const selectBy = (selector, dom) => {
  return dom.window.document.querySelector(selector)
}

const getNumbersFromInnerHTML = htmlElement => {
  return htmlElement.innerHTML.split(' ').filter(Number)
}

const scrapeRecipeInformation = async (recipeId, baseUrl) => {
  const response = await fetchRecipeDOM(recipeId, baseUrl)
  const dom = new JSDOM(response.body)

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
  const fat = selectBy('#nutritions-desktop > div > dl > dd:nth-child(10)', dom)
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
  }
}

export default scrapeRecipeInformation
