import { NextFunction, Request, Response } from 'express'

import { AppError } from '@core/errors/AppError'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'

export async function ensureAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const usersRepository = new UsersRepository()

  const user = await usersRepository.findById(req.user.id)
  if (!user.is_admin) {
    throw new AppError("User isn't admin")
  }

  next()
}
