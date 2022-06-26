import { inject, injectable } from 'tsyringe'

import { IStorageProvider } from '@shared/providers/interfaces/IStorageProvider'
import { STORAGE_PROVIDER, CARS_IMAGES_REPOSITORY } from '@shared/utils/constants'
import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImagesRepository'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject(STORAGE_PROVIDER) private storageProvider: IStorageProvider,
    @inject(CARS_IMAGES_REPOSITORY) private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute(data: IRequest): Promise<void> {
    data.images_name.map(async (image) => {
      await this.carsImagesRepository.create(data.car_id, image)
      await this.storageProvider.save(image, 'cars')
    })
  }
}

export { UploadCarImagesUseCase }
