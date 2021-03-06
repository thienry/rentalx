import { getRepository, Repository } from 'typeorm'

import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken'
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '@modules/accounts/repositories/interfaces/IUsersTokensRepository'

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = await this.repository.create({
      user_id: data.user_id,
      expires_date: data.expires_date,
      refresh_token: data.refresh_token,
    })

    return this.repository.save(userToken)
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    return this.repository.findOne({ refresh_token: refreshToken })
  }

  async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserToken> {
    return this.repository.findOne({ user_id: userId, refresh_token: refreshToken })
  }

  async removeById(id: string): Promise<void> {
    this.repository.delete(id)
  }
}

export { UsersTokensRepository }
