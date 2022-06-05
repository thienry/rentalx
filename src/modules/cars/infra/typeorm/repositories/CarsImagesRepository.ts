import { getRepository, Repository } from 'typeorm'

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage'
import { ICarsImagesRepository } from '@modules/cars/repositories/interfaces/ICarsImagesRepository'

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name })
    return this.repository.save(carImage)
  }
}

export { CarsImagesRepository }
