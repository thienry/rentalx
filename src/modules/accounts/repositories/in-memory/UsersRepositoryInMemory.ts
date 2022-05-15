import { User } from '@modules/accounts/entities/User'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'

import { IUsersRepository } from '../interfaces/IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User()
    Object.assign(user, {
      name: data.name,
      email: data.email,
      password: data.password,
      driver_license: data.driver_license,
    })
    this.users.push(user)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }
}

export { UsersRepositoryInMemory }
