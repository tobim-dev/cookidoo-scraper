import {Request, Response, NextFunction} from 'express'
import logger from 'loglevel'

const sendErrorMessage = (error: Error, statusCode: number, res: Response) => {
  logger.error(error)
  res.status(statusCode)
  res.json({
    message: error.message,
    // we only add a `stack` property in non-production environments
    ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
  })
}

// here's our generic error handler for situations where we didn't handle
// errors properly
export default function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next(error)
  } else {
    sendErrorMessage(error, 500, res)
  }
}
