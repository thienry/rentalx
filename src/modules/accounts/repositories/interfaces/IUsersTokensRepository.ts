import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken'
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>
}

export { IUsersTokensRepository }
