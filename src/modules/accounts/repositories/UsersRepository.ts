import { getRepository, Repository } from 'typeorm'

import { User } from '../entities/User'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUsersRepository } from './interfaces/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      driver_license: data.driver_license,
    })

    const userCreated = await this.repository.save(user)
    return userCreated
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }
}

export { UsersRepository }
