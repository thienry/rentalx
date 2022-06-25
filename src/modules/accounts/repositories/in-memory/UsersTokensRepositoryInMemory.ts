import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken'
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserToken[] = []

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()
    Object.assign(userToken, {
      user_id: data.user_id,
      expires_date: data.expires_date,
      refresh_token: data.refresh_token,
    })

    this.usersTokens.push(userToken)

    return userToken
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    return this.usersTokens.find((userToken) => userToken.refresh_token === refreshToken)
  }

  async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserToken> {
    return this.usersTokens.find(
      (userToken) => userToken.user_id === userId && userToken.refresh_token === refreshToken
    )
  }

  async removeById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((userToken) => userToken.id === id)
    this.usersTokens.splice(this.usersTokens.indexOf(userToken), 1)
  }
}

export { UsersTokensRepositoryInMemory }
