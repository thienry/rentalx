import path from 'path'
import { v4 as uuidV4 } from 'uuid'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { IDateProvider } from '@core/container/providers/interfaces/IDateProvider'
import { IMailProvider } from '@core/container/providers/interfaces/IMailProvider'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'

require('dotenv').config()

@injectable()
class SendForgotPasswordMailUseCase {
  private readonly EMAIL_SUBJECT = 'Password Recovery'

  constructor(
    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
    @inject('EtherealMailProvider') private mailProvider: IMailProvider,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository') private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('User does not exists!')

    const tplPath = path.resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs')

    const token = uuidV4()
    const expiresDate = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date: expiresDate,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL as string}?token=${token}`,
    }

    await this.mailProvider.sendMail(email, this.EMAIL_SUBJECT, variables, tplPath)
  }
}

export { SendForgotPasswordMailUseCase }
