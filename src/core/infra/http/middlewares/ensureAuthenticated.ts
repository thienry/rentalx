import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import { AppError } from '@core/errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Missing token!', 401)

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = jwt.verify(token, process.env.SECRET_TOKEN) as IPayload

    req.user = { id: userId }

    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }
}
