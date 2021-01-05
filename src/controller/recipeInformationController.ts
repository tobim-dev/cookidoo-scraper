import {Response, Request} from 'express'
import recipeInformationService from 'service/recipeInformationService'
interface Dependencies {
  listRecipeInformationById: (recipeId: string) => Promise<string>
  listRecipeInformationByWeekplan: (username: string, password: string) => Promise<string[]>
}

const makeRecipeInformationController = ({
  listRecipeInformationById,
  listRecipeInformationByWeekplan,
}: Dependencies) => {
  const getRecipeInformationById = async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId

    const recipeInformation = await listRecipeInformationById(recipeId)

    res.status(200).send(recipeInformation)
  }

  const getRecipeInformationByWeekplan = async (req: Request, res: Response) => {
    const username = req.query.username
    const password = req.query.password

    if (typeof username !== 'string') {
      throw new Error('You need to provide a correct username')
    }

    if (typeof password !== 'string') {
      throw new Error('You need to provide a correct password')
    }

    const recipeInformation = await listRecipeInformationByWeekplan(username, password)

    res.status(200).send(recipeInformation)
  }

  return {
    getRecipeInformationById,
    getRecipeInformationByWeekplan,
  }
}

const {listRecipeInformationById, listRecipeInformationByWeekplan} = recipeInformationService

const recipeInformationController = makeRecipeInformationController({
  listRecipeInformationById,
  listRecipeInformationByWeekplan,
})

export default recipeInformationController
