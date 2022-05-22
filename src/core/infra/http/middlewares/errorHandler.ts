import { Request, Response } from 'express'

import { AppError } from '@core/errors/AppError'

export function errorHandler(err: Error, req: Request, res: Response) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res
    .status(500)
    .json({ status: 'error', message: `Internal Server Error - ${err.message}` })
}
