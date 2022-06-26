import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { IDateProvider } from '@shared/providers/interfaces/IDateProvider'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'
import { DATE_PROVIDER, USERS_REPOSITORY, USERS_TOKENS_REPOSITORY } from '@shared/utils/constants'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject(DATE_PROVIDER) private dateProvider: IDateProvider,
    @inject(USERS_REPOSITORY) private usersRepository: IUsersRepository,
    @inject(USERS_TOKENS_REPOSITORY) private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(data.token)
    if (!userToken) throw new AppError('Invalid token!')

    const isExpiredDate = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    )
    if (isExpiredDate) throw new AppError('Token expired!')

    const user = await this.usersRepository.findById(userToken.user_id)
    user.password = await bcrypt.hash(data.password, 12)

    await this.usersRepository.create(user)
    await this.usersTokensRepository.removeById(userToken.id)
  }
}

export { ResetPasswordUserUseCase }