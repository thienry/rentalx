import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import { AppError } from '@core/errors/AppError'
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'

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

  const usersTokensRepository = new UsersTokensRepository()

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN) as IPayload

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(userId, token)
    if (!user) throw new AppError('User does not exists!', 401)

    req.user = { id: userId }

    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }
}
