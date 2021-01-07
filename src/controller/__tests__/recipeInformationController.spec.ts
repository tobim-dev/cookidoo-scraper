import makeRecipeInformationController from '../recipeInformationController'
import {getMockReq, getMockRes} from '@jest-mock/express'
import {makeRecipeInformationStub, makeRecipeInformationListStub} from '../../tests/stubs/recipeInformationStub'

describe('recipeInformationController', () => {
  const listRecipeInformationById = jest.fn(async () => makeRecipeInformationStub('r474790'))
  const listRecipeInformationByWeekplan = jest.fn(async () => makeRecipeInformationListStub())

  it('should send a response with recipe information for the given Id', async () => {
    const req = getMockReq({params: {recipeId: 'r474790'}})
    const {res} = getMockRes()

    const recipeInformationController = makeRecipeInformationController({
      listRecipeInformationById,
      listRecipeInformationByWeekplan,
    })

    await recipeInformationController.getRecipeInformationById(req, res)

    expect(listRecipeInformationById).toHaveBeenCalledTimes(1)
    expect(listRecipeInformationById).toHaveBeenCalledWith('r474790')
    expect(res.status).toBeCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(makeRecipeInformationStub('r474790'))
  })
})
