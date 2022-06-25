import { inject, injectable } from 'tsyringe'

import { AppError } from '@core/errors/AppError'
import { IStorageProvider } from '@shared/providers/interfaces/IStorageProvider'
import { IUsersRepository } from '@modules/accounts/repositories/interfaces/IUsersRepository'

interface IRequest {
  userId: string
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('StorageProvider') private storageProvider: IStorageProvider,
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)
    if (!user) throw new AppError('User does not exists!')

    if (user.avatar) await this.storageProvider.delete(user.avatar, 'avatar')

    await this.storageProvider.save(avatarFile, 'avatar')
    user.avatar = avatarFile

    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }
