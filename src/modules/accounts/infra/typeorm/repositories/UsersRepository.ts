import { getRepository, Repository } from 'typeorm'

import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      password: data.password,
      driver_license: data.driver_license,
    })

    return this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email })
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id)
  }
}

export { UsersRepository }
