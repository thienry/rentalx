import 'reflect-metadata'
import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { USER_EXISTS, USERS_REPOSITORY } from '@shared/utils/constants'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(@inject(USERS_REPOSITORY) private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
    if (userAlreadyExists) throw new AppError(USER_EXISTS)

    const user = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      driver_license: data.driver_license,
      password: await bcrypt.hash(data.password, 12),
    })

    return user
  }
}

export { CreateUserUseCase }
