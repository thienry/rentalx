import { inject, injectable } from 'tsyringe'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository'

@injectable()
class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const user = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      driver_license: data.driver_license,
    })

    return user
  }
}

export { CreateUserUseCase }
