import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import { AppError } from '../errors/AppError'
import { UsersRepository } from '../modules/accounts/repositories/UsersRepository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) throw new AppError('Missing token!', 401)

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = jwt.verify(token, '71d245fcd4126c9f33ff47131b49c709') as IPayload

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(user_id)
    if (!user) throw new AppError('User does not exists!', 401)

    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }
}
