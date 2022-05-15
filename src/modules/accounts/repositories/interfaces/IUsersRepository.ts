import { User } from '@modules/accounts/entities/User'
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'

interface IUsersRepository {
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  create(data: ICreateUserDTO): Promise<User>
}

export { IUsersRepository }
