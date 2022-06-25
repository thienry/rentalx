import { v4 as uuidV4 } from 'uuid'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { IDateProvider } from '@core/container/providers/interfaces/IDateProvider'
import { IMailProvider } from '@core/container/providers/interfaces/IMailProvider'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('EtherealMailProvider') private mailProvider: IMailProvider,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository') private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('User does not exists!')

    const token = uuidV4()
    const expiresDate = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date: expiresDate,
    })

    await this.mailProvider.sendMail(
      email,
      'Password Recovery',
      `Link to password reset is ${token}`
    )
  }
}

export { SendForgotPasswordMailUseCase }
