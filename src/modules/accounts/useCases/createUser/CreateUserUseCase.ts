import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
    if (userAlreadyExists) throw new Error('User already exists!')

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
