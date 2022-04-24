import { User } from '../../entities/User'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

interface IUserRepository {
  findByEmail(email: string): Promise<User>
  create(data: ICreateUserDTO): Promise<User>
}

export { IUserRepository }
