import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken'
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'

interface IUsersTokensRepository {
  removeById(userId: string): Promise<void>
  create(data: ICreateUserTokenDTO): Promise<UserToken>
  findByUserIdAndRefreshToken(id: string, refreshToken: string): Promise<UserToken>
}

export { IUsersTokensRepository }
