import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { IDateProvider } from '@core/container/providers/interfaces/IDateProvider'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'

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
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository') private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('Email or password are incorrect!')

    const passwdMatch = await bcrypt.compare(password, user.password)
    if (!passwdMatch) throw new AppError('Email or password are incorrect!')

    const token = jwt.sign({}, process.env.SECRET_TOKEN, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN_TOKEN,
    })
    const refreshToken = jwt.sign({ email }, process.env.SECRET_REFRESH_TOKEN, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
    })
    const refreshTokenExpiresDate = this.dateProvider.addDays(
      process.env.EXPIRES_REFRESH_TOKEN_DAYS
    )

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
