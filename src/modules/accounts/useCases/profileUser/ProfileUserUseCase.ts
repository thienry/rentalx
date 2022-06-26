import { inject, injectable } from 'tsyringe'

import { UserMap } from '@modules/accounts/mapper/UserMap'
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'

@injectable()
class ProfileUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id)
    return UserMap.toDTO(user)
  }
}

export { ProfileUserUseCase }
