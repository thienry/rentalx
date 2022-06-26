import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { IDateProvider } from '@shared/providers/interfaces/IDateProvider'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refreshToken: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('UsersTokensRepository') private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const {
      SECRET_TOKEN,
      EXPIRES_IN_TOKEN,
      SECRET_REFRESH_TOKEN,
      EXPIRES_IN_REFRESH_TOKEN,
      EXPIRES_REFRESH_TOKEN_DAYS,
    } = process.env

    const { email, sub } = jwt.verify(token, SECRET_REFRESH_TOKEN) as IPayload
    const userId = sub

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, token)
    if (!userToken) throw new AppError('Refresh Token does not exists!')

    await this.usersTokensRepository.removeById(userToken.id)

    const refreshTokenExpiresDate = this.dateProvider.addDays(Number(EXPIRES_REFRESH_TOKEN_DAYS))

    const refreshToken = jwt.sign({ email }, SECRET_REFRESH_TOKEN, {
      subject: userId,
      expiresIn: EXPIRES_IN_REFRESH_TOKEN,
    })

    await this.usersTokensRepository.create({
      user_id: userId,
      refresh_token: refreshToken,
      expires_date: refreshTokenExpiresDate,
    })

    const newToken = jwt.sign({}, SECRET_TOKEN, {
      subject: userId,
      expiresIn: EXPIRES_IN_TOKEN,
    })

    return { refreshToken, token: newToken }
  }
}

export { RefreshTokenUseCase }
