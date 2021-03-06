import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { IDateProvider } from '@shared/providers/interfaces/IDateProvider'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'
import {
  DATE_PROVIDER,
  USERS_REPOSITORY,
  USERS_TOKENS_REPOSITORY,
  INCORRECT_EMAIL_OR_PASSWORD,
} from '@shared/utils/constants'

require('dotenv').config()

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  refreshToken: string
  user: { name: string; email: string }
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject(DATE_PROVIDER) private dateProvider: IDateProvider,
    @inject(USERS_REPOSITORY) private usersRepository: IUsersRepository,
    @inject(USERS_TOKENS_REPOSITORY) private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      SECRET_TOKEN,
      EXPIRES_IN_TOKEN,
      SECRET_REFRESH_TOKEN,
      EXPIRES_IN_REFRESH_TOKEN,
      EXPIRES_REFRESH_TOKEN_DAYS,
    } = process.env

    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError(INCORRECT_EMAIL_OR_PASSWORD)

    const passwdMatch = await bcrypt.compare(password, user.password)
    if (!passwdMatch) throw new AppError(INCORRECT_EMAIL_OR_PASSWORD)

    const token = jwt.sign({}, SECRET_TOKEN, {
      subject: user.id,
      expiresIn: EXPIRES_IN_TOKEN,
    })
    const refreshToken = jwt.sign({ email }, SECRET_REFRESH_TOKEN, {
      subject: user.id,
      expiresIn: EXPIRES_IN_REFRESH_TOKEN,
    })

    const refreshTokenExpiresDate = this.dateProvider.addDays(Number(EXPIRES_REFRESH_TOKEN_DAYS))

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_date: refreshTokenExpiresDate,
    })

    return {
      token,
      refreshToken,
      user: {
        name: user.name,
        email: user.email,
      },
    }
  }
}

export { AuthenticateUserUseCase }
