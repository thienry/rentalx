import 'reflect-metadata'
import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { User } from '../../entities/User'
import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
    if (userAlreadyExists) throw new AppError('User already exists!')

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
