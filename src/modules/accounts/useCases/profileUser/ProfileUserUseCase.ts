import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { UserMap } from '@modules/accounts/mapper/UserMap'
import { USER_NOT_FOUND, USERS_REPOSITORY } from '@shared/utils/constants'
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'

@injectable()
class ProfileUserUseCase {
  constructor(@inject(USERS_REPOSITORY) private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id)
    if (!user) throw new AppError(USER_NOT_FOUND)

    return UserMap.toDTO(user)
  }
}

export { ProfileUserUseCase }
