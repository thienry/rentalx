import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { IDateProvider } from '@core/container/providers/dateProvider/interfaces/IDateProvider'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'

interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('UsersTokensRepository') private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN) as IPayload
    const userId = sub

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, token)
    if (!userToken) throw new AppError('Refresh Token does not exists!')

    await this.usersTokensRepository.removeById(userToken.id)

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      process.env.EXPIRES_REFRESH_TOKEN_DAYS
    )

    const refreshToken = jwt.sign({ email }, process.env.SECRET_REFRESH_TOKEN, {
      subject: userId,
      expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN,
    })

    await this.usersTokensRepository.create({
      user_id: userId,
      refresh_token: refreshToken,
      expires_date: refreshTokenExpiresDate,
    })

    return refreshToken
  }
}

export { RefreshTokenUseCase }