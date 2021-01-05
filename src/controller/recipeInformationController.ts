import {Response, Request} from 'express'

const listRecipeInformation = async (recipeId: string) => recipeId
const listRecipeInformationByWeekplan = async (username: string, password: string) => username

interface Dependencies {
  listRecipeInformation: (recipeId: string) => Promise<string>
  listRecipeInformationByWeekplan: (username: string, password: string) => Promise<string>
}

const makeRecipeInformationController = ({listRecipeInformation, listRecipeInformationByWeekplan}: Dependencies) => {
  const getRecipeInformationById = async (req: Request, res: Response) => {
    const recipeId = req.params.recipeId

    const recipeInformation = await listRecipeInformation(recipeId)

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

const recipeInformationController = makeRecipeInformationController({
  listRecipeInformation,
  listRecipeInformationByWeekplan,
})

export default recipeInformationController
