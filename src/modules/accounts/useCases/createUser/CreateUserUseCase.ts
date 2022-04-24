import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    this.usersRepository.create({
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      driver_license: data.driver_license,
    })
  }
}

export { CreateUserUseCase }
