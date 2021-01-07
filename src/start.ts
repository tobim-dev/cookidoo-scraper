import express, {NextFunction, Request, Response} from 'express'
import 'express-async-errors'
import logger from 'loglevel'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swaggerSpec.json'
import config from './config'

// all the routes for my app are retrieved from the src/routes/index.js module
import {getRoutes} from './routes'

// here's our generic error handler for situations where we didn't handle
// errors properly
function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next(error)
  } else {
    logger.error(error)
    res.status(500)
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
  }
}

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
