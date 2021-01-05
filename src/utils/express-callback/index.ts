import type {HTTPResponse, HTTPRequest} from 'controller'
import type {Request, Response} from 'express'

export default function makeExpressCallback(controller: (httpRequest: HTTPRequest) => Promise<HTTPResponse>) {
  return (req: Request, res: Response): void => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    }
    controller((httpRequest as unknown) as HTTPRequest)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch(() => res.status(500).send({error: 'An unkown error occurred.'}))
  }
}
