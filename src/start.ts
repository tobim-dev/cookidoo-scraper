import express from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swaggerSpec.json'
import config from './config'

// all the routes for my app are retrieved from the src/routes/index.js module
import {getRoutes} from './routes'
import errorMiddleware from './error/errorHandler'

function startServer({port = process.env.PORT} = {}): void {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(errorMiddleware)
  app.use(config.api.prefix, getRoutes())
  app.use(config.api.swagger, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}

export {startServer}
