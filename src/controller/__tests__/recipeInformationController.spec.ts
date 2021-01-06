import recipeInformationController from '../recipeInformationController'
import recipeInformationService from '../../services/recipeInformationService'
import {getMockReq, getMockRes} from '@jest-mock/express'

jest.mock('../services/recipeInformationService')

describe('recipeInformationController', () => {
  const mockedListRecipeInformationById = (recipeInformationService.listRecipeInformationById as unknown) as jest.Mock<
    typeof recipeInformationService.listRecipeInformationById
  >

  it('should call the recipe service to get recipe information', async () => {
    const req = getMockReq({params: {recipeId: 'r474790'}})
    const {res} = getMockRes()

    await recipeInformationController.getRecipeInformationById(req, res)

    expect(mockedListRecipeInformationById).toBeCalledWith('r474790')
    expect(mockedListRecipeInformationById).toBeCalledTimes(1)
    expect(res.status).toBeCalledWith(200)
  })
})
