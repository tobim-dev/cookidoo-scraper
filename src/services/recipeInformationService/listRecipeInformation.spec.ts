import {makeRecipeInformationStub} from '../../tests/stubs/recipeInformationStub'
import makeListRecipeInformation from './listRecipeInformation'

describe('recipeInformationService', () => {
  const scrapeRecipeInformationById = async () => makeRecipeInformationStub('r31312')
  const scrapeWeekplanRecipeIds = async () => ['r31312', 'r31312']

  it('should list recipe information by id', async () => {
    const recipeInformationService = makeListRecipeInformation({
      scrapeRecipeInformationById,
      scrapeWeekplanRecipeIds,
    })

    const recipeInformation = await recipeInformationService.listRecipeInformationById('r31312')

    expect(recipeInformation).toEqual(makeRecipeInformationStub('r31312'))
  })
  it('should list recipe information by weekplan', async () => {
    const recipeInformationService = makeListRecipeInformation({
      scrapeRecipeInformationById,
      scrapeWeekplanRecipeIds,
    })

    const recipeInformationByWeekplan = await recipeInformationService.listRecipeInformationByWeekplan('test', 'test')

    expect(recipeInformationByWeekplan).toEqual([
      makeRecipeInformationStub('r31312'),
      makeRecipeInformationStub('r31312'),
    ])
  })
})
