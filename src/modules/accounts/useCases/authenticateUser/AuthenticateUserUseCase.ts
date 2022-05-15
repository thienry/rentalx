import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  user: {
    name: string
    email: string
  }
}

@injectable()
class AuthenticateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new AppError('Email or password are incorrect!')

    const passwdMatch = await bcrypt.compare(password, user.password)
    if (!passwdMatch) throw new AppError('Email or password are incorrect!')

    const token = jwt.sign({}, '71d245fcd4126c9f33ff47131b49c709', {
      subject: user.id,
      expiresIn: '1d',
    })

    const session: IResponse = { token, user: { name: user.name, email: user.email } }

    return session
  }
}

export { AuthenticateUserUseCase }
