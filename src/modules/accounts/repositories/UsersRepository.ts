import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'
import { IUsersRepository } from './interfaces/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name: data.name,
      username: data.username,
      password: data.password,
      email: data.email,
      driver_license: data.driver_license,
    })

    await this.repository.save(user)
  }
}

export { UsersRepository }
