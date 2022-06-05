import { inject, injectable } from 'tsyringe'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor(@inject('CarsImagesRepository') private carsImagesRepository) {}

  async execute(data: IRequest): Promise<void> {
    data.images_name.map(async (image) => this.carsImagesRepository.create(data.car_id, image))
  }
}

export { UploadCarImagesUseCase }
