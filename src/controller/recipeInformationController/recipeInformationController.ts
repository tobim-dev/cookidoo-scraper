import {Response, Request} from 'express'
import RecipeInformation from '../../models/RecipeInformation'
interface Dependencies {
  listRecipeInformationById: (recipeId: string) => Promise<RecipeInformation>
  listRecipeInformationByWeekplan: (username: string, password: string) => Promise<RecipeInformation[]>
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
    const username = process.env.COOKIDOO_USERNAME || req.query.username
    const password = process.env.COOKIDOO_PASSWORD || req.query.password

    if (typeof username !== 'string') {
      return res.status(400).send('You need to provide a username')
    }

    if (typeof password !== 'string') {
      return res.status(400).send('You need to provide a password')
    }

    const recipeInformation = await listRecipeInformationByWeekplan(username, password)

    if (!recipeInformation.length) {
      return res.status(404).send('No recipe found on your weekplan for today or the following days')
    }

    res.status(200).send(recipeInformation)
  }

  return {
    getRecipeInformationById,
    getRecipeInformationByWeekplan,
  }
}

export default makeRecipeInformationController
